const express = require('express');
var router = express.Router();

const tokenAuth = require('../middleware/tokenAuth');

const GetBarks = require('./bark/GetBarks');
const GetPackBarks = require('./bark/GetPackBarks');
const GetBookmarkedBarks = require('./bark/GetBookmarkedBarks');
const GetOneBark = require('./bark/GetOneBark');
const CreateBark = require('./bark/CreateBark');
const DeleteBark = require('./bark/DeleteBark');

router.get('/', tokenAuth, GetBarks);
router.get('/:id', GetOneBark);
router.get('/pack', tokenAuth, GetPackBarks);
router.get('/bookmarks', tokenAuth, GetBookmarkedBarks);
router.post('/create', tokenAuth, CreateBark);
router.delete('/:id/delete', tokenAuth, DeleteBark);



module.exports = router;
