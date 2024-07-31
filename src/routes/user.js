const express = require('express');
const router = new express.Router();
const User = require('../models/user');
const jwt = require("jsonwebtoken");
const auth = require('../middleware/auth');

router.post('/api/signup', async (req, res) => {
    const user = new User(req.body);
    try {
        const savedUser = await user.save();
        const token = jwt.sign({ _id: savedUser._id.toString() }, 'generatevalidtokenforauth');
        user.tokens = user.tokens.concat({ token });
        const u = await user.save();
        let formattedUser = { userName: '', role: '' };
        formattedUser.userName = u.userName;
        formattedUser.role = u.role;
        return res.status(200).send({ data: { user: formattedUser, token }, status: 1 });
    } catch (e) {
        return res.status(500).send({ data: "Please sign-up again", status: 0 });
    }
});

router.post('/api/login', async (req, res) => {
    const { userName, password } = req.body;
    try {
        const user = await User.findByCredentials(userName, password);
        const token = jwt.sign({ _id: user._id.toString() }, 'generatevalidtokenforauth');
        user.tokens = user.tokens.concat({ token });
        const u = await user.save();
        let formattedUser = { userName: '', role: '' };
        formattedUser.userName = u.userName;
        formattedUser.role = u.role;
        return res.status(200).send({ data: { user: formattedUser, token }, status: 1 });
    } catch (e) {
        return res.status(500).send({ data: "Please provide valid credentials", status: 0 });
    }
});

router.get('/api/logout', auth, async (req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter(token => {
            if (req.token !== token.token) {
                return true;
            }
        });
        await req.user.save();
        return res.status(200).send({ data: 'loggedout sucessfully', status: 1 });
    } catch (e) {
        return res.status(500).send({ data: "Unable to logout", status: 0 });
    }
});

router.get('/api/logoutAll', auth, async (req, res) => {
    try {
        req.user.tokens = [];
        await req.user.save();
        return res.status(200).send({ data: 'loggedout from ALL devices sucessfully', status: 1 });
    } catch (e) {
        return res.status(500).send({ data: "Unable to logout from All devices", status: 0 });
    }
});

module.exports = router;