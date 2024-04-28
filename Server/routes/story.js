const express = require('express');
const router = express.Router();
const storyController = require('../controller/story');

router.post('/create', storyController.createStory);
router.get('/', storyController.getStories);
router.patch('/updateBookmark' , storyController.updateBookmark);
router.patch('/removeBookmark' , storyController.removeBookmark);
router.get('/getBookmarks/:userId' , storyController.fetchBookmarks);

module.exports = router;
