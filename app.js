// Importing the modules
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
var mongoose = require('mongoose');
var shortUrl = require('./models/database');

// starting the app 
const app = express();
app.use(bodyParser.json());
app.use(cors());

//Connecting to mongodb database
mongoose.connect('mongodb://localhost/shortUrls');

app.get('/new/:urlToShorten(*)', function(req, res, next) {
    var { urlToShorten } = req.params;
    //The valid url pattern
    var regex = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/;
    //check if the entered url is a valid url
    //var validURL = regex;
    // var validURL = regex;
    console.log(urlToShorten);
    //console.log(validURL);

    function randomString() {
        var shorterUrl = "";
        var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

        for (var i = 0; i < 5; i++)
            shorterUrl += possible.charAt(Math.floor(Math.random() * possible.length));

        return shorterUrl;
    }


    if (regex.test(urlToShorten)) {
        var endUrl = randomString();
        console.log('valid url');
        var data = new shortUrl({
            originalUrl: urlToShorten,
            shorterUrl: endUrl
        });
        data.save(function(error) {
            if (error) {
                return error;
            }

        });

        res.json(data);


    } else {
        res.send('Error');
    }



});

app.listen(3000, () => {
    console.log('App is running successfully on port 3000');
});