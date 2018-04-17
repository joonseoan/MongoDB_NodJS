console.log('starting server_10.test.js');

const expect = require('expect'); // MUST USE npm install expect@1.20.2 --save-dev (so far)
const request = require('supertest');
const { ObjectID } = require('mongodb');

const { app } = require('../server/server_10');
const { Todoso } = require('../server/models/todoso_3');

const todoso = [
    
    { 
        
      _id : new ObjectID(), 
      text: 'First test todo'
    
    }, 
    { 

      _id : new ObjectID(),
      text: 'Second test todo',
      completed : true,
      completedAt : 333

    }

];

beforeEach((done) => {
  
    Todoso.remove({}).then((done) => {

        return Todoso.insertMany(todoso);

    }).then(() => done());
  
});

// =========================================== POST/TODOSO ======================================

describe('POST/todoso', () => {

    it('should create a new todoso', (done) => {

        const text = 'Test todoso text';

        request(app)
            .post('/todoso')
            .send({ text }) // send and thenn save this field and document in database
            .expect(200)
            .expect((res) => {

                // "res.body.text" is a field that the server shows the confirmation to the user
                // It is an object and document format specified in "server_8.js"
                expect(res.body.text).toBe(text);
            
            })
            .end ((err, res) => {

                if(err) return done(err);

                Todoso.find({ text }).then( (todoso) => {

                    // firnd queries => an array format
                    expect(todoso.length).toBe(1);

                    // Becasue a collection is composed of an array format.
                    expect(todoso[0].text).toBe(text);
                    done();

                }).catch( err => done(err) );

            });

    });
    
    it('it should not create new collection and have an error', (done) => {

        request(app)
            .post('/todoso')
            .send({})
            .expect(400)
            .expect((res) => {

                expect(res.body.text).toBeNull();

            })
            .end ((err, result) => {

                if(err) return done();

                Todoso.find({}).then((todos) => {

                    expect(todos.length).toBe(2); // todoso variable above
                    expect(todos[0].text).toBe(todoso[0].text);
                    done();

                }).catch((err) => done(err));

            });

    });

});

// =========================================== GET/TODOSO ======================================

describe ('Get /todoso', () => {

    it('it should get all todos', (done) => {

        request(app)
            .get('/todoso')
            .expect(200)
            .expect((res) => {
                
                // returns an array format because all documents
                expect(res.body.todoso.length).toBe(2);

            })
            .end(done);

    });

});


// =========================================== GET/TODOSO/:ID ======================================
// find quieries and get all result ==> an array format!!!
// Other results are an object format.

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


    });

    it('it should return 400 if "id" is not valid', (done) => {

        const newID = '234'
        
        request(app)
            .get(`/todoso/${newID}`)
            .expect(404)
            .end(done);

    });
    
});


// =========================================== DELETE/TODOSO/:ID ======================================

describe('Delete /todoso/:id', () => {

    it('it should delete a todoso', (done)=> {

        var hexID = todoso[1]._id.toHexString();

        request(app)
            .delete(`/todoso/${hexID}`)
            // Until this step, the document with the _id value still exists
            //  Therefore, we can access the directory.
            .expect(200) 
            .expect((res) => {

                // Bear in mind that it returns the deleted document.
                // An object format.
                expect(res.body.result._id).toBe(hexID);

            })
            .end( (err, result) => {

                if (err) return done(err);

                Todoso.findById(hexID).then((todoso) => {

                    expect(todoso).toBe(null);
                    expect(todoso).toNotExist(); // toNotExist deprecated, now by the way!!!
                    done();

                }).catch(err => done(err));
           
            });
            

        });


        it('it should return 404 if byID is not available', (done) => {

            const newHexID = new ObjectID().toHexString();
    
            request(app)
                .delete(`/todoso/${newHexID}`)
                .expect(404)
                .end(done)

        });

        it('it should return 400 if "id" is not valid', (done) => {

            const newID = '234'
            
            request(app)
                .delete(`/todoso/${newID}`)
                .expect(404)
                .end(done);
    
        });
    
});  

// =========================================== PATCH/TODOSO/:ID ======================================

describe('PATCH /todoso/:id', () => {

    it('It shoud have a correct update', (done) => {

        const hexID = todoso[0]._id.toHexString();
        const completed = true;
        const text = 'cheer up';

        request(app)
            .patch(`/todoso/${hexID}`)
            .expect(200)
            .send({ text, completed })
            .expect(res => {

                expect(res.body.updated.text).toBe(text);
                expect(res.body.updated.completed).toBe(true); // (true)
                expect(res.body.updated.completedAt).toBeA('number');
                //expect(res.body.updated.completedAt).toNotMatch(todoso[1].completedAt);

            }).end(done); 
            
    });

    it('it should clear completedAt when todoso is not completed', (done) => {

        const hexID = todoso[1]._id.toHexString();
        const completed = false;
        const text = 'what are you doing?';

        request(app)
            .patch(`/todoso/${hexID}`)
            .expect(200)
            .send({ text, completed })
            .expect(res => {

                expect(res.body.updated.completed).toBe(false);
                expect(res.body.updated.completedAt).toNotExist();

            }).end(done);
    });

    it('it should return 404 if byID is not available', (done) => {

        const newHexID = new ObjectID().toHexString();

        request(app)
            .patch(`/todoso/${newHexID}`)
            .expect(404)
            .end(done)


    });

    it('it should return 400 if "id" is not valid', (done) => {

        const newID = '234'
        
        request(app)
            .patch(`/todoso/${newID}`)
            .expect(404)
            .end(done);

    });

});