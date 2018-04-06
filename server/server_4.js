console.log('starting server_4.js working with db/mongoose_3.js');
console.log('npm i mocha expect nodemon supertest --save-dev')

const express = require('express');
const bodyParser = require('body-parser');

const { mongoose } = require('./db/mongoose_3');
const { Todoso } = require('./models/todoso_3');
const { TodoChallenge } = require('./models/user_3');

const app = express();

app.use(bodyParser.json());

app.post('/todoso', (req, res) => {


    // 1) Request form the user
    /**
    {
	    "text": "wonderwomen",
	    "completed" : false,
	    "completedAt" : 125
    }
     */
    console.log('req.body inside of bodyParser:', req.body);
    
    // Input the documents and fields into collection
    const todoso = new Todoso ( {

        text : req.body.text,
        completed : req.body.completed,
        completedAt : req.body.completedAt

    });

    // Store the documents and fields into the data
    todoso.save().then((result) => {
        
        console.log('Success!!!', result)

        // if the storing processi is done,
        //      express sends the recorded docs and fields to the users
        res.send(result);

    }, (err) => {

            // if it fails, it sends the error message to the user.
            console.log('Fails', err);
            res.status(400).send(err);

    });

});

app.listen(3000, () => {

    console.log('Started on port 3000');

})

module.exports = { app };
