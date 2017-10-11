var express = require('express');
var router = express.Router();
var path = require('path');

// Connect string to MySQL
var mysql = require('mysql');
var connection = mysql.createConnection({
  host     : 'fling.seas.upenn.edu',
  user     : 'amakhija',
  password : 'Fredandgeorge123',
  database : 'amakhija'
});

/* GET home page. */
router.get('/', function(req, res, next) {
  res.sendFile(path.join(__dirname, '../', 'views', 'index.html'));
});

router.get('/reference', function(req, res, next) {
  res.sendFile(path.join(__dirname, '../', 'views', 'reference.html'));
});

router.get('/insert', function(req, res, next) {
  res.sendFile(path.join(__dirname, '../', 'views', 'insert.html'));
});

router.get('/data/:email', function(req,res) {
  // use console.log() as print() in case you want to debug, example below:
  // console.log("inside person email");
  var query = 'SELECT p.*, COUNT(f.friend) as numfriends FROM Person p JOIN Friends f ON p.login = f.login GROUP BY p.login';
  // you may change the query during implementation
  var email = req.params.email;
  if (email != 'undefined') query = query + ' where login ="' + email + '"' ;
  console.log(query);
  connection.query(query, function(err, rows, fields) {
    if (err) console.log(err);
    else {
        res.json(rows);
    }  
    });
});

// ----Your implemention of route handler for "Insert a new record" should go here-----

router.post('/insert/:login/:name/:sex/:RelationshipStatus/:Birthyear', function(req,res) {
  console.log('just clicked submit');
  console.log(req.params);

  var login = req.params.login;
  var name = req.params.name;
  var sex = req.params.sex;
  var rS = req.params.RelationshipStatus;
  var bY = req.params.Birthyear;

  var query = "INSERT INTO Person VALUES ('"+login+"','"+name+"','"+sex+"','"+rS+"','"+bY+"'"+")";
  console.log(query);

  connection.query(query, function(err) {
    if (err) {
      console.log('WITHIN ERROR BLOCK');
      console.log(err);
    }
    else {
      console.log('WITHIN SUCCESS BLOCK');
      res.send;
    }
  })

});

module.exports = router;