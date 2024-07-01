import mongoose from 'mongoose';

const messageSchema = new mongoose.Schema({
	name: { type: String, required: true },
	message: { type: String, required: true },
	timestamp: { type: Date, default: Date.now }
});

export const Message: any = mongoose.model('Message', messageSchema);
