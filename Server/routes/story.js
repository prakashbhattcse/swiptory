const express = require('express');
const router = express.Router();
const storyController = require('../controller/story');

router.post('/create', storyController.createStory);
router.get('/user/:userId', storyController.getUserStories);
router.get('/', storyController.getStories);

module.exports = router;
