const mongoose = require('mongoose');
require('dotenv').config();


const atlasMongoConnection = mongoose.createConnection(process.env.MONGO_DB_URL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
})

const localDSchemas = mongoose.createConnection(`mongodb+srv://${process.env.ATLAS_USER_NAME}:${process.env.ATLAS_PSWD}@${process.env.CLUSTER_INFO}/task-manager-api`, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});


module.exports = {
    atlasMongoConnection,
    localDSchemas
};