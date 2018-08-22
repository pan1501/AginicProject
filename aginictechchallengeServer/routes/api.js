var express = require('express');
var router = express.Router();

//Models
var Location = require('../models/locations');

Location.methods(['get', 'put', 'post', 'delete']);
Location.register(router, '/locations');

router.get('/locations', function(req,res){
    res.send('api is working');
    res.end();
});

//Return router
module.exports = router;