console.log('It is for separate database tests for the application');

// So far here we had two app/node environment, "production / development"
// They can be swtiched in terms of the app running enviroment.
// For instance, MongoDB_URI can be used for production or development environment.
// Depending on the purpose of the current app development status,
//   we should specify the app environment.

// From now on then, we will add "test" environment to create new database which can be independantely verified.

// ======================= NODE_ENV ======================
// "NODE_ENV" : "NODE_ENV" is an environment variable made popular by the express webserver framework
// "process.env.NODE_ENV" can be "production" || "development" || "test"

// We will use "NODE_ENV" to test database in MongoDB here. 
// Therfore, we need to get NODE_ENV swtiched to "test" environment
// FYI, "NODE_ENV" is currently set for Heroku (At heroku, process.env.NODE_ENV === 'production', by default.)
// So in order to switch "NODE_ENV" to test environment, we need to tweak "pacakge.json".
//    ==> "test": "mocha tests/*.test.js", ====>  "test": "export NODE_ENV=test || SET \"NODE_ENV=test\" && mocha tests/*.test.js",

// By default, if it is not "production" environment, it will be set to "development" environment
const env = process.env.NODE_ENV || 'development';

// => 1. process.env.***** development (Because no connection to the server, heroku)
console.log('1. process.env.*****', env);

// In case of development environment, we can drill down a little bit further like below
// When the app locally run,
if (env === 'development') {

    process.env.PORT = 3000;
    process.env.MONGODB_URI = 'mongodb://localhost:27017/TodoApp';

// When the app run the "/*.test.js" file,
} else if (env === 'test') {

    // same as well as in "development" environment
    process.env.PORT = 3000;

    //******* Here, "test" environment for a new database set up.
    process.env.MONGODB_URI = `mongodb://localhost:27017/TodoAppTest`;

}
