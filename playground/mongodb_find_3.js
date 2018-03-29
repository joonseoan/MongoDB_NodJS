console.log('starting mongodb_find_3');

/*************
    Need to create an additional, second document
    1) Right Click on the "view" window.
    2) "Insert document"

    Also, we can edit field value.
    Hover on the specific field we want to change.
    Then, right click. Click edit document. 

*/

const { MongoClient, ObjectID } = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, client) => {
   
    if(err) {

        return console.log('Unable to connect to MongoDB.');
        
    }

    console.log('Connect to MongoDB server');

    // Start Query ---------------------------------------------------------


    const db = client.db('TodoApp');

    // We can find a bunch of cursors at : http://mongodb.github.io/node-mongodb-native/3.0/api/Cursor.html
    
    // 1) By using property name and value(, which come to be a condition
    //      for instance, "completed" : "false"),
    //      we can fetch the document we want to get.
    //  db.collection('Todos').find({ completed : false }).toArray().then((docs) => {
    
    // 2) By using "_id" property. However, as mentioned before,
    //      "_id" is an object. Not a string.

    /*
    db.collection('Todos').find({ 

        _id : new ObjectID('5abd0253ce8e1faec5498d07')

    }).toArray().then((docs) => {

        console.log('Todos: ');
        console.log(JSON.stringify(docs, undefined, 4));
        console.log(docs);

    }, (err) => {

        console.log('unable to fetch Todos', err);

    });
    */

    // 3) toCount in toArray
    db.collection('Todos').find().count().then((count) => {

        console.log(`Number of documents: ${count}`);

    }, (err) => {

        console.log('Unable to get "count".');

    });

    // 4) -------------------- Challenge --------------------
    db.collection('UserProfile').find({ name : 'Andrew'}).toArray().then((docs)=>{
        
        console.log('User Profile Data');
        console.log(JSON.stringify(docs, undefined, 4));

    }, err => {

        console.log('Unable to find the user profile.');

    });
    
    
    //1) --------------------------------------------------------------
    // find() : It is not not query.
    //          It finds all to do, everything regardless of the garbage value
    //              including header and response info.
    // console.log(db.collection('Todos').find());

    // The find() above returns "MongoDB cursor"
    // The cursor has a ton of methods to get specific "documents"
    // Theyu are sorts of tools to get the data the user wants.
    
    // "toArray" is the most popular one to make an arry containing the object value..
    //      => 
    /**
     * 
    [
    {
        "_id": "5abbc07a82cbe661607e06c3",
        "text": "Something to do",
        "completed": false
    },
    {
        "_id": "5abd0253ce8e1faec5498d07",
        "text": "Walk the dog",
        "completed": false
    }
    ]
     * 
     */

    // "toArray" returns a promise.
    /*
    db.collection('Todos').find().toArray().then((docs) => {

        console.log('Todos: ');
        console.log(JSON.stringify(docs, undefined, 4));
        console.log(docs);

    }, (err) => {

        console.log('unable to fetch Todos', err);

    });
    */

    //client.close();
   
});

