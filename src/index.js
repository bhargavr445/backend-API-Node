const express = require('express')
require('./db/mongoose');
const User = require('./models/user');
const studentRoute = require('./routes/student');
const cors = require('cors');
const app = express()
const port = process.env.PORT || 3000

app.use(cors());
app.use(express.json());
app.use(studentRoute);

app.post('/users', (req, res) => {
    const user = new User(req.body)

    user.save().then(() => {
        res.send(user)
    }).catch((e) => {
        res.status(400).send(e)
    });
});



app.listen(port, () => {
    console.log('Server is up on port ' + port);
})