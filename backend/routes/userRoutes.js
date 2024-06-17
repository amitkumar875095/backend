const express = require('express');
const userController = require('../controllers/userController');
const router = express.Router();

router.route('/').post(userController.registerUser);
router.post('/login',userController.authUser);

module.exports = router;