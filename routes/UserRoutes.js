const express = require('express');
const router = express.Router()
var {
  authUser,
  registerUser,
  getUserProfile,
  updateUserProfile,
  getUsers,
  
} = require('../controllers/UserController');
var { protect, admin } = require('../middleware/AuthMiddleware');

router.route('/').post(registerUser).get(protect, admin, getUsers)
router.post('/login', authUser)
router
  .route('/profile')
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile)

module.exports= router;
