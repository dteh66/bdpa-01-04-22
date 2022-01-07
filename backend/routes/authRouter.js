const express = require('express');
var router = express.Router();
const bodyParser = require('body-parser')


const basicAuth = require('../middleware/basicAuth');
const tokenAuth = require('../middleware/tokenAuth');

const GenerateToken = require('./auth/GenerateToken');
//const DeleteToken = require('./auth/DeleteToken');
const CreateUser = require('./auth/CreateUser');
const RequestReset = require('./auth/RequestReset');
const ResetPassword = require('./auth/ResetPassword');
const GetUserFromToken = require('./auth/GetUserInfo');

router.post('/create-user', CreateUser);
router.post('/generate-token', basicAuth, bodyParser.json(), GenerateToken);
//router.delete('/delete-token', tokenAuth, DeleteToken);
router.post('/reset-password', RequestReset);
router.patch('/reset-password/:resetRequest', ResetPassword);
router.get('/get-user-info', tokenAuth, GetUserFromToken);


module.exports = router;
