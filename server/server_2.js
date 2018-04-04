console.log('starting server_2.js');
console.log('Validator, types and default');
console.log('I am going to learn validate the document when the user does not input value.')
console.log('It is about inserting document into MongoDB.')
/*
const mongoose = require('mongoose');

mongoose.Promise = global.Promise; // It is from blubird liblary.
mongoose.connect('mongodb://localhost:27017/TodoApp');

const Todoso = mongoose.model('Todoso', {

    text : {

        type : String,
        
        // "required" : the property must exist.
        // When it is empty or property's value is "null",
        //       => ValidationError: Todoso validation failed: text: Path `text` is required.
        required : true, 

        // "minlength" is for string only
        // " minlength : 1" means 
        //      that String must have more than 1 length.
        minlength : 1,

        // text : '     ' => validation error 
        //      because "trim" removes the space which is String.
        // Without "trim", "text : '     ' does not cause an error 
        //      from "required" and "minlength"
        
        
        // " text : '   edit this video     '"" => "text": "edit this video",
        trim : true
    
    },
    completed : {

        type : Boolean,

        // setup default => false or true
        default : false

    },
    completedAt : {

        type : Number,

        // Regarding for the object,
        // the default is "null"
        default: null

    }

});

// If the user does not put any (appropriate) properties and data,
//      it will cause some trouble in the future.
// Mongoose validate : http://mongoosejs.com/docs/validation.html

// In mongoose, String defined in the model avove,
//      does not recognize boolean value and number value.

// In other words, String understands true as "true" and 23 as "23".
// text : 23 => no validation error
// text : true => no validation error
// FYI, however, object {} will generate the error message.
var newOtherTodoso = new Todoso ({

    text : true
    
});

newOtherTodoso.save().then( result => console.log('success!!!', JSON.stringify(result, undefined, 4)),
err => console.log('Unable to save'));

*/
// ========================================= Challenge ==========================

const mongoogse = require('mongoose');

mongoogse.Promise = global.Promise;
mongoogse.connect('mongodb://localhost:27017/TodoApp');

const TodoChallenge = mongoogse.model('User', {

    user : {

        type : String,
        required : true,
        trim : true,
        minlength : 1,
    },
    email : {

        type : String,
        required : true,
        trim : true,
        minlength : true,
    }

});

var NewTodoChallenge = new TodoChallenge ({

    user : 'James',
    email : '   james@ddf.cm  '

});

NewTodoChallenge.save().then( result => console.log('success!', JSON.stringify(result, undefined, 4)),
err => console.log('Unable to save'));