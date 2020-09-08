const express = require('express')
require('./db/mongoose');
const User = require('./models/user');
const studentRoute = require('./routes/student');
const userRoute = require('./routes/user');
const cors = require('cors');
const app = express()
const port = process.env.PORT || 3000

app.use(cors());
app.use(express.json());
app.use(studentRoute);
app.use(userRoute);



app.listen(port, () => {
    console.log('Server is up on port ' + port);
})