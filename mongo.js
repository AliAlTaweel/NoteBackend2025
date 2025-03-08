const mongoose = require("mongoose");
const dotenv = require("dotenv");
require('dotenv').config();



const user = process.env.DB_USER;
const password = process.env.DB_PASSWORD;
const dbName = process.env.DB_NAME;

// Construct the MongoDB URI dynamically
const url = `mongodb+srv://${user}:${password}@cluster0.rat1u.mongodb.net/${dbName}?retryWrites=true&w=majority`;


mongoose.set("strictQuery", false);
mongoose
  .connect(url)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

const noteSchema = new mongoose.Schema({
  content: String,
  important: Boolean,
});

const Note = mongoose.model("Note", noteSchema);

const note = new Note({
  content: "HTML is easy 06",
  important: true,
});

note.save()
  .then(result => {
    console.log('Note saved:', result);
    mongoose.connection.close();
  })
  .catch(err => {
    console.error('Error saving note:', err);
    mongoose.connection.close();
  });

// Note.find({}).then((result) => {
//   result.forEach((note) => {
//     console.log(note);
//   });
//   mongoose.connection.close();
// });
