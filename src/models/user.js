const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    userName: {type: String, required: true, trim: true, unique: true},
    password: {type: String, required: true, trim: true},
    // permissions: {type: [], required: true, trim: true},
    role: {type: String, required: true, trim: true},
    tokens: [{
        token: {type: String, required: true}
    }]
});

userSchema.statics.findByCredentials = async (userName, password) => {
    // console.log(1);
    const user = await User.findOne({userName});
    // console.log('3',user);
    if(!user) {
         throw new Error('Not able to login from findByCredMethods');
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if(!isMatch) {
        throw new Error('Not able to login from findByCredMethods2');
    }
    // console.log(user);
    return user;
}
// userSchema.methods.generateAuthToken = async function () {
//     const user = this;
//     console.log("@@@@@",user);
//     return "myToken"
// };
// this will call just before save method executes.
userSchema.pre('save', async function(next) {
    const user = this;
    // to check if password is modified or not, this isModified method is provided by mongoose
    if(user.isModified('password')) {
        // hashing password.
        user.password = await bcrypt.hash(user.password, 8);
    }
    next();
})

// export const User = mongoose.model('User', userSchema);
const User = mongoose.model('User', userSchema);
module.exports =   User;



