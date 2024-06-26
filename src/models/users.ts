import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
	name: String,
	password: String
});

export const User: any = mongoose.model('User', userSchema);
