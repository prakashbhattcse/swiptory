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
    let selectedCategory = req.query.category || "";
  
    console.log(selectedCategory);    
    const stories = await Story.find({}); // get all stories sorted by _id in descending order

    if(selectedCategory === "all"){
      const filtered = stories;
      return   res.status(200).json({filtered});
    }
    const filtered = stories.filter((story)=>{
      return  story.chips.some((category)=> category.category === selectedCategory);
    })


    res.status(200).json({filtered});
  } catch (error) {
    console.log(error);
    res.status(404).json({ errorMessage: 'Something went wrong' });
  }
};



// Add this function
// const getUserStories = async (req, res) => {
//   try {
//     const stories = await Story.find({ userId: req.params.userId });
//     res.json(stories);
//   } catch (error) {
//     console.log(error);
//     res.json({ errorMessage: 'Something went wrong' });
//   }
// };

module.exports = { createStory, getStories }; // Export getUserStories


