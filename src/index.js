const express = require('express')
require('./db/mongoose');
const User = require('./models/user');
const studentRoute = require('./routes/student');
const userRoute = require('./routes/user');
const customerRoute = require('./routes/customer');
const CompletedCoursesRoute = require('./routes/completedCourse');
const cors = require('cors');
const app = express()
const port = process.env.PORT || 3010;

app.use(cors());
app.use(express.json());
app.use(studentRoute);
app.use(CompletedCoursesRoute);
app.use(userRoute);
app.use(customerRoute);



app.listen(port, () => {
    console.log('Server is up on port ' + port);
});