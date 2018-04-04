console.log('starting mongodb_connect_2');

/**
 * [Mongo DB's object_ID]
 * 
 * 1) Default Value
 *  - 12Byte value
 *    . 4Byte : a time stamp when the ID is created
 *    . 3Byte : a machine identifier
 *    . 2Byte : a process ID
 *    . 3Byte : Counter. (Random value alike in MySQL)
 * 
 * 2) Arbitrarly, we can create the object ID.
 *  [
        {
            "_id": 123,
            "name": "Andrew",
            "age": 25,
            "location": "Tronto"
        }
    ]
 * 
 */


// 2)

// Destructuring with an additional component, "OjbectID"
const { MongoClient, ObjectID } = require('mongodb');

// It is simpler way to get an objetID than  in 1).
// We can get the object ID without creating the document.
// const obj = new ObjectID();
// console.log('obj: ', obj)

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, client) => {
   
    if(err) {

        // "return" here is a "break" role of loop statement.
        // It means that when we face an error, it stops here.
        return console.log('Unable to connect to MongoDB.');
        
    }

    console.log('Connect to MongoDB server');

    // Name the database.
    const db = client.db('TodoApp');


    client.close();
   
});




// 1)

/*
const MongoClient = require('mongodb').MongoClient;

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, client) => {
   
    if(err) {

        return console.log('Unable to connect to MongoDB.');
        
    }

    console.log('Connect to MongoDB server');

    const db = client.db('TodoApp');

    
    db.collection('UserProfile').insertOne({

        // Arbitraly, we can create
        // _id : 123, 
        name : 'Andrew',
        age : 25,
        location : 'Tronto'

    }, (err, result) => {

        if(err) {

            return console.log('Unable to insert UserProfile.', err);
        
        }

        console.log(JSON.stringify(result.ops, undefined, 4));

        // retreive the specific id
        //  1) retrieve the first document of "ops"
        console.log(result.ops[0]._id);

        console.log(result.ops[0]._id.getTimestamp());

    });

   client.close();

});

*/
