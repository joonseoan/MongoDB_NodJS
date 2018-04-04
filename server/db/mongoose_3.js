console.log('starting mongoose_3.js');
console.log('This is mongoose configuration.')

const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/TodoApp');

module.exports = {

    mongoose

};
