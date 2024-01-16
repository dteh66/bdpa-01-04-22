const mongoose = require('mongoose');

const FollowersSchema = mongoose.Schema({
    user: { type: String, required: true },
    follower: { type: String, required: true },
});

module.exports = mongoose.model('Followers', FollowersSchema);
