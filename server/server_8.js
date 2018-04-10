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

app.delete('/todoso/:id', (req, res) => {

    console.log(req.params.id);

    var id = req.params.id;

    if(!ObjectID.isValid(id)) return res.status(404).send();

    Todoso.findByIdAndRemove(id).then((result) => {

        if(!result) return res.status(404).send();

        res.send(result);

    }).catch(err => res.status(400).send(err));

});



const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {

    console.log(`Started on port : ${PORT}`);

});


module.exports = { app };