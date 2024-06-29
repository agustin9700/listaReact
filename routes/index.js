var express = require('express');
const {  apiRankTable } = require('../controllers/admin');
var router = express.Router();

/* GET home page. */


router.get('/api', apiRankTable);

module.exports = router;
