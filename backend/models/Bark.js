const mongoose = require('mongoose');

const BarksSchema = mongoose.Schema({
    author: { type: String, required: true },
    authorID: { type: String, required: true},
    title: { type: String, required: true },
    content: { type: String, required: true },
    deleted: { type: Boolean, required: true, default: false },
    liked: { type: Number, required: true, default: 0 },
    barkBacks: { type: Number, required: true, default: 0 }, //replies
    rebarks: { type: Number, required: true, default: 0 }, //how many ppl duplicated post
    barkBackTo: { type: String, default: null }, //reply of
    rebarkOf: { type: String, default: null }, //duplicate of
    created: { type: Date, required: true, default: Date.now },
});
//rebarks/rebarkOf can chain
//barkBacks/barkBackTo can't chain. Cannot reply to a reply
module.exports = mongoose.model('Barks', BarksSchema);
