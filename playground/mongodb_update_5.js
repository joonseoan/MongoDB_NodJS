console.log('starting mongodb_update.js');

const { MongoClient, ObjectID } = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, client) => {
    
    if (err) console.log('Unable to connect to MongoDB server');

    console.log ('Connect to MongoDB Server.');

    const db = client.db('TodoApp');

    // 'findOneAndUpdate': In the document of API, we can find filter
    //      update, options, callback.
    /*
    db.collection('Todos').findOneAndUpdate({

        _id : new ObjectID('5abd1d55ce8e1faec5499772')
    
    // MongoDB Operator : https://docs.mongodb.com/manual/reference/operator/update/
    }, {
        $set : {

            completed: true

        }
    }, {
        // findOneAndUpdate() at api document
        returnNewDocument: true
    
    }).then(result => console.log(JSON.stringify(result, undefined, 4))

    , err => console.log('Unable to get the update'));
    */

    // ==================== Challenge ==================================

    db.collection('UserProfile').findOneAndUpdate({

        _id: new ObjectID('5abcf5d2b9eb3350608051d0')

    }, {

        $set : { name: 'Eunmi'},

        // at $inc, the positive number does not have "+ " symbole.
        // However, the negotive number must have "-" symbole.
        $inc : { age : 20 } 

    }, {
        
       returnNewDocument: true 

    }).then( result => console.log(JSON.stringify(result, undefined, 4)),
        
    err => console.log('Unable to update.'));

});