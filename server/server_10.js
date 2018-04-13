// In order to work together with config file.
// Not need to get variable, because we do not use that in this file.
require('./server_config/config');

console.log('starting server_10.js working with db/mongoose_3.js');
console.log('lodash added here');

const express = require('express');
const bodyParser = require('body-parser');
const { ObjectID } = require('mongodb');
const _ = require('lodash');

const { mongoose } = require('./db/mongoose_3');
const { Todoso } = require('./models/todoso_3');
const { TodoChallenge } = require('./models/user_3');

const app = express();

app.use(bodyParser.json());

// ================================= POST/TODOSO ===================================================================
// 1) Once the user reach out the define url, it will send data / the user requst to the database over the server.
// 2) Then, server will get back to the user with the posted / saved document.

app.post('/todoso', (req, res) => {
    
    const todoso = new Todoso ( {

        text : req.body.text

    });

    // todoso.text : object and field format

    todoso.save().then((result) => {

        // object and document format
        res.send(result);

    }, (err) => {

            res.status(400).send(err);

    });

});

// ================================== GET/TODOSO ================================================================
// 1) Once the user reach out the defined url, the server will pull out the data out of the data.
// 2) Then, the server will send back the / show all the documents to the user.

app.get('/todoso', (req, res) => {

    Todoso.find({}).then((todoso)=> {

        //an array
        res.send({ 
            
            todoso
        
        });
    
    }, (err) => {

        res.status(400).send(err);

    });    

});

// ================================== GET/TODOSO/:ID ================================================================
// 1) Once the user reach out the defined url/:id, the server will pull out the user's requested / specified data out of the data.
// 2) Then, the server will send back the / show the document to the user.

app.get('/todoso/:id', (req, res) => {

    var id = req.params.id;

    if(!ObjectID.isValid(id)) return res.status(404).send();

    Todoso.findById(id).then(byID => {

        if (!byID) return res.status(404).send();

        console.log('byID: ;;;;;;;; _id of the main contents : ', byID._id);
        res.send({ byID });

    }).catch( err => res.status(400).send());

}, (err) => {

    res.status(400).send(err);

});

// ================================== DELETE/TODOSO/:ID ========================================================================
// 1) Once the user reach out the defined url/:id, the server will delete the user's requested / specified document in database.
// 2) Then, the server will send back the / show the deleted document to the user.

app.delete('/todoso/:id', (req, res) => {

    var id = req.params.id;

    if(!ObjectID.isValid(id)) return res.status(404).send();

    Todoso.findByIdAndRemove(id).then((result) => {

        if(!result) return res.status(404).send();

        res.send({result});

    }).catch(err => res.status(400).send(err));

});


// ================================= PATCH/TODOSO/:ID ===================================================================

// It is really set in stone!!!
app.patch('/todoso/:id', (req, res) => {

    const id = req.params.id;
   
    const body = _.pick(req.body, ['text', 'completed']);
    
    console.log('req.body:', req.body); //=> req.body: { completed: true }
    console.log('body:', body); // => body: { completed: true }

    //Validation
    if (!ObjectID.isValid(id)) return res.status(404).send();

    if (_.isBoolean(body.completed) && body.completed) {

        body.completedAt = new Date().getTime();

    } else {

        body.completed = false;
        body.completedAt = null;

    }   
    
    Todoso.findByIdAndUpdate(id, { $set : body }, { new : true }).then( updated => {

        if(!updated) return res.status(404).send();

        res.send({updated});

    }).catch( err => res.status(400).send());


});






// Current "process.env.PORT" can be a production environment
// "3000;" can be a test or development environment.

// We can remove "3000" as we set up in "express" environment
// 1) const PORT = process.env.PORT || 3000;

// 2) It is production.
const PORT = process.env.PORT;

app.listen(PORT, () => {

    console.log(`Started on port : ${PORT}`);

});


module.exports = { app };


