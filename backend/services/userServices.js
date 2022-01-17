const Users = require('../models/User');
const Barks = require('../models/Bark');

const findUser = async email => {
    //console.log("got into findUser function yay");
    const user = await Users.findOne({ email })
    if (user === null || user === undefined) return false
    //console.log("findUser: ", user)
    return user
}

const findUserInfo = async userID => {
    const user = await Users.findOne({ userID }, {
        username: 1, fullName: 1
    })
    if (user === null || user === undefined) return false
    //console.log("findUserInfo: ", user)
    return user
}

const findFollowSuggestions = async userInfo => {
    //The users who authored Barks the authed user liked
    //The users followed by a user the authed user follows
    //username, firstname, lastname, _id,  
    const likeWeight = 3, followWeight = 2
    const ll = userInfo.likedPosts
    var hmap = {}
    for (var post in ll) {
        var temp = await findUserInfo(findPostInfo(post._id).authorID)
            ((temp && temp._id in hmap) ?
                hmap[temp._id] = [hmap[temp._id][0], hmap[temp._id][1] + likeWeight] :
                hmap[temp._id] = [temp, likeWeight]
            )
    }
    //likedPosts.map(post => findPostInfo(post._id).authorID);

    var fl = await Users.find({
        _id: { $in: userInfo.followedUsers }
    }, {
        username: 1, fullName: 1
    }).sort({ created: -1 }).limit(50)


    for (var userID in fl) {
        var temp = await findUserInfo(userID).followedUsers
        for (var user in temp) {
            var temp2 = findUserInfo(user)
                ((temp2 && temp2._id in hmap) ?
                    hmap[temp2._id] = [hmap[temp2._id][0], hmap[temp2._id][1] + followWeight] :
                    hmap[temp2._id] = [temp2, followWeight]
                )
        }
    }
    /*
        var id1="123"
        var t = {}
        t[id1] = [{ username: "hi", fullName: "fullName "}, 2]
        t["456"] = [{ username: "hi2", fullName: "fullName2 "}, 3]
        console.log(t.id)
        console.log(t.id2)
    */
    if (Object.keys(hmap).length === 0) {
        //console.log(hmap, "hmap was empty")
        nl = await Users.find({
        }, {
            username: 1, fullName: 1
        }).sort({ created: -1 }).limit(50)
        return nl.map(element => ({ id: element._id, username: element.username, fullName: element.fullName }))
    } else {
        //console.log(hmap, "hmap was not empty")
        var array = [];
        for (var key in obj) {
            array.push({
                name: key,
                value: obj[key]
            });
        }

        var sorted = array.sort(function (a, b) {
            return (a.value[1] > b.value[1]) ? 1 : ((b.value[1] > a.value[1]) ? -1 : 0)
        });
        console.log(sorted)
        res = sorted.map(element => element.value[0])
        return res
    }


    /*
    function compareFirstNames( a, b ) {
        if ( a.first_name < b.first_name ){
          return -1;
        }
        if ( a.first_name > b.first_name ){
          return 1;
        }
        return 0;
      }
      
      people.sort( compareFirstNames );*/

    //followedUsers.map(user => findUserInfo(user).followedUsers)
}

//find post's info given the postID. 
const findPostInfo = async postID => {
    const post = await Barks.findOne({ postID })
    if (post === null || post === undefined) return false
    return post
}
module.exports = { findUser, findFollowSuggestions };