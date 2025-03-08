const mongoose = require('mongoose')
const dotenv = require("dotenv");
require('dotenv').config();

mongoose.set('strictQuery', false)

const user = process.env.DB_USER;
const password = process.env.DB_PASSWORD;
const dbName = process.env.DB_NAME;

// Construct the MongoDB URI dynamically
const url = `mongodb+srv://${user}:${password}@cluster0.rat1u.mongodb.net/${dbName}?retryWrites=true&w=majority`;
console.log('connecting to', url)

mongoose.connect(url)
  .then(result => {
    console.log('connected to MongoDB')
  })
  .catch(error => {
    console.log('error connecting to MongoDB:', error.message)
  })

const noteSchema = new mongoose.Schema({
  content: String,
  important: Boolean,
})

noteSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Note', noteSchema)