console.log('start mongoose_queries.js');
console.log('Also, need to validate object ID');

const { mongoose } = require('../server/db/mongoose_3');
const { Todoso } = require('../server/models/todoso_3');
const { TodoChallenge } = require('../server/models/user_3');

// Todo.remove({}) 
// If the object of {} is satisfied, please remove it
// If {} is empty, it removes all.
Todoso.remove({}).then((result) => {

    console.log(result); // { n: 4, ok: 1 }

});

// It is more useful when we want to remove a single document.
Todoso.findOneAndRemove({text : 'todososo'}).then((result) => {

    console.log (result);

});

// Todo.findByIDAndRemove
Todoso.findByIdAndRemove('5acce65224276db49cd1af10').then ((result) => {

    console.log(result); // => { n: 1, ok: 1 }
                        // null

});