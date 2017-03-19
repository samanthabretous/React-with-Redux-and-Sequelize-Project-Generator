const expect = require('chai').expect;
const supertest = require('supertest');
const server = require('../server');
const models = require('../server/db/models');

const User = models.user;

describe('Demo tests', () => {
  // fake user data that we'll use for tests
  const users = [
    { username: 'test1', email: 'test1@gmail.com', password: 'password1' },
    { username: 'test2', email: 'test2@gmail.com', password: 'password2' },
    { username: 'test3', email: 'test3@gmail.com', password: 'password3' },
  ];
  // use 'before' to seed your database with data before your tests
  // you only need one 'before' statement
  // there's also a 'beforeEach' function runs before each of your tests, individually
  before(() => User.sync({ force: true })
    .then(() => User.bulkCreate(users, { validate: true, individualHooks: true }))
    .catch((err) => console.log('DB Err!', err)));

  it('demo test, should pass', () => {
    expect(3).equal(3);
  });

  // example of how to do a test to get all users route
  it('/users should respond with all users', (done) => {
    supertest(server)
      .get('/api/user')
      .end((err, res) => {
        expect(res.body.length).equal(3);
        expect(res.body[0].username).equal(users[0].username);
        expect(res.body[1].username).equal(users[1].username);
        expect(res.body[2].username).equal(users[2].username);
        done();
      });
  });
  it('"/api/user/registration" should respond with a new user', (done) => {
    const newUser = { email: 'mickey@disney.com', username: 'mickey', password: 'password1' };
    supertest(server)
      .post('/api/user/registration')
      .send(newUser)
      .end((err, res) => {
        expect(res.body).be.a('object');
        expect(res.body).to.have.property('email');
        expect(res.body).to.have.property('username');
        done();
      });
  });

  it('"/api/user/authentication" should respond with a user', (done) => {
    const user = { username: 'test1', password: 'password1' };
    supertest(server)
    .post('/api/user/authentication')
    .send(user)
    .end((err, res) => {
      expect(res.body).be.a('object');
      expect(res.body.email).equal('test1@gmail.com');
      expect(res.body.username).equal('test1');
      expect(res.body.password).equal(null);
      done();
    });
  });

  // clean up database after running test
  after((done) => {
    models.user.destroy({
      where: {
        username: 'mickey',
      },
    });
    done();
  });
});
