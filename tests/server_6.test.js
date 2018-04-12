/*

console.log('starting server_6.test.js');

const expect = require('expect');
const request = require('supertest');
const { ObjectID } = require('mongodb');

const { app } = require('../server/server_6');
const { Todoso } = require('../server/models/todoso_3');

const todoso = [
    
    { _id : new ObjectID(), 
      text: 'First test todo' }, 
    
    { _id : new ObjectID(),
      text: 'Second test todo' }

];
  
beforeEach((done) => {
  
    Todoso.remove({}).then((done) => {

        return Todoso.insertMany(todoso);

    }).then(() => done());
  
});


// =========================================== POST ======================================

describe('POST/todoso', () => {

    it('should create a new todoso', (done) => {

        const text = 'Test todoso text';

        request(app)
            .post('/todoso')
            .send({ text })
            .expect(200)
            .expect((res) => {

                expect(res.body.text).toBe(text);
            
            })
            .end ((err, res) => {

                if(err) return done(err);

                Todoso.find({ text }).then( (todoso) => {

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

                expect(res.body.text).toBe("");

            })
            .end ((err, result) => {

                if(err) return done();

                Todoso.find().then( (todoso) => {

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

describe('Get /todoso/:id', () => {

    it('it should have params.id correctly', (done) => {

        request(app)
            .get(`/todoso/${todoso[0]._id.toHexString()}`)
            .expect(200)
            .expect((res) => {

                // res.body.byID => sends the MongoDB document with matched ID.
                expect(res.body.byID.text).toBe(todoso[0].text);
            
            })
            .end(done);

    });

    it('it should return 404 if byID is not available', (done) => {

        const newHexID = new ObjectID().toHexString();

        request(app)
            .get(`/todoso/${newHexID}`)
            .expect(404)
            .end(done)

        // 
        
        request(app)
            .get(`/todoso/${id}`)
            .expect(404)
            .expect((res) => {

                 console.log('res.body: ',res.body);

                expect(res.body).toEqual({});

            })
            .end(done);     

    });


    it('it should return 400 if "id" is not valid', (done) => {

        const newID = '234'
        
        request(app)
            .get(`/todoso/${newID}`)
            .expect(404)
            .end(done);

    });
    
});
*/
