var mongoose = require('mongoose');

var taskSchema = new mongoose.Schema({

    username    : String,
    task        : String,
    category    : String,
    updatedTime : String,
    updatedDay  : String,
    updatedDate  : String,
    updatedMonth : String,
    updatedYear : String

});


var Tasks = mongoose.model('mytasks'/*Collection name*/, taskSchema);

module.exports = Tasks;