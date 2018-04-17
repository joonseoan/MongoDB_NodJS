console.log('starting server_3.js working with db/mongoose_3.js');
console.log('Validator, types and default');
console.log('I am going to learn validate the document when the user does not appropriate input value.')
console.log('It is about inserting document into MongoDB.')

const express = require('express');

// npm i express body-parser --save
/**
 * Node.js body parsing middleware.

Parse incoming request bodies in a middleware before your handlers, available under the req.body property.

Note as req.body's shape is based on user-controlled input, 
all properties and values in this object are untrusted 
and should be validated before trusting. 
For example, req.body.foo.toString() may fail in multiple ways, 
for example the foo property may not be there (undefined) or may not be a string, 
and toString may not be a function with other type of data or other user input.
 */

const bodyParser = require('body-parser');

const { mongoose } = require('./db/mongoose_3');
const { Todoso } = require('./models/todoso_3');
const { TodoChallenge } = require('./models/user_3');

const app = express();

// Configuration body-parser middleware
// "app.use()"" is configuratin middleware
// "use()" access the library.
// In this case, parse the return value from "json()""
//      and then hands off the value to "express"
app.use(bodyParser.json());
// console.log('json():', bodyParser.json());

app.post('/todos', (req, res) => {

    // It changes the "json" format into object "format"
    console.log('req.body inside of bodyParser:', req.body);

    const todoso = new Todoso ( {

        text : req.body.text,
        completed : req.body.completed,
        completedAt : req.body.completedAt

    });

    todoso.save().then((result) => {
        
        console.log('Success!!!', result)
        res.send(result);

    }, (err) => {

            // When the value of text is not avaiable ...
            console.log('Fails', err);
            res.status(400).send(err);

    });

});

app.listen(3000, () => {

    console.log('Started on port 3000');

})

