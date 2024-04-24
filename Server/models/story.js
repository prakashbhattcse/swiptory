// const mongoose = require('mongoose');

// const storySchema = new mongoose.Schema({
//   heading: String,
//   description: String,
//   imageUrl: String,
//   username: String,  
// });

// module.exports = mongoose.model('Story', storySchema);


const mongoose = require('mongoose');

const chipSchema = new mongoose.Schema({
  imageUrl: String,
  heading: String,
  description: String,
  category:String,
});

const storySchema = new mongoose.Schema({
  username: String,
  // userId: String,
  chips: [chipSchema],
});

module.exports = mongoose.model('Story', storySchema);
