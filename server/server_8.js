console.log('starting server_8.js working with db/mongoose_3.js');
console.log('This is to deploy Heroku server');

const express = require('express');
const bodyParser = require('body-parser');
const  { ObjectID } = require('mongodb');

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

    Todoso.find().then((todoso)=> {

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





const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {

    console.log(`Started on port : ${PORT}`);

});


module.exports = { app };

