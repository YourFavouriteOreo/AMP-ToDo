const mongoose = require('mongoose');

const folderSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: String,
    todos: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Todo'
    }],
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
});

module.exports = mongoose.model('Folder', folderSchema);