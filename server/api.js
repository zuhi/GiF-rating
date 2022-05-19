const express = require('express');
const router = express.Router();


const users = require('./routes/users');
const sessions = require('./routes/sessions');
const gihpy = require('./routes/giphys');

router.use(express.json());
router.use(express.urlencoded({ extended: true}));

router.use('/users', users);

router.use('/sessions', sessions);

router.use('/giphys', gihpy);


module.exports = router;

