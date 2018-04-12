console.log('starting server_9.js working with db/mongoose_3.js');
console.log('This is to deploy Heroku server');
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

    //----------------------------------------------- Request Setup before DB Update -------------------
    const id = req.params.id;

    // Patch or Update can be maliciously used by the user.
    // They can update the unecessary property 
    //      that must be updated only by the system or programmer.
    // Therefore, we need to prevent this case.
    
    // pick(object) ==> req.body is an object.
    // Then, pick the properties that should be used by the user.
    // It is not compulsory for the picked properties to be used by the user.
    
    
    /**
     * Checks if value is classified as a boolean primitive or object.
     * 
     * _.isBoolean(false);
        // => true
 
       _.isBoolean(null);
        // => false
     * 
     */
    const body = _.pick(req.body, ['text', 'completed']);
    console.log('req.body:', req.body); //=> req.body: { completed: true }
    console.log('body:', body); // => body: { completed: true }

    /** OR ***
     * req.body:          { completed: true, text: 'dafasdf' }
       body:        { text: 'dafasdf', completed: true }
     */

    //Validation
    if (!ObjectID.isValid(id)) return res.status(404).send();

    // In order to put time stamp at "completedAt" from the system,
    //      we should use "completed." ony If completed is "true",
    //      time stamp will be added to "completedAt"

    if (_.isBoolean(body.completed) && body.completed) {

        // getTime() : JavaScript time stamp from UTC. (ms)
        body.completedAt = new Date().getTime();

    } else {

        body.completed = false;
        body.completedAt = null;

    }   
    
    // --------------------------------- Query (Mongoose) and Update --------------------------------
    
    // "body" is defined above { text : 'from user', 
    //                          completed : from user
    //                          completedAt : from Sytem}
    // 
    // "new" is an option of findByIdAndUpdate.
    // "updated" is a updated "object" containing all "field data"
    Todoso.findByIdAndUpdate(id, { $set : body }, { new : true }).then( updated => {

        if(!updated) return res.status(404).send();

        res.send({updated});

    }).catch( err => res.status(400).send());


});




const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {

    console.log(`Started on port : ${PORT}`);

});


module.exports = { app };

