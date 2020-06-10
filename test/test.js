const request = require('supertest');
const app = require('../app');
const should = require('should');

describe('SERVER API TEST :: POST /api/skills', () => {
  after((done) => {
    app.close(done);
  });

  describe('[@req.body: message] send non-keyword message', () => {
    it('should return object that includes skill, message and action_type.', function (done) {
      request(app)
        .post('/api/skills')
        .send({ message: 'test' })
        .set('Accept', 'application/json')
        .expect('Content-type', /json/)
        .expect(200)
        .end((err, res) => {
          if (err) return done(err);
          const response = res.body;
          response.should.have.keys('skill', 'message', 'action_type');
          done();
        });
    });
  });

  describe('[@req.body: message] send keyword message', () => {
    it('action_type of response should be equal to intent', (done) => {
      request(app)
        .post('/api/skills')
        .send({ message: '썸' })
        .set('Accept', 'application/json')
        .expect('Content-type', /json/)
        .expect(200)
        .end((err, res) => {
          if (err) return done(err);
          const response = res.body;
          response.should.have.keys('skill', 'message', 'action_type');
          response.action_type.should.equal('intent');
          done();
        });
    });
  });

  describe('[@req.body: action_type, skill] launch stage', () => {
    it('action_type of response should be equal to intent', (done) => {
      request(app)
        .post('/api/skills')
        .send({
          skill: {
            id: 1,
            name: 'some'
          },
          action_type: 'launch'
        })
        .set('Accept', 'application/json')
        .expect('Content-type', /json/)
        .expect(200)
        .end((err, res) => {
          if (err) return done(err);
          const response = res.body;
          response.should.have.keys('skill', 'message', 'action_type');
          response.action_type.should.equal('intent');
          done();
        });
    });
  });

  describe('[@req.body: action_type, skill, answer] intent stage (intent = true)', () => {
    it('action_type of response should be equal to input', (done) => {
      request(app)
        .post('/api/skills')
        .send({
          skill: {
            id: 1,
            name: 'some'
          },
          action_type: 'intent',
          answer: {
            intent: true
          }
        })
        .set('Accept', 'application/json')
        .expect('Content-type', /json/)
        .expect(200)
        .end((err, res) => {
          if (err) return done(err);
          const response = res.body;
          response.should.have.keys('skill', 'message', 'action_type');
          response.action_type.should.equal('input');
          done();
        });
    });
  });

  describe('[@req.body: action_type, skill, answer] intent stage (intent = false)', () => {
    it('action_type of response should be equal to fallback', (done) => {
      request(app)
        .post('/api/skills')
        .send({
          skill: {
            id: 1,
            name: 'some'
          },
          action_type: 'intent',
          answer: {
            intent: false
          }
        })
        .set('Accept', 'application/json')
        .expect('Content-type', /json/)
        .expect(200)
        .end((err, res) => {
          if (err) return done(err);
          const response = res.body;
          response.should.have.keys('skill', 'message', 'action_type');
          response.action_type.should.equal('fallback');
          done();
        });
    });
  });

  describe('[@req.body: action_type, skill, answer] intent stage (incorrect intent)', () => {
    it('respons status should be 400 and includes error', (done) => {
      request(app)
        .post('/api/skills')
        .send({
          skill: {
            id: 1,
            name: 'some'
          },
          action_type: 'intent',
          answer: {
            intent: ''
          }
        })
        .set('Accept', 'application/json')
        .expect('Content-type', /json/)
        .expect(400)
        .end((err, res) => {
          if (err) return done(err);
          const response = res.body;
          response.should.have.keys('error');
          done();
        });
    });
  });

  describe('[@req.body: action_type, skill, answer] input stage', () => {
    it('action_type of response should be equal to choice', (done) => {
      request(app)
        .post('/api/skills')
        .send({
          skill: {
            id: 1,
            name: 'some'
          },
          action_type: 'input',
          answer: {
            input: 'name'
          }
        })
        .set('Accept', 'application/json')
        .expect('Content-type', /json/)
        .expect(200)
        .end((err, res) => {
          if (err) return done(err);
          const response = res.body;
          response.should.have.keys('skill', 'message', 'action_type', 'cards');
          response.action_type.should.equal('choice');
          done();
        });
    });
  });

  describe('[@req.body: action_type, skill, answer] input stage (length of input should be longer than 0)', () => {
    it('respons status should be 400 and includes error', (done) => {
      request(app)
        .post('/api/skills')
        .send({
          skill: {
            id: 1,
            name: 'some'
          },
          action_type: 'input',
          answer: {
            input: ''
          }
        })
        .set('Accept', 'application/json')
        .expect('Content-type', /json/)
        .expect(400)
        .end((err, res) => {
          if (err) return done(err);
          const response = res.body;
          response.should.have.keys('error');
          done();
        });
    });
  });

  describe('[@req.body: action_type, skill, answer] input stage (typeof input should be string)', () => {
    it('respons status should be 400 and includes error', (done) => {
      request(app)
        .post('/api/skills')
        .send({
          skill: {
            id: 1,
            name: 'some'
          },
          action_type: 'input',
          answer: {
            input: 7
          }
        })
        .set('Accept', 'application/json')
        .expect('Content-type', /json/)
        .expect(400)
        .end((err, res) => {
          if (err) return done(err);
          const response = res.body;
          response.should.have.keys('error');
          done();
        });
    });
  });

  describe('[@req.body: action_type, skill, answer] choice stage (valid card_id)', () => {
    it('action_type of response should be equal to review', (done) => {
      request(app)
        .post('/api/skills')
        .send({
          skill: {
            id: 1,
            name: 'some'
          },
          action_type: 'choice',
          answer: {
            choice: 17,
            input: 'vincent'
          }
        })
        .set('Accept', 'application/json')
        .expect('Content-type', /json/)
        .expect(200)
        .end((err, res) => {
          if (err) return done(err);
          const response = res.body;
          response.should.have.keys(
            'skill',
            'message',
            'action_type',
            'interpretation'
          );
          response.action_type.should.equal('review');
          done();
        });
    });
  });

  describe('[@req.body: action_type, skill, answer] choice stage (invalid card_id, card_id should be smaller than 79)', () => {
    it('response status should be 400 and includes error', (done) => {
      request(app)
        .post('/api/skills')
        .send({
          skill: {
            id: 1,
            name: 'some'
          },
          action_type: 'choice',
          answer: {
            choice: {
              choice: 79,
              input: 'vincent'
            }
          }
        })
        .set('Accept', 'application/json')
        .expect('Content-type', /json/)
        .expect(400)
        .end((err, res) => {
          if (err) return done(err);
          const response = res.body;
          response.should.have.keys('error');
          done();
        });
    });
  });

  describe('[@req.body: action_type, skill, answer] review stage (valid review)', () => {
    it('action_type of response should be equal to null that means ending of sceanrio', (done) => {
      request(app)
        .post('/api/skills')
        .send({
          skill: {
            id: 1,
            name: 'some'
          },
          action_type: 'review',
          answer: {
            review: '고마워 라마마'
          }
        })
        .set('Accept', 'application/json')
        .expect('Content-type', /json/)
        .expect(200)
        .end((err, res) => {
          if (err) return done(err);
          const response = res.body;
          response.should.have.keys('skill', 'message', 'action_type');
          (response.action_type === null).should.be.true;
          done();
        });
    });
  });

  describe('[@req.body: action_type, skill, answer] review stage (invalid review, review should be string)', () => {
    it('response status should be 400 and includes error', (done) => {
      request(app)
        .post('/api/skills')
        .send({
          skill: {
            id: 1,
            name: 'some'
          },
          action_type: 'review',
          answer: {
            review: true
          }
        })
        .set('Accept', 'application/json')
        .expect('Content-type', /json/)
        .expect(400)
        .end((err, res) => {
          if (err) return done(err);
          const response = res.body;
          response.should.have.keys('error');
          done();
        });
    });
  });

  describe('[@req.body: action_type, skill, answer] review stage (invalid review, length of review should be longer than 0)', () => {
    it('response status should be 400 and includes error', (done) => {
      request(app)
        .post('/api/skills')
        .send({
          skill: {
            id: 1,
            name: 'some'
          },
          action_type: 'review',
          answer: {
            review: ''
          }
        })
        .set('Accept', 'application/json')
        .expect('Content-type', /json/)
        .expect(400)
        .end((err, res) => {
          if (err) return done(err);
          const response = res.body;
          response.should.have.keys('error');
          done();
        });
    });
  });
});
