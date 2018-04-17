const mongoose = require('mongoose');

const TodoChallenge = mongoose.model('User', {
 
    email : {

        type : String,
        required : true,
        trim : true,
        minlength : true,
    }

});

module.exports = { TodoChallenge };