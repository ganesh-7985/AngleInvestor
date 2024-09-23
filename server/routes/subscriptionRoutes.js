const express = require('express');
const subscriptionController = require('../controllers/subscriptionController');
const authMiddleware = require('../middlewares/authMiddleware');
const router = express.Router();

router.post('/', authMiddleware, subscriptionController.createSubscription);

module.exports = router;
