const mongoose = require('mongoose')

const taskManagerConnection = mongoose.createConnection('mongodb://127.0.0.1:27017/task-manager-api', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
})

const udemyConnection = mongoose.createConnection('mongodb://127.0.0.1:27017/Udemy', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});


module.exports = {
    taskManagerConnection,
    udemyConnection
};