var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({

    username : {type: String, unique: true},
    password: {type: String},
    firstname: String,
    lastname:  String
});


var User = mongoose.model('myuser'/*Collection name*/, userSchema);

module.exports = User;