const express = require('express');
const accountController = require('../controllers/accountController');
const router = express.Router();

router.post('/', accountController.createAccount);
router.post('/deposit', accountController.deposit);
router.post('/withdraw', accountController.withdraw);
router.post('/transfer', accountController.transfer);

module.exports = router;
