console.log('starting mongodb_delete_4');

/*************
    Need to create an additional documents to delete

*/

const { MongoClient, ObjectID } = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, client) => {
   
    if(err) {

        return console.log('Unable to connect to MongoDB.');
        
    }

    console.log('Connect to MongoDB server');

    const db = client.db('TodoApp');

    // 1) deleteMany
    /*
    db.collection('Todos').deleteMany({ text : 'Eat Lunch'}).then((result) => {

        console.log(result);

    }, (err) => {

        console.log(err);
        
    });
    */
    
    // 2) deleteOne
    /*
    db.collection('Todos').deleteOne( { text: 'Eat Lunch' }).then ((result) => {
        
        console.log(result);

    }, (err) => {

        console.log(err);

    });
    */

    // 3) findOneDelete
    // Bear in mind that it delete a single document in asscending order.
    /*
    db.collection('Todos').findOneAndDelete( { completed : false }).then((result) => {

        console.log(result);

    }, (err) => {

        console.log(err);

    });
    */

    // ------------------------------- challenge --------------------------------------------

    // [FYI] For short, if we do not need to see the reuslt info, just remove 'promise'
    //      db.collection('UserProfile').deleteMany( { name : 'Andrew'});
    db.collection('UserProfile').deleteMany( { name : 'Andrew'}).then ((result) => {

        console.log(result);

    });

    db.collection('UserProfile').findOneAndDelete({ 

        _id : new ObjectID("5abbc3e52182bc44bc8c87b1")
    
    }).then((result) => {

        console.log(JSON.stringify(result, undefined, 3));

    });

});

