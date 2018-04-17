console.log('start mongoose_queries.js');
console.log('Also, need to validate object ID');

/**
 *  Visit mongoosejs.com -> doc -> queries.
 *  We need to understand the queries methods.
 */

const { mongoose } = require('../server/db/mongoose_3');
const { Todoso } = require('../server/models/todoso_3');
const { TodoChallenge } = require('../server/models/user_3');

// In order for the user to input the ID
const  { ObjectID } = require('mongodb');

var id = '5ac654544a01912ce825b900';

// When we have an errotic id format = > we will
//      have an error message. To validate the error
//      we need to use "catch".
if (!ObjectID.isValid(id)) console.log('ID is invalid/')

/*
// When we try to find the overlapped IDs, it could be useful.
Todoso.find({

    // *****"id" variable can be used in MongoDB.
    _id: id

}).then((todosoes) => {

    // Returns an array.
    console.log('Todosoes', todosoes);

});

// When we try to find the first one with this ID, it could be useful.
// "findOne()" gets the only one document.
// The document is the first one of the documments
//      even if some others are matched in the quiery.
Todoso.findOne({

    _id : id

}).then(todoso => {

    // Returns object
    console.log('Todoso', todoso);

});
*/

Todoso.findById(id).then(findByID => {

    // if the "id" does not match with the one
    //      in the database,
    //      it does not generate any error message.
    // Therefore, to improve the identification,
    //      we should write the condition.
    if (!findByID) return console.log('Can find the ID');

    // It is faster than "findOne()"
    // Returns an object.
    console.log('Find the doc by ID', findByID);

})

// When we have an error caused by any reasons = > we will
//      have an error message. To validate the error
//      we need to use "catch".
.catch(err => console.log(err));


// ========================Challenge===================================

var userID = '5ac3a0753aec7915c893f56-DDD';

if (!ObjectID.isValid(userID)) console.log('The user ID is not valid');

TodoChallenge.find({

    _id : userID

}).then( users => {

    console.log('users.find(): ', users);

});


TodoChallenge.findOne({

    _id: userID

}).then (user => console.log('user.findOne(): ', user));


TodoChallenge.findById(userID).then( (bYID) => {
        
        if(!bYID) console.log('Cannot find the ID');

        console.log('findByID: ', bYID)
    
    }).catch( err => console.log(err));