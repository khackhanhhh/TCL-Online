const multer = require('multer');
const path = require('path');

const Round = require('../models/round.model');
const Game = require('../models/game.model');
const User = require('../models/user.model');

exports.get = (req, res) => {
  const roundId = req.params.id || 0;
  Round
    .findById(roundId)
    .populate('createdBy', '-password -email')
    .populate('game')
    .exec((err, data) => {
      if (err) {
        return res.status(400).send({ err });
      }

      res.json({ round: data });
    });
};

exports.create = (req, res) => {

  const roundName = req.body.name;
  const content = req.body.content;
  const description = req.body.description;
  const order = Number(req.body.order);
  const answer = req.body.answer;
  const gameId = req.body.gameId;
  const user = req.session.user;


    const round = new Round({
      name: roundName,
      content: content,
      description:description,
      order: order,
      answer: answer,
      game: gameId,
      createdBy: user,
    });
    Game
      .findById(gameId)
      .exec((err, data) => {
        if (err) {
          res.status(400).send({ err });
        }
        round.save()
          .then((data) => {
            res.json({ roundnew: data });
          })
          .catch(err => res.status(400).send({ err }));
      }
      )
      console.log(gameId)
}

exports.getList = (req, res) => {
  Round.find()
    .populate('createdBy', '-password -email')
    .populate('game')
    .exec((err, data) => {
      if (err) {
        res.status(400).send({ err });
      }
      res.json({ rounds: data });
    });
};

exports.getByGame = (req, res) => {
  const gameId = req.params.id || 0;

      // Get all products based on catId
      Round.find({ 'game': gameId })
        .exec((err, data) => {
          if (err) {
            return res.status(400).send({ err });
          }

          res.json({ round: data });
    });
};

exports.update = (req, res) => {
    const roundName = req.body.name;
    const content = req.body.content;
    const description = req.body.description;
    const order = Number(req.body.order);
    const answer = req.body.answer;
    const gameId = req.body.gameId;
    const user = req.session.user;
  // const proId = req.params.id;


  const data = {
    name: roundName,
    content: content,
    description:description,
    order: order,
    answer: answer,
    game: gameId,
  };
  if (Game.findById(gameId) && Round.findById(req.params.id)) {
    Round.findByIdAndUpdate(req.params.id, data, (err, round) => {
      if (err) return res.status(500).send(err);
      if (round == null) {
        res.status(500).send({ err: "ko duoc sua!" });
      } else res.json(round);
    });
  } else {
    res.status(500).send({ err: "ko duoc sua!" });
  }
};

exports.remove = (req, res) => {
  Round.findByIdAndRemove(req.params.id)
    .then((round) => {
      if (!round) {
        return res.status(404).send({
          message: "Round not found with id " + req.params.id,
        });
      }
      res.send({ message: "Round deleted successfully!" });
    });
};

