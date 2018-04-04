const mongoose = require('mongoose');

const TodoChallenge = mongoose.model('User', {

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

module.exports = { TodoChallenge };