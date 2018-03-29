console.log('starting mongodb_connect_1.js');

// call MongoDB library.
// Then get a method, "MongoClient" 
//      of the library.
const MongoClient = require('mongodb').MongoClient;

// Connect the mongodb database.
// It takes two arguments. 
//      The first one is path.
//      The other is callback.
// We use local host and port number 27017
// And, just create new database with name "TodoApp"
// FYI, in MongoDB, we do not need to create database arbitraly.
//      Just by giving the database path, we can create the database.
// "err" and "client" are the built-in argument name.
MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, client) => {
   
    if(err) {

        // "return" here is a "break" role of loop statement.
        // It means that when we face an error, it stops here.
        return console.log('Unable to connect to MongoDB.');
        
    }

    console.log('Connect to MongoDB server');

    // Name the database.
    const db = client.db('TodoApp');

    // 1)
    /*
    // However, it does still not create a physical database.
    // Down below the "collection" which is a container of data
    //       will create the visible database.
    // Name it and insert data.
    db.collection('Todos').insertOne({

        text : 'Something to do',
        completed: false

    }, (err, result) => {

        if(err) {

            return ('It has a trouble to insert that data.', err);
        
        }

        // "ops" attribute stores all "documentation"
        console.log(JSON.stringify((result.ops), undefined, 4));

    });

    // Complete the connection to MongoDB server.
    // Finally we will have the message in "cmd"
    //      "2018-03-28T11:47:00.662-0400 I NETWORK  [conn6] end connection 127.0.0.1:64243 (4 connections now open)"
    client.close();

    */

    // ======================== Challenge =========================

    // 2)
    /*
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

    */

    client.close();
});

/**
 * [Result]
 * 
 * 1) In console,
 *      We can see JSON data we just put and also, 
 *      MongoDB identifier.
 * 
 * [
    {
        "text": "Something to do",
        "completed": false,
        "_id": "5abbc0a4f7340e8040726f49"
    }
   ]
 * 
 * 
 * 2) RoboT3 (GUI)
 * 
 * 
 * 
 */


