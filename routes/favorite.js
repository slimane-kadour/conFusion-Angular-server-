var express = require('express');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var Verify = require('./verify');

var Dishes =require('../models/dishes');

var  favorite= express.Router();
favorite.use(bodyParser.json());

favorite.route('/')
.get( function (req, res, next) {
    Dishes.find(req.query)
        .populate('comments.postedBy')
        .exec(function (err, dish) {
        if (err) next (err);
        res.json(dish);
    });
});

favorite.route('/:dishId')

.get(function (req, res, next) {
    Dishes.findById(req.params.dishId)
        .populate('comments.postedBy')
        .exec(function (err, dish) {
      if (err) next (err);
        res.json(dish);
    });
})
.put( function (req, res, next) {
    Dishes.findByIdAndUpdate(req.params.dishId, {
	
    })
})
.delete( function (req, res, next) {
     Dishes.findById(req.params.dishId, function (err, dish) {
	  dish.favoritedish.remove();
        dish.save(function (err, resp) {
          if (err) next (err);
            res.json(resp);
			});
        });
});





module.exports = favorite ;
