const Todo = require('../models/todo.model');

exports.todo_create = (req, res, next) => {
  let todo = new Todo(
    {
      name: req.body.name,
      description: req.body.description,
      target_completion_date: req.body.target_completion_date,
      completion_date: req.body.completion_date
    }
  );

  todo.save(function (err) {
    if (err) {
      next(err)
    }
    res.send('Todo Created successfully')
  });
};

exports.todo_details = (req, res, next) => {
  Todo.findById(req.params.id, function (err, todo) {
    if (err) {
      return next(err);
    }
    res.send(todo);
  });
};

exports.todo_update = (req, res, next) => {
  Todo.findByIdAndUpdate(req.params.id, {$set: req.body}, function (err) {
    if (err) {
      return next(err);
    }
    res.send('Todo udpated.');
  });
};

exports.todo_delete = (req, res, next) => {
  Todo.findByIdAndRemove(req.params.id, function (err) {
    if (err) {
      return next(err);
    }
    res.send('Todo deleted successfully!');
  });
};

exports.todo_list = (req, res, next) => {
    Todo.find({}).then((data) => res.send(data)).catch((err) => next(err));
};