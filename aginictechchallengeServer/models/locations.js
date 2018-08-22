var restful = require('node-restful');
var mongoose = restful.mongoose;

//Schema
var locationSchema = new mongoose.Schema({
    name: String,
    address: String
});

module.exports = restful.model('Locations', locationSchema)