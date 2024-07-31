const express = require('express')
require('./db/mongoose');
const User = require('./models/user');
const studentRoute = require('./routes/student');
const userRoute = require('./routes/user');
const customerRoute = require('./routes/customer');
const GamesRoute = require('./routes/games');
const MoviesRoute = require('./routes/movies');
const universitiesRoute = require('./routes/universities');
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
app.use(GamesRoute)
app.use(MoviesRoute)
app.use(universitiesRoute)



app.listen(port, () => {
    console.log('Server is up on port ' + port);
});