require('dotenv').config();
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const mongoose = require('mongoose');
const NoeticTalk = ('./models/noetic')
const userController = require('./controllers/users');
const blogsController = require('./controllers/blogs');
const { hash, register, login } = require('./controllers/auth');
const MONGODB_URI = process.env.MONGODB_URI;
const db = mongoose.connection;
const chatsController = require('./controllers/chats');




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


app.set('view engine', 'jsx');
app.engine('jsx', require('express-react-views').createEngine());
app.use((req, res, next) => {
    console.log('**********************')
    console.log('***********Middleware checking in***********')
    console.log('I run before all routes')
    console.log('**********************')
    next()
  })

  app.use(express.urlencoded({ extended: true }))



app.use(express.json());
if (process.env.NODE_ENV !== 'development'){
  app.use(express.static('public'))
};

app.use('/api/blogs', blogsController);
app.use('/api/chats', chatsController);
app.post('/register', register);
app.post('/login', login);








// ...Other code
// ...More code
app.listen(PORT,()=>{
    console.log('WE OUTSIDE', PORT);
});