const mongoose = require("mongoose");

const User = require("../models/User");

const STATUS_USER_ERROR = 422;

const userCreate = (req, res) => {
  const { name, email, mobileNumber, acceptTexts, acceptEmails } = req.body;
  const newUser = new User({
    name,
    email,
    mobileNumber,
    acceptTexts,
    acceptEmails,
  });
  newUser.save((err, savedUser) => {
    if (err) {
      console.log(err);
      res.status(500).json(JSON.stringify(err));
      return;
    }
    console.log(savedUser);
    res.json(savedUser);
  });
};

const usersGetAll = (req, res) => {
  User.find({})
    .then(users => {
      res.json(users);
    })
    .catch(err => res.status(422).json(err));
};

const userDelete = (req, res) => {
  console.log("user delete");
  // find a single User account
  // delete user account
  const { id } = req.params;
  User.findByIdAndRemove(id)
    .then(User => {
      if (User === null) throw new Error();
      User.save(User, (err, saveduser) => {
        if (err) {
          res.status(500).json(err);
          return;
        }
        res.json("User has been completely deleted!");
      });
    })
    .catch(err => res.status(422).json({ error: "No User!" }));
};

const userGetById = (req, res) => {
  // find a single User
  const { id } = req.params;
  console.log("id", id);
  User.findById(id)
    .then(User => {
      if (User === null) throw new Error();
      else res.json(User);
    })
    .catch(err => res.status(422).json({ error: "No User!" }));
};

const userEdit = (req, res) => {
  console.log("Dashboard");
  const {
    name,
    email,
    mobileNumber,
    acceptTexts,
    acceptEmails,
    groups,
    events,
  } = req.body;
  // find a single User
  // edit user details
  // save User
  const { id } = req.params;
  User.findById(id)
    .then(User => {
      if (User === null) throw new Error();
      if (firstName) User.name = name;
      if (email) User.email = email;
      if (mobilePhone) User.mobilePhone = mobilePhone;
      if (acceptTexts) User.acceptTexts = acceptTexts;
      if (acceptEmails) User.acceptEmails = acceptEmails;
      if (groups) User.groups = groups;
      if (events) User.events = events;
      User.save(User, (err, saveduser) => {
        if (err) {
          res.status(500).json(err);
          return;
        }
        res.json(saveduser);
      });
    })
    .catch(err => res.status(422).json({ error: "No User!" }));
};

module.exports = {
  userCreate,
  usersGetAll,
  userDelete,
  userGetById,
  userEdit,
};
