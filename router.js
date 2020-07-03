const express = require('express')
const router = express.Router()
const userController = require('./controllers/userController')
const postController = require('./controllers/postController')
const followController = require('./controllers/followController')

// user related route
router.get('/', userController.home)
router.post('/register', userController.register)
router.post('/login', userController.login)
router.post('/logout', userController.logout)
router.post('/doesUsernameExist', userController.doesUsernameExist)
router.post('/doesEmailExist', userController.doesEmailExist)

// profile related routes
router.get('/profile/:username', userController.ifUserExists, userController.sharedProfileData, userController.profilePostsScreen)
router.get('/profile/:username/followers', userController.ifUserExists, userController.sharedProfileData, userController.profileFollowersScreen)
router.get('/profile/:username/following', userController.ifUserExists, userController.sharedProfileData, userController.profileFollowingScreen)

// post related route
router.get('/create-post', userController.mustBeloggedIn, postController.viewCreateScreen)
router.post('/create-post', userController.mustBeloggedIn, postController.create)
router.get('/post/:id', postController.viewSingle)
router.get('/post/:id/edit', userController.mustBeloggedIn, postController.viewEditScreen)
router.post('/post/:id/edit', userController.mustBeloggedIn, postController.edit)
router.post('/post/:id/delete', userController.mustBeloggedIn, postController.delete)
router.post('/search', postController.search)

// follow related routes
router.post('/addFollow/:username',userController.mustBeloggedIn, followController.addFollow)
router.post('/removeFollow/:username',userController.mustBeloggedIn, followController.removeFollow)

module.exports = router