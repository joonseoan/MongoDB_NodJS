console.log('starting server_7.js working with db/mongoose_3.js');
console.log('This is to deploy Heroku server');

const express = require('express');
const bodyParser = require('body-parser');
const  { ObjectID } = require('mongodb');

const { mongoose } = require('./db/mongoose_3');
const { Todoso } = require('./models/todoso_3');
const { TodoChallenge } = require('./models/user_3');

const app = express();

// 1) Setup port for heroku
const port = process.env.PORT || 3000;


app.use(bodyParser.json());

app.post('/todoso', (req, res) => {
    
    const todoso = new Todoso ( {

        text : req.body.text

    });

    todoso.save().then((result) => {

        console.log('Success!!!', result)

        res.send(result);

    }, (err) => {

            console.log('Fails', err);
            res.status(400).send(err);

    });

});

app.get('/todoso', (req, res) => {

    Todoso.find().then((todoso)=> {

        res.send({ 
            
            todoso
        
        });
    
    }, (err) => {

        res.status(400).send(err);

    });    

});

app.get('/todoso/:id', (req, res) => {

    var id = req.params.id;

    if(!ObjectID.isValid(id)) return res.status(404).send();

    Todoso.findById(id).then(byID => {

        if (!byID) return res.status(404).send();

        res.send({ byID });

    }).catch( err => res.status(400).send());

}, (err) => {

    res.status(400).send(err);

});

// 2) Heroku Setup : 3000 =>  port
app.listen(port, () => {

    console.log(`Started on port : ${port}`);

});

module.exports = { app };

//3) Package.json
/**
 * (1) Underline "scripts",
 *      Insert "start" : "node server/server_7.js",
 * 
 * (2) Below "scripts" and above "author"
 *      Add another object
 *      },
 *      "engines": {
 *          "node": "8.9.4"
 *       }
 * 
 */

 //4) Add on MLab to Heroku to interact with mongodb. 
    // https://elements.heroku.com/addons/mongolab
    // In order to do so, we are required to configure "add-on"

    /**
     * In terminal,
     *  - heroku create
     *  - heroku addons:create mongolab:sandbox --app [app name] // which is free
        - heroku config --app [app name] => populated "Mongodb URI" ==> copy the URI
        - Then paste the URI to db connect in "mongoose_3.js"
       
        - git add 
        - git commit
        - git push
        - git push heroku master
        
     */ 