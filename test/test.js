const request = require('supertest');
const app = require('../app');
const should = require('should');

describe('SERVER API TEST :: POST /api/skills', () => {
  after((done) => {
    app.close(done);
  });

  describe('[@params: message] send non-keyword message', () => {
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

  describe('[@params: message] send keyword message', () => {
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

  describe('[@params: action_type, skill] launch stage', () => {
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

  describe('[@params: action_type, skill, answer] intent stage (intent = true)', () => {
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

  describe('[@params: action_type, skill, answer] intent stage (intent = false)', () => {
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

  describe('[@params: action_type, skill, answer] intent stage (incorrect intent)', () => {
    it('response status should be 400', (done) => {
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
});
