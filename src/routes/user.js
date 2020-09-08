

const express = require('express');
const router = new express.Router();
const User = require('../models/user');
const jwt = require("jsonwebtoken");
const auth = require('../middleware/auth');

router.post('/api/signup', async (req, res) => {
    const user = new User(req.body);
    try {
        await user.save();
        res.status(200).send(user);
    } catch (e) {
        res.status(200).send(e);
    }
});

router.post('/api/login' ,async (req, res) => {
    const { userName, password } = req.body;
    const user = await User.findByCredentials(userName, password);
   // console.log("@@@@@@@@@@@@@@@@@@@@@@@",user);
    const token = jwt.sign({ _id:user._id.toString()}, 'generatevalidtokenforauth');
    //console.log(token);
    user.tokens = user.tokens.concat({token});
    // user.tokens = [ ...user.tokens, token]
    const u = await user.save();
// console.log(user);
    //await user.save()
    if(!token) {
        throw new Error('Token creation failed');
    }
    return res.status(200).send({u, token});
});


router.get('/api/logout', auth, async (req, res) => {
    // console.log(req.user);
    console.log(req.token);
    console.log(req.user);
    try {
        req.user.tokens = req.user.tokens.filter(token => {
            console.log("@@@@@",token.token);
            if (req.token !== token.token) {
                return true;
            }
        });
        console.log(req.user);
        await req.user.save();
        res.status(200).send('loggedout sucessfully');
    } catch (e) {
        throw new Error('Unable to logout');
    }
});

module.exports = router;