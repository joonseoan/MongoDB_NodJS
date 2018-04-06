console.log('starting server_5.js working with db/mongoose_3.js');

const express = require('express');
const bodyParser = require('body-parser');

const { mongoose } = require('./db/mongoose_3');
const { Todoso } = require('./models/todoso_3');
const { TodoChallenge } = require('./models/user_3');

const app = express();

// It is must-have function
//      because when the user enter the data on the web browser,
//      the data is going to delivered in JSON format.
// The server can not read the JSON format. So in order to
//      read the data the server needs object format.
// The role of "bodyParser.json()" is to translate JSON 
//      into the object format.
app.use(bodyParser.json());

app.post('/todoso', (req, res) => {

    // Because we use "bodyParser", the computer is able to
    //      read "req.boy."
    // ***** req.body: it is only input defined by the user.
    // That is, it does not contain the other properties like 
    //      "completed" and "completedAt"
    console.log('req.body inside of bodyParser:', req.body);
    
    // Input the documents and fields into collection
    const todoso = new Todoso ( {

        text : req.body.text,

    });

    // Store the documents and fields into the data
    todoso.save().then((result) => {

        // "result" includes all elements and properties!!!!! 
        // It is a document of the collection.
        console.log('Success!!!', result)

        // if the data storing process is done,
        //      express sends the recorded docs and fields to the users
        res.send(result);

    }, (err) => {

            // if it fails, it sends the error message to the user.
            console.log('Fails', err);
            res.status(400).send(err);

    });

});

app.get('/todoso', (req, res) => {

    // find(): We will get everything todoso created
    //      by POST above.
    // Then, in promise, we need to put "todoso" for success
    //      to get all created.
    Todoso.find().then((todoso)=> {
        
        // It is not right way
        //      because we cannot add something else
        //      when we need to manipulate the response
        //      to the user.
        // Keep in min that todoso is an array
        //      because MongoDB stores and sends
        //      the array format. So we cannot add
        //      any other element here.
        //  To resolve the problem, we can use the object.
        // res.send(todoso);

        res.send({ 
            
            todoso
            // name: 'ddd'
        
        });
    
    }, (err) => {

        res.status(400).send(err);

    });    

});

app.listen(3000, () => {

    console.log('Started on port 3000');

})

module.exports = { app };
