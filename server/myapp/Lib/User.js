var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/myDb');


var userSchema = new mongoose.Schema({

    username : {type: String, unique: true},
    password: {type: String},
    firstname: String,
    lastname:  String
});


var User = mongoose.model('myuser'/*Collection name*/, userSchema);

module.exports = User;