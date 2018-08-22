var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

mongoose.connect('mongodb://localhost/rest_test');

var app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

const cors = require('cors');
app.use(cors({
  origin: 'http://localhost:3001',
  credentials: true
}));

//Routes
app.use('/api', require('./routes/api'));

app.get('/', function(req, res){
    res.send('Please use /api/locations or /api/coordinates')
});

//Server starts
app.listen(3000);
console.log('API is running on port 3000');