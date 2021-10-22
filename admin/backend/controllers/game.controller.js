const seesion = require('express-session');
const Game = require('../models/game.model');
const User = require('../models/user.model');
const Round = require('../models/round.model');

exports.get = (req, res) => {
  const gameId = req.params.id || 0;

  Game
    .findById(gameId)
    .populate('createdBy', '-password -email')
    .exec((err, game) => {
      if (err) {
        return res.status(400).send({ err });
      }
      // Get all round based on gameId
      Round.find({ 'game': gameId })
        .exec((err, data) => {
          if (err) {
            return res.status(400).send({ err });
          }

          game.rounds = data; 
          res.json({ game: game });
        });
    });
};

exports.create = (req, res) => {
  const user = req.session.user;
  const name = req.body.name;
  
    const game = new Game({
      name: name,
      createdBy: user
    });

    game.save()
      .then((result) => {
        res.json({ game: result });
      })
      .catch(err => res.status(400).send({ err }));
};

exports.getList = (req, res) => {
  Game.find()
    .populate('createdBy',  '-password -email')
    .exec((err, data) => {
      if (err) {
        res.status(500).send({ err });
      }
      res.json({ games: data });
    });
};

exports.update = (req, res) => {

  const name = req.body.name
  const data = {
    name: name
  };
  Game.findByIdAndUpdate(req.params.id, data, (err, game) => {
    if (err) return res.status(500).send(err);
    if (game == null) {
      res.status(500).send({ err: "ko duoc sua!" });
    } else res.json(game);
  });
};

exports.remove = (req, res) => {
  Game.findByIdAndRemove(req.params.id)
    .then((game) => {
      if (!game) {
        return res.status(404).send({
          message: "Game not found with id " + req.params.id,
        });
      }
      res.send({ message: "Game deleted successfully!" });
    });
};
