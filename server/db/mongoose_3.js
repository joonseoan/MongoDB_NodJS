console.log('starting mongoose_3.js');
console.log('This is mongoose configuration.');

const mongoose = require('mongoose');
// const { appUserInfo } = require('../config/keys');

mongoose.Promise = global.Promise;
//mongoose.connect('mongodb://localhost:27017/TodoApp');

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/TodoApp');

module.exports = {

    mongoose

};
