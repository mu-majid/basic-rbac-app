const express = require('express');
const router = express.Router();
const userController = require('../controllers/userCtrl');
const middlewares = require('../controllers/middlewares');

 
router.post('/signup', userController.signup);
 
router.post('/login', userController.login);
 
router.get('/user/:userId', middlewares.allowIfLoggedin, userController.getUser);
 
router.get('/users', middlewares.allowIfLoggedin, middlewares.accessGranted('readAny', 'profile'), userController.getUsers);
 
router.put('/user/:userId', middlewares.allowIfLoggedin, middlewares.accessGranted('updateAny', 'profile'), userController.updateUser);
 
router.delete('/user/:userId', middlewares.allowIfLoggedin, middlewares.accessGranted('deleteAny', 'profile'), userController.deleteUser);
 
module.exports = router;