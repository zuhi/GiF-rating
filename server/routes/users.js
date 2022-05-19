const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const UserCredential = require('../models/user-credentials');
const User = require('../models/users');
const bcrypt = require('bcryptjs');

router.post('/', (req, res) => {
    if (!req.body) {
        res.status(400).send({error: "Email and Password not present in request"});
        return;
    }

    const { firstName, lastName, email, password } = req.body;

    if (!email) {
        res.status(400).send({error: "Email not present in request"});
        return;
    }

    if (!password) {
        res.status(400).send({error: "Password not present in request"});
        return;
    }

    UserCredential.findOne({ email }).then(user => {
        if (user) {
            res.status(400).send({error: "User already signed up"});
            return;
        }

        const hash = bcrypt.hashSync(password);

        const userCredential = new UserCredential({ email, password: hash });

        userCredential.save().then(() => {
            const user = new User({ _id: userCredential.id, email, firstName, lastName });
            user.save().then(() => {
                res.status(201).send({ id: userCredential.id });
            });
        });
    }).catch(() => {
        res.status(500).send({ error: "Internal Server Error" });
    });
});


router.get('/me',auth.authenticate,(req, res) => {
    User.findOne({ _id: req.session.userId }).then(user => {
        res.status(200).send(user);
    }).catch(() => {
        res.status(500).send({ error: "Internal Server Error" });
    });
});

router.get('/meUser',(req,res)=>{
    User.findById({_id: req.session.userId}).then(user => {
        res.send({id:req.session.userId,name: user.firstName});
        }).catch(()=>{
            res.status(500).send();
        })

})

router.get('/:userId', (req,res)=>{
    console.log('Inside get');
    User.findOne({_id: req.params.userId}).then(user => {
        res.send(user);
    }).catch(()=>{
        res.status(500).send({error: "Innternal Server error"});
    });
});

router.put('/me', auth.authenticate, (req, res) => {
    if (!req.session.userId) {
        res.send(401).send({ error: "Not logged in"});
    }
    
    const { firstName, lastName } = req.body;

    const updateQuery = {};
    (firstName !== undefined) && (updateQuery.firstName = firstName);
    (lastName !== undefined) && (updateQuery.lastName = lastName);

    User.updateOne({ _id: req.session.userId }, updateQuery).then(() => {
        res.status(204).send();
    }).catch(() => {
        res.status(500).send({ error: "Internal Server Error" });
    });
});

module.exports = router;