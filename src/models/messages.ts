import mongoose from 'mongoose';

const messages = new mongoose.Schema({
	username: String,
	message: String
});

export const Message: any = mongoose.model('Message', messages);
