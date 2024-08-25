const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const { taskManagerConnection } = require('../db/mongoose');

const userSchema = new mongoose.Schema({
    userName: {type: String, required: true, trim: true, unique: true},
    password: {type: String, required: true, trim: true},
    email: {type: String, required: true, trim: true, unique: true},
    // permissions: {type: [], required: true, trim: true},
    role: {type: String, required: true, trim: true},
    tokens: [{
        token: {type: String}
    }],
    enrolledCourses: [{ type: String, ref: 'courses' }],
    yourCourses: [{ type: String, ref: 'courses' }]
});
// this will remove the 
// userSchema.methods.toJSON = async function() {
//     const user = this
//     const userObject = user.toObject();
//     delete userObject.password
//     delete userObject.tokens
//     return userObject;
// }
userSchema.methods.generateToken = async function() {
    const user = this
    const token = jwt.sign({ _id: user._id.toString() }, 'generatevalidtokenforauth');
    user.tokens = user.tokens.concat({ token });
    return token;
}

userSchema.statics.findByCredentials = async (userName, password) => {
    const user = await User.findOne({userName});
    if(!user) {
        // return res.status(500).send({data: 'Not able to login from findByCredMethods', status: 0});
         // throw new Error('Not able to login from findByCredMethods');
         return 
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if(!isMatch) {
        // throw new Error('Not able to login from findByCredMethods2');
        return 
    }
    return user;
}
userSchema.pre('save', async function(next) {
    const user = this;
    // to check if password is modified or not, this isModified method is provided by mongoose
    if(user.isModified('password')) {
        // hashing password.
        user.password = await bcrypt.hash(user.password, 8);
    }
    next();
})

const User = taskManagerConnection.model('User', userSchema);
module.exports =   User;



