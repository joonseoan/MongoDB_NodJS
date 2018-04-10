console.log('starting server_6.js working with db/mongoose_3.js');

const express = require('express');
const bodyParser = require('body-parser');
const  { ObjectID } = require('mongodb');

const { mongoose } = require('./db/mongoose_3');
const { Todoso } = require('./models/todoso_3');
const { TodoChallenge } = require('./models/user_3');

const app = express();

app.use(bodyParser.json());


//========================================== POST ===================================

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


// =================================== GET ALL ======================================
app.get('/todoso', (req, res) => {

    Todoso.find().then((todoso)=> {

        res.send({ 
            
            todoso
        
        });
    
    }, (err) => {

        res.status(400).send(err);

    });    

});


//======================== Wild Card ==================================
// It is a wild card.
// When the user accesses to, for instance, 'GET /todoso/1234'
// '1234' => id
app.get('/todoso/:id', (req, res) => {

    // The server receives "the parameter value of the request".
    // Then, it sends back "id" value  "{ id : "123" }", for instance.
    // res.send(req.params);
    var id = req.params.id;

    // It verifies the id format.
    if(!ObjectID.isValid(id)) return res.status(404).send();

    Todoso.findById(id).then(byID => {

        // It verifies matching with id
        if (!byID) return res.status(404).send();

        res.send({ byID });

    }).catch( err => res.status(400).send());

}, (err) => {

    res.status(400).send(err);

});

app.listen(3000, () => {

    console.log('Started on port 3000');

})

module.exports = { app };