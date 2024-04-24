// controller/story.js
const Story = require('../models/story');

const createStory = async (req, res) => {
  try {
    const { data, username } = req.body;
    const story = new Story({ username, chips: data });
    await story.save();
    res.json({ message: 'Story created successfully' });
  } catch (error) {
    console.log(error);
    res.json({ errorMessage: 'Something went wrong' });
  }
};

const getStories = async (req, res) => {
  try {
    const stories = await Story.find().sort({ _id: -1 }); // get all stories sorted by _id in descending order
    res.json(stories);
  } catch (error) {
    console.log(error);
    res.json({ errorMessage: 'Something went wrong' });
  }
};


// Add this function
const getUserStories = async (req, res) => {
  try {
    const stories = await Story.find({ userId: req.params.userId });
    res.json(stories);
  } catch (error) {
    console.log(error);
    res.json({ errorMessage: 'Something went wrong' });
  }
};

module.exports = { createStory, getStories, getUserStories }; // Export getUserStories


