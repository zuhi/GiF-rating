const express = require('express');
const router = express.Router();
const Giphy = require('../models/gihpy');
var ObjectId = require('mongoose').Types.ObjectId; 


router.get('/:category',(req,res) => {
    const limitVal = req.query.limit;
    Giphy.find({ category : req.params.category }).limit(limitVal).then( cat => {
        res.send({ data: cat});
    }).catch(() =>{
        res.status(500).send({error : 'Internal server error'});
    }
    );

});

router.get('/tags/:tagName',(req,res) => {
    const limitVal = req.query.limit;
    Giphy.find({ tags : req.params.tagName }).limit(limitVal).then( cat => {
        res.send({ data: cat});
    }).catch(() =>{
        res.status(500).send({error : 'Internal server error'});
    }
    );

});

router.put('/likes',(req,res) => {
    const {_id,rating }= req.body;
    const newrating = +rating +1;
    Giphy.updateOne({ _id: _id }, {$set: { 'rating': newrating} } ).then(() => {
        res.status(204).send();
    }).catch(() => {
        res.status(500).send({ error: "Internal Server Error" });
    });
});

router.put('/views',(req,res) => {
    const {_id, views} = req.body;
    Giphy.updateOne({ _id: _id }, {$set: { 'views': views} }).then(() => {
        res.status(204).send();
    }).catch(() => {
        res.status(500).send({ error: "Internal Server Error" });
    });
});

router.put('/comments',(req,res) => {
    const {_id, reviews }= req.body;
    Giphy.updateOne({ _id: _id }, {$set: { 'reviews': reviews} }).then(() => {
        res.status(204).send();
    }).catch(() => {
        res.status(500).send({ error: "Internal Server Error" });
    });
});

module.exports = router;