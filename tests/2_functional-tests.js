const chai = require('chai');
const assert = chai.assert;

const server = require('../server');

const chaiHttp = require('chai-http');
chai.use(chaiHttp);

suite('Functional Tests', function () {
  this.timeout(5000);
  suite('Integration tests with chai-http', function () {
    // #1
    test('Test GET /hello with no name', function (done) {
      chai
        .request(server)
        .get('/hello')
        .end(function (err, res) {
          assert.equal(res.status, 200);
          assert.equal(res.text, 'hello Guest');
          done();
        });
    });
    // #2
    test('Test GET /hello with your name', function (done) {
      chai
        .request(server)
        .get('/hello?name=Bong')
        .end(function (err, res) {
          assert.equal(res.status, 200);
          assert.equal(res.text, 'hello Bong');
          done();
        });
    });
    // #3
    test('Send {surname: "Colombo"}', function (done) {
      chai
        .request(server)
        .put('/travellers')
        .send({
          "surname": "Colombo"
        })
        .end(function (err, res) {
          assert.equal(res.status, 200);
          assert.equal(res.type, 'application/json');
          assert.equal(res.body.name, 'Cristoforo');
          assert.equal(res.body.surname, 'Colombo');
          done();
        });
    });
    // #4
    test('Send {surname: "da Verrazzano"}', function (done) {
      chai
        .request(server)
        .put('/travellers')
        .send({
          "surname": "da Verrazzano"
        })
        .end(function (err, res) {
          assert.equal(res.status, 200, "The API Status should be 200");
          assert.equal(res.type, 'application/json');
          assert.equal(res.body.name, "Giovanni", "The Name should be " + res.body.name);
          assert.equal(res.body.surname, "da Verrazzano", "The surname should be da Verrazzano");
          done();
        
      })
    });
  });
});

const Browser = require('zombie');

suite('Functional Tests with Zombie.js', function () {
  this.timeout(5000);
  Browser.site = 'https://freecodecamp-qa-cert.glitch.me'; // Your URL here

  suite('Headless browser', function () {
    test('should have a working "site" property', function () {
      assert.isNotNull(Browser.site);
    });
  });

  suite("e2e Testing with Zombie.js", function () {
    const browser = new Browser();
      suiteSetup(function(done) {
      return browser.visit('/', done);
    });
    suite('"Famous Italian Explorers" form', function () {
      // #5
      test('submit "surname" : "Colombo" - write your e2e test...', function (done) {
        browser.fill('surname', 'Colombo').pressButton('submit', function() {
          browser.assert.success();
          browser.assert.text('span#name', 'Cristoforo');
          browser.assert.text('span#surname', 'Colombo');
          browser.assert.element('span#dates', 1);
  
          done(); 
        });
      });
    });
    // #6
    test('Submit the surname "Vespucci" in the HTML form', function (done) {
      assert.fail();

      done();
    });
  });
});
