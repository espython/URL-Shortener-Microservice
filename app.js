// Importing the modules
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
var mongoose = require('mongoose');
var shortUrls = require('./models/database');

// starting the app 
const app = express();
app.use(bodyParser.json());
app.use(cors());

//Connecting to mongodb database
mongoose.connect('mongodb://espython-fcc:url-fcc@ds119675.mlab.com:19675/url-shortener-database');

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
        var data = new shortUrls({
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

//reditect the user to the original url when he/she insert the shorten url 
app.get('/:userInput', function(req, res, next) {
    var inputUrl = req.params;
    console.log(inputUrl.userInput);

    shortUrls.findOne({ "shorterUrl": inputUrl.userInput }, function(err, doc) {
        if (err) {
            res.send("<h1>Invalid URL</h1>");
        }
        console.log(doc);
        //var url = doc.originalUrl;
        res.redirect(301, doc.originalUrl);
    });
});



app.listen(3000, () => {
    console.log('App is running successfully on port 3000');
});