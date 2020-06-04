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
  const allowedOrigins = ['http://localhost:1234', 'https://mrjasonweaver.github.io'];
  const origin = req.headers.origin;
  if (allowedOrigins.indexOf(origin) > -1) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  }
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/todos', todo);

// Create link to React build directory
var distDir = __dirname + "/docs/";
app.use(express.static(distDir));

// Initialize the app.
const server = app.listen(process.env.PORT || 8080, function () {
  const port = server.address().port;
  console.log("App now running on port", port);
});