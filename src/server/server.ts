import express, { Request, Response } from 'express';
import { createServer } from 'node:http';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { Server } from 'socket.io';

const app = express();
const server = createServer(app);
const io = new Server(server, {
	connectionStateRecovery: {}
});
const PORT = 3000;
const __dirname = dirname(fileURLToPath(import.meta.url));

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
