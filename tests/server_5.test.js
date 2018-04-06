
console.log('starting server_5.test.js');

const expect = require('expect');
const request = require('supertest');

// In test case, modeld must be imported as well.
//      because it does not directly test 
//      the request and response fromt the user.
// For instance, "send()" respond from the request 
//      created here.
const { app } = require('../server/server_5');
const { Todoso } = require('../server/models/todoso_3');


/**
 * Please, change "package.json" for the test!!!!!!! 
 * => go to the setup file.
 */

// Must the database collection should be empty before the test.

// Error!!!!

const todoso = [
    
    {  text: 'First test todo' }, 
    
    { text: 'Second test todo' }

];
  
  beforeEach((done) => {
  
        Todoso.remove({}).then((done) => {

            return Todoso.insertMany(todoso);

        }).then(() => done());
  
});


describe('POST/todoso', () => {

    it('should create a new todoso', (done) => {

        const text = 'Test todoso text';

        request(app)
            .post('/todoso')
            
            //****** 
            // send() includes the object type argument which is json.
            // *** it sends "res"
            // ES6 format
            .send({ text }) // sends to the mongo

            .expect(200)
            .expect((res) => {

                //res : the server sends the data received from the user

                // The first "text" property of Todoso object like send(result)
                // The second "text" is a variable in this test description.
                
                // Response function confirmation to the user
                expect(res.body.text).toBe(text);
            
            })
            .end ((err, res) => {

                if(err) return done(err);

                // it will find the all collection in MongosDB
                Todoso.find({ text }).then( (todoso) => {

                    // MongoDB confirmation
                    expect(todoso.length).toBe(1);
                    expect(todoso[0].text).toBe(text);
                    done();

                }).catch( err => done(err) );

            });

    });
    

    it('it should not create new collection and have an error', (done) => {

        request(app)
            .get('/todoso')
            .send({})
            .expect(400)
            .expect((res) => {
                
                // response function confirmation
                expect(res.body.text).toBe("");

            })
            .end ((err, result) => {

                if(err) return done();

                Todoso.find().then( (todoso) => {

                    // MongoDB confirmation
                    expect(todoso.length).toBe(2);
                    expect(todoso[0].text).toBe(null);
                    done();

                }).catch((err) => done(err));

            });

    });

});


describe ('Get /todoso', () => {

    it('it should get all todos', (done) => {

        request(app)
            .get('/todoso')
            .expect(200)
            .expect((res) => {

                console.log('res:', res.body)
                
                expect(res.body.todoso.length).toBe(2);

            })
            .end(done);

    });
});
