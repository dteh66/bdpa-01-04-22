const express = require('express');
var router = express.Router();

const tokenAuth = require('../middleware/tokenAuth');

const GetBarks = require('./follow/FollowUser');

router.get('/follow/:username', tokenAuth, GetBarks);



module.exports = router;
