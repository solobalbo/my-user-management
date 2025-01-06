import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    firstName: String,
    lastName: String,
    birthDate: Date,
    gender: {
        type: String,
        enum: ['homme', 'femme'],
    },
    address: String,
    postalCode: String,
    city: String,
    country: String,
    biography: {
        type: String,
        maxLength: 120,
    },
}, {
    timestamps: true,
});

export const User = mongoose.models.User || mongoose.model('User', userSchema);
