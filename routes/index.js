var express = require('express');
var request = require('request');
var tumblr = require('tumblr.js');
var router = express.Router();
var PropertiesReader = require('properties-reader');

var properties = PropertiesReader('./properties/properties.ini');

var client = tumblr.createClient({
    consumer_key: properties.get('consumer_key'),
    consumer_secret: properties.get('consumer_secret'),
    token: properties.get('token'),
    token_secret: properties.get('token_secret')
});

var blog = properties.get('blog');

/* GET random image. */
router.get('/random', function (req, res) {
    console.log("Getting from: " + blog);
    client.blogPosts(blog, {type: 'photo'}, function(err, resp) {
        var recent = [];
        resp.posts.forEach(function(post){
            post.photos.forEach(function(photo){
                console.log(photo.original_size.url);
                recent.push(photo.original_size.url);
            })
        });
        // Return actual picture
        //request(recent[0]).pipe(res);
        var random = Math.floor((Math.random() * recent.length));
        console.log(random);
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify({url:recent[random]}));
    });
});

module.exports = router;
