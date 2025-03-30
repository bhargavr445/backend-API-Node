const mongoose = require('mongoose')

const userName = 'bhargav';
const password = 'Wednesday40';
const clusterInfo = 'cluster0.xoqibqx.mongodb.net'

const atlasMongoConnection = mongoose.createConnection(`mongodb+srv://${userName}:${password}@${clusterInfo}/task-manager-api`, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
})

const localDSchemas = mongoose.createConnection('mongodb://127.0.0.1:27017/task-manager-api', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});


module.exports = {
    atlasMongoConnection,
    localDSchemas
};