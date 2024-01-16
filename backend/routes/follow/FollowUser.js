const nodemon = require('nodemon');
const Follows = require('../../models/Follows');
const Followers = require('../../models/Followers');

async function FollowUser(req, res, next) {
    //console.log("CreateBark: start")
    try {
        console.log("FollowUser: ", req.body)
        const form = req.body
        const user = form.user
        const followedUser = form.follower
        if ((!user || !follower)) {
            return res.status(400).send('Required fields not supplied.');
        }

        const follow = await Follows.create(
            { 
                user: user,
                followedUser: followedUser,
                followTime: Date.now(),
            }
        );
        return res.status(200).send(follow);

        // const form = req.body
        // const author = form.author
        // const authorID = form.authorID
        // const title = form.title;
        // const content = form.content;
        // if ((!author || !authorID) || (!title || !content)) {
        //     return res.status(400).send('Required fields not supplied.');
        // }

        // const bark = await Barks.create(
        //     { author: author, 
        //     authorID: authorID,
        //     title: title,
        //     content: content,
        //     deleted: false,
        //     liked: 0,
        //     barkBacks: 0,
        //     rebarks: 0,
        //     barkBackTo: null,
        //     rebarkOf: null,
        //     created: form.created
        //     }
        // );
        // return res.status(200).send(bark);
    } catch (error) {
        console.log(error);
        return res.status(500).send('Whoops, something went wrong.');
    }
}

module.exports = CreateBark;
