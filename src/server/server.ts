import express, { Request, Response } from 'express';
import { createServer } from 'node:http';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { Server } from 'socket.io';
import mongoose from 'mongoose';
import { User } from '../models/users.js';
import { Message } from '../models/messages.js';

const app = express();
const server = createServer(app);
const io = new Server(server, {
	connectionStateRecovery: {}
});
const PORT = process.env.PORT || 3000;
const __dirname = dirname(fileURLToPath(import.meta.url));

mongoose.connect(
	'mongodb://root:example@localhost:27017/chat-app?authSource=admin'
);

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error'));
db.once('open', () => {
	console.log('Connected to MongoDB');
});
/*
Run();
async function Run() {
	const user = new User({ name: 'John', password: '1234' });
	await user.save();
	console.log(user);
}*/

app.get('/', (req: Request, res: Response) => {
	res.sendFile(join(__dirname, '../../src/client/index.html'));
});

app.get('/chat', (req: Request, res: Response) => {
	res.sendFile(join(__dirname, '../../src/client/chat.html'));
});

io.on('connection', (socket) => {
	console.log('a user has connected');
	socket.on('disconnect', () => {
		console.log('a user has disconnected');
	});

	socket.on('chat message', (msg) => {
		console.log('message: ' + msg);
		io.emit('chat message', msg);
	});
});

server.listen(PORT, () => {
	console.log(`server running on port ${PORT}`);
});
