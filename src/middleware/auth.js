const jwt = require("jsonwebtoken");
const User = require('../models/user');

// this is to verify token.
const auth = async (req, res, next) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '');
        // this will provide the decoded value of the key which we used to generate token.
        const decode = jwt.verify(token, 'generatevalidtokenforauth');
        const user = await User.findOne({_id: decode._id, 'tokens.token':token});
        req.token = token;
        req.user = user;
        next();
    } catch(e) {
        res.status(500).send('Plz authenticate');
    }
  
}

module.exports = auth;