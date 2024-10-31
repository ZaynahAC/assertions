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
        .keepOpen()
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
        .keepOpen()
        .get('/hello?name=zaynah')
        .end(function (err, res) {
          assert.equal(res.status, 200);
          assert.equal(res.text, 'hello zaynah');
          done();
        });
    });
    // #3
    test('send {surname: "Colombo"}', function(done) {
    
      chai
        .request(server)
        .put('/travellers')
       
        .send({ surname: 'Colombo' })
        
        .end(function(err, res) {
        
          assert.equal(res.status, 200, 'response status should be 200');
          assert.equal(res.type, 'application/json', 'Response should be json');
          assert.equal(res.body.name, 'Cristoforo', 'res.body.name should be "Christoforo"');
          assert.equal(res.body.surname, 'Colombo', 'res.body.surname should be "Colombo"');
          done(); 
        });
    });
    // #4
    test('send {surname: "da Verrazzano"}', function(done) {
      
      chai
        .request(server)
        .put('/travellers')
        .send({ surname: 'da Verrazzano' })
        
        .end(function(err, res) {
          assert.equal(res.status, 200, 'response status should be 200');
          assert.equal(res.type, 'application/json', 'Response should be json');
          assert.equal(res.body.name, 'Giovanni');
          assert.equal(res.body.surname, 'da Verrazzano');
    
          done();
        });
    });
});

const Browser = require('zombie');
const browser = new Browser();
Browser.site = 'http://0.0.0.0:3000'; // Your URL here

suite('Functional Tests with Zombie.js', function () {
  this.timeout(5000);



  suite('Headless browser', function () {
    test('should have a working "site" property', function() {
      assert.isNotNull(browser.site);
    });
  });

  suite('"Famous Italian Explorers" form', function () {
    // #5
    test('Submit the surname "Colombo" in the HTML form', function (done) {
      assert.fail();

      done();
    });
    // #6
    test('Submit the surname "Vespucci" in the HTML form', function (done) {
      assert.fail();

      done();
    });
  });
})}); 




const chai = require('chai');
const expect = chai.expect;

const Browser = require('zombie');
Browser.localhost('example.com', 3000); // Replace 'example.com' with your app's address

const browser = new Browser();
describe('Headless browser testing', function() {
  this.timeout(5000); // Set timeout to allow enough time for the browser to start and load pages

  before(function() {
    return browser.visit('/'); // Navigate to the root of your local server
  });

  it('should have a working "site" property', function() {
    browser.assert.success(); // Check if the page loaded successfully
  });
});
it('should submit forms', function(done) {
  browser.fill('input[name="s"]', 'search query').pressButton('Search', function() {
    browser.assert.text('title', 'Search Results'); // Assuming the title tag is updated with search results
    browser.assert.element('table#results'); // Check if a table with ID 'results' exists
    done();
  });
});

test('submit "surname" : "Colombo" - write your e2e test...', function(done) {
  // fill the form...
  // then submit it pressing 'submit' button.
  //
  // in the callback...
  // assert that status is OK 200
  // assert that the text inside the element 'span#name' is 'Cristoforo'
  // assert that the text inside the element 'span#surname' is 'Colombo'
  // assert that the element(s) 'span#dates' exist and their count is 1
  browser.fill('surname', 'Colombo').pressButton('submit', function() {
    /** YOUR TESTS HERE, Don't forget to remove assert.fail() **/

    // pressButton is Async.  Waits for the ajax call to complete...

    // assert that status is OK 200
    browser.assert.success();
    // assert that the text inside the element 'span#name' is 'Cristoforo'
    browser.assert.text('span#name', 'Cristoforo');
    // assert that the text inside the element 'span#surname' is 'Colombo'
    browser.assert.text('span#surname', 'Colombo');
    // assert that the element(s) 'span#dates' exist and their count is 1
    browser.assert.element('span#dates', 1);

    done(); // It's an async test, so we have to call 'done()''
  });
});