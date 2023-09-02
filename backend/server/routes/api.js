const express = require('express');
const router = express.Router();
const PostController = require('../controllers/PostController');
const UserController = require('../controllers/UserController');
const SubController = require('../controllers/SubController');

router.route('/post')
    .get(PostController.index)
    .post(PostController.create)
    .delete(PostController.delete);

router.route('/user')
    .get(UserController.index)
    .post(PostController.create)
    .delete(PostController.delete);

router.route('/sub')
    .get(SubController.index)
    .post(SubController.create)
    .delete(SubController.delete);

module.exports = router;