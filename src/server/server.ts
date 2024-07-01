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
const io = new Server(server);
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

app.get('/', (req: Request, res: Response) => {
	res.sendFile(join(__dirname, '../../src/client/index.html'));
});

app.get('/chat', (req: Request, res: Response) => {
	res.sendFile(join(__dirname, '../../src/client/chat.html'));
});

io.on('connection', async (socket) => {
	console.log('a user has connected');

	const messages = await Message.find().sort({ timestamp: 1 }).lean();
	socket.emit('load messages', messages);

	socket.on('disconnect', () => {
		console.log('a user has disconnected');
	});

	socket.on('chat message', async (msg) => {
		console.log(`${msg.username}: ${msg.message}`);

		const message = new Message({
			name: msg.username,
			message: msg.message
		});

		await message.save();

		io.emit('chat message', msg);
	});

	socket.on('register', async (userInfo) => {
		console.log(userInfo);
		try {
			const newUser = new User({
				name: userInfo.name,
				password: userInfo.password
			});

			const savedUser = await User.findOne({ name: userInfo.name });
			if (!savedUser) {
				await newUser.save();
				socket.emit('register', {
					success: true,
					message: 'User registered succesfully'
				});
			} else {
				socket.emit('register', {
					success: false,
					message: 'Username already in use'
				});
			}
		} catch (error) {
			socket.emit('register', {
				success: false,
				message: 'User registration failed'
			});
		}
	});

	socket.on('login', async (userInfo) => {
		try {
			const user = await User.findOne({
				name: userInfo.name,
				password: userInfo.password
			});

			if (user) {
				socket.emit('login', {
					success: true,
					message: 'Login successful',
					username: userInfo.name
				});
			} else {
				socket.emit('login', {
					success: false,
					message: 'Invalid username'
				});
			}
		} catch {
			socket.emit('login', {
				success: false,
				message: 'Login failed'
			});
		}
	});
});

server.listen(PORT, () => {
	console.log(`server running on port ${PORT}`);
});
