import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
	name: { type: String, required: true },
	password: { type: String, required: true }
});

export const User: any = mongoose.model('User', userSchema);
