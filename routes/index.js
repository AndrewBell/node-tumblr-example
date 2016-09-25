var express = require('express');
var request = require('request');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res) {
    request('https://67.media.tumblr.com/1aa9b5c51d8441b78d15213b96f9b8d1/tumblr_odrk2alZj61to2m3po1_540.jpg').pipe(res);
});

module.exports = router;
