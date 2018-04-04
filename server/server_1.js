console.log('starting server_1.js');

const mongoose = require('mongoose');

// It is almost a preset format of "mongoose".
// We do not need to edit it.
// Two lines down below are roles of "connect" to DB and "callback" and "promise". 
mongoose.Promise = global.Promise; // It is from blubird liblary.
mongoose.connect('mongodb://localhost:27017/TodoApp');

// mongoose model to make a collection.
const Todoso = mongoose.model('Todoso', {

    text : {

        type : String

    },
    completed : {

        type : Boolean

    },
    completedAt : {

        type : Number

    }

});

//1)
/*
var newTodoso = new Todoso ({

    text : 'have to study React'

});
*/

//2) ======================== Challenge ==============

/*
const timeStamp = newTodoso._id.getTimestamp()
console.log(typeof timeStamp);

newTodoso.completed = true,
newTodoso.completedAt = timeStamp;

newTodoso.save().then ( result => console.log('successfully saved.', result),
                        err => console.log('Unable to save.', err)

);
*/

// 3)

var newOtherTodoso = new Todoso ({

    
});

newOtherTodoso.save().then ( result => console.log('success!!!', JSON.stringify(result, undefined, 4)),
err => console.log('Unable to save'));

