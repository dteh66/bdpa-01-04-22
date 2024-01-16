const mongoose = require('mongoose');

const FollowsSchema = mongoose.Schema({
    user: { type: String, required: true },
    followedUser: { type: String, required: true },
    followTime: { type: Date, required: true, default: Date.now },
});

module.exports = mongoose.model('Follows', FollowsSchema);
