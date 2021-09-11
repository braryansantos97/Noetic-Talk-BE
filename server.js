require('dotenv').config();
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const mongoose = require('mongoose');
const userController = require('./controllers/users');
const blogsController = require('./controllers/blogs');
const { hash, register, login } = require('./controllers/auth');
const MONGODB_URI = process.env.MONGODB_URI;
const db = mongoose.connection;
const cors = require('cors')

app.get('/', function (req, res) {
    res.send('Welcome to Noetic Talk');
});

// Database
mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
db.on('open', () => {
    console.log('Mongo is Connected');
});


app.use(express.urlencoded({ extended: true }))


app.use(express.json());
app.use(cors());
if (process.env.NODE_ENV !== 'development'){
  app.use(express.static('public'))
};


app.use('/api/blogs', blogsController);
app.post('/register', register);
app.post('/login', login);


// ...Other code
// ...More code
app.listen(PORT,()=>{
    console.log('WE OUTSIDE', PORT);
});
