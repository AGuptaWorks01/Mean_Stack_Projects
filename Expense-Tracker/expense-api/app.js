const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/meancrud')
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.log(err))

const UserSchema = new mongoose.Schema({
    name: String,
    email: String,
    age: Number
})
const User = mongoose.model('User', UserSchema)


app.post('/users', (req, res) => {
    const newUser = new User(req.body)
    newUser.save()
        .then(user => res.json(user))
        .catch(err => res.status(500).send(err))
})

app.get('/users', (req, res) => {
    User.find()
        .then(users => res.json(users))
        .catch(err => res.status(500).send(err))
})

app.patch('/users/:id', (req, res) => {
    User.findByIdAndUpdate(req.params.id, req.body, { new: true })
        .then(user => res.json(user))
        .catch(err => res.status(500).send(err))
})


app.delete('/users/:id', (req, res) => {
    User.findByIdAndDelete(req.params.id, req.body)
        .then(user => res.json(user))
        .catch(err => res.status(500).send(err))
})


app.listen(port, () => console.log(`https://localhost:${port}`))