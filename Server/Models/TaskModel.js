const mongoose = require('mongoose')

const Schema = new mongoose.Schema({

    taskName : {
        type : String,
        required : true
    },

    isDone : {
        type : Boolean,
        required : true
    }
}, {timestamps : true})

const taskModel = mongoose.model("task", Schema)

module.exports = taskModel