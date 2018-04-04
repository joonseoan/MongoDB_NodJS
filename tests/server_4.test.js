console.log('starting server_4.test.js');

const expect = require('expect');
const request = require('supertest');

const { app } = require('../server/server_4');
const { Todoso } = require('../server/models/todoso_3');

/**
 * Please, change "package.json" for the test!!!!!!! 
 * => go to the setup file.
 */

// Must the database collection should be empty before the test.
beforeEach((done) => {

    Todoso.remove({}).then( () => done());

});

/*

describe('POST/todoso', () => {

    it('should create a new todoso', (done) => {

        const text = 'Test todoso text';

        request(app)
            .post('/todoso')
            
            //****** 
            // send() includes the object type argument which is json.
            // *** it sends "res"
            // ES6 format
            .send({ text }) 

            .expect(200)
            .expect((res) => {

                // The first "text" property of Todoso object like send(result)
                // The second "text" is a variable in this test description.
                
                // Response function confirmation
                expect(res.body.text).toBe(text);
            
            })
            .end ((err, res) => {

                if(err) return done(err);

                // it will find the all collection in MongosDB
                Todoso.find().then( (todoso) => {

                    // MongoDB confirmation
                    expect(todoso.length).toBe(1);
                    expect(todoso[0].text).toBe(text);
                    done();

                })

            .catch( err => done(err) );
            });

    });

});

*/

describe ('POST/todoso', () => {

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
                    expect(todoso.length).toBe(0);
                    expect(todoso[0].text).toBe(null);
                    done();

                }).catch((err) => done(err));

            });

    });

});
