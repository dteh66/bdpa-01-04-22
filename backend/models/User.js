const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    username: { type: String, required: true, unique: true },
    fullName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phoneNumber: { type: String, required: true },
    password: { type: String, required: true },
    followedUsers: { type: Array, required: false, default: [] },
    pack: { type: Array, required: false, default: [] },
    bookmarked: { type: Array, required: false, default: [] },
    liked: { type: Array, required: false, default: [] },
    created: { type: Date, required: false, default: Date.now },
});

module.exports = mongoose.model('Users', UserSchema);
