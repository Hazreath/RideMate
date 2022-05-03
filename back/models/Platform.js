const mongoose = require('mongoose')

const schema = mongoose.Schema({
    // auto _id
    name: {type: String, required:true, unique:true},
})

module.exports = mongoose.model('Platform',schema)