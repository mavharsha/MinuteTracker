var mongoose = require('mongoose');

var taskSchema = new mongoose.Schema({

    username     : String,
    task         : String,
    category     : String,
    updatedTime  : String,
    updatedDay   : Number,
    updatedDate  : Number,
    updatedMonth : Number,
    updatedYear  : Number

});

var Tasks = mongoose.model('mytasks'/*Collection name*/, taskSchema);
module.exports = Tasks;