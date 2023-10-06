const express = require('express');
const router = express.Router();
const PostController = require('../controllers/PostController');
const CommentController = require('../controllers/CommentController');
const UserController = require('../controllers/UserController');
const CommunityController = require('../controllers/CommunityController');

router.route('/post/')
    .get(PostController.index)
    .post(PostController.create)

router.route('/post/:id')
    .delete(PostController.delete);

router.route('/post/:id/comments')
    .get(CommentController.index)
    .post(CommentController.create)

router.route('/comment/:id')
    .delete(CommentController.delete)

router.route('/post/community/:id')
    .get(PostController.indexByCommunityId)

router.route('/post/user/:id')
    .get(PostController.indexByUserId)

router.route('/user/')
    .get(UserController.index)
    .post(UserController.create)
    .delete(UserController.delete);

router.route('/user/:id')
    .delete(UserController.delete);

router.route('/community/')
    .get(CommunityController.index)
    .post(CommunityController.create)

router.route('/community/:id')
    .delete(CommunityController.delete);

module.exports = router;