const jwt = require("jsonwebtoken");
const User = require('../models/user');

// this is to verify token.
const auth = async (req, res, next) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '');
        // verify method will provide the _id(which we used to generate token)
        const decode = jwt.verify(token, 'generatevalidtokenforauth');
        // By using decode._id we will query the DB to get user info. if we get response we can confirm that this user exists.
        const user = await User.findOne({ _id: decode._id, 'tokens.token': token });
        req.token = token;
        req.user = user;
        next();
    } catch (e) {
        res.status(500).send({data: 'Log in first  to get access', status: 0});
    }

}

module.exports = auth;