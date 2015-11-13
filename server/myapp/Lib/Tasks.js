var mongoose = require('mongoose');

var taskSchema = new mongoose.Schema({

    username    : String,
    task        : String,
    categoory   : String
});


var Tasks = mongoose.model('mytasks'/*Collection name*/, taskSchema);

module.exports = Tasks;