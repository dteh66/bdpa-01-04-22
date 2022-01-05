const express = require('express');
var router = express.Router();

const basicAuth = require('../middleware/basicAuth');
//const tokenAuth = require('../middleware/tokenAuth');
const getUsername = require('../middleware/getUser');

//const GenerateToken = require('./auth/GenerateToken');
//const DeleteToken = require('./auth/DeleteToken');
const CreateUser = require('./auth/CreateUser');
const RequestReset = require('./auth/RequestReset');
const ResetPassword = require('./auth/ResetPassword');


router.post('/create-user', CreateUser);
router.post('/generate-token', basicAuth, bodyParser.json(), GenerateToken);
//router.delete('/delete-token', tokenAuth, DeleteToken);
router.post('/reset-password', RequestReset);
router.patch('/reset-password/:resetRequest', ResetPassword);

router.get('/get-username', getUsername);

module.exports = router;
