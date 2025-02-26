const express = require('express');
require('./db/mongoose');
const User = require('./models/user');
const studentRoute = require('./routes/student');
const userRoute = require('./routes/user');
const customerRoute = require('./routes/customer');
const GamesRoute = require('./routes/games');
const MoviesRoute = require('./routes/movies');
const universitiesRoute = require('./routes/universities');
const CompletedCoursesRoute = require('./routes/completedCourse');
const LearnersRoute = require('./routes/learners');
const UdemyRoute = require('./routes/udemy');
const CricketRoute = require('./routes/cricket');
const cors = require('cors');
const swaggerSetup = require('./swagger');
const app = express();
const port = process.env.PORT || 3010;

app.use(cors());
app.use(express.json());
// Swagger UI setup
swaggerSetup(app);

const delayResponse = (_, __, next) => {
    setTimeout(() => next(), getRandomNumberBetween500And1000());
};
app.use(delayResponse);
app.use(studentRoute);
app.use(CompletedCoursesRoute);
app.use(userRoute);
app.use(customerRoute);
app.use(GamesRoute);
app.use(MoviesRoute);
app.use(universitiesRoute);
app.use(LearnersRoute);
app.use(UdemyRoute);
app.use(CricketRoute);

const getRandomNumberBetween500And1000 = () => {
    const min = 800;
    const max = 1000;
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

app.listen(port, () => {
    console.log('Server is up on port ' + port);
});