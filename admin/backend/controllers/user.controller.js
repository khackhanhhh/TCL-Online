const session = require('express-session');
const User = require('../models/user.model');

exports.create = (req, res) => {
  const user = new User({
    username: req.body.username,
    password: req.body.password,
    email: req.body.email,
  });

  user.save((err, data) => {
    if (err) {
      return res.status(500).send({ err });
    }
    res.json({ user: data });
  });
};

exports.login = (req, res) => {
  User.findOne({ username: req.body.username }).exec((err, user) => {
    if (err) {
      return res.status(500).send({ err });
    } else if (!user) {
      return res
        .status(500)
        .send({ err: 'Username and Password are incorrect' });
    } else if (req.body.password === user.password) {
      req.session.user = user;
      res.json({
        user: user,
        login: 'success',
      });
    } else {
      return res
        .status(500)
        .send({ err: 'Username and Password are incorrect' });
    }
  });
};

exports.logout = (req, res) => {
  if (req.session) {
    req.session.destroy((err) => {
      if (err) {
        res.status(500).send({ err });
      } else {
        res.json({ logout: 'success' });
      }
    });
  }
};
