// controller/story.js
const Story = require('../models/story');
const User = require('../models/user');
var mongoose = require('mongoose');

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

const updatestory = async (req, res) => {
  try {
    const { data, username } = req.body;
    await Story.updateOne({username} , {$set : {data}});
    res.json({ message: 'Story updated successfully' });
  } catch (error) {
    console.log(error);
    res.json({ errorMessage: 'Something went wrong' });
  }
};


const getStories = async (req, res) => {
  try {
    let selectedCategory = req.query.category || "";
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


const updateBookmark = async (req , res) => {
  try {
    let {postId , userId} = req.body;
    await User.updateOne({_id : userId} , {$push : {bookmarks : new mongoose.Types.ObjectId(postId)}})

  //  let user = await User.findOne({_id : userId});
  //  let bookmarks = user.bookmarks; 
    
   res.status(200).json({message : "bookmark added..."})
 
  } catch (error) {
    res.status(500).json({error : "bookmark failed"})
  }
}

const removeBookmark = async (req , res) => {
  try {
    let {postId , userId} = req.body;
    await User.updateOne({_id : userId} , {$pull : {bookmarks : new mongoose.Types.ObjectId(postId)}})    
     res.status(200).json({message : "bookmark removed..."})
 
  } catch (error) {
    res.status(500).json({error : "bookmark failed"})
  }
}

const fetchBookmarks = async (req , res) => {
  try {
    let {userId} = req.params;

    let user = await User.findOne({_id : userId});
    let bookmarks = user?.bookmarks;
    let stories =await Story.find({});
    let userBookmarks = [];
     bookmarks.forEach((curItem)=>{
      stories.forEach((curstory)=>{
        if(curstory._id.equals(curItem)){
           userBookmarks.push(curstory);
        }
      })
    })
    res.status(200).json({bookmarks : userBookmarks});

  } catch (error) {
    console.log(error)
    res.status(500).json({error : "bookmark failed"})
  }
}

module.exports = { createStory, getStories , updateBookmark , fetchBookmarks , removeBookmark , updatestory}; // Export getUserStories


