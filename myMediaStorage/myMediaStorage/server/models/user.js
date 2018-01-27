const mongoose = require('mongoose');
const bcrypt =require('bcryptjs');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: {
    type: String
  },
  username: {
    type: String,
    index: true
  },
  email: {
    type: String
  },
  password: {
    type: String
  }
});

const User = module.exports = mongoose.model('User', UserSchema);
/*
module.exports.createUser = function(newUser, callback) {
  bcrypt.genSalt(10, function(err, salt) {
    bcrypt.hash(newUser.password, salt, function(err, hash) {
        newUser.password = hash;
        newUser.save(callback);
    });
  });
}
*/

module.exports.getUserByUsername = function(username, callback) {
  const query = {username: username};
  User.findOne(query, callback);
}

module.exports.getUserById = function(id, callback) {
  User.findById(id, callback);
}

module.exports.comparePassword = function(candidatePassword, hash, callback) {
  // Load hash from your password DB.
  bcrypt.compare(candidatePassword, hash, function(err, isMatch) {
    if(err) throw err;
    callback(null, isMatch);
  });
}




