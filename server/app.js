const express = require('express');
const bodyParser = require('body-parser');

const todo = require('./routes/todo.route');

// initialize our express app
const app = express();

// Set up mongoose connection
const mongoose = require('mongoose');
const mongoUser = `todouser`;
const mongoPass = `todo123`;
let devDbUrl = `mongodb://${mongoUser}:${mongoPass}@ds223685.mlab.com:23685/mern-todo-demo`;
let mongoDB = process.env.MONGODB_URI || devDbUrl;
mongoose.connect(mongoDB,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
  }
);
mongoose.Promise = global.Promise;
let db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:1234");
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/todos', todo);

let port = 5000;

app.listen(port, () => {
  console.log('Server is up and running on port ' + port);
});