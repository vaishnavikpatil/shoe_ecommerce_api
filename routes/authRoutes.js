const express = require('express')
const router = express.Router()
const { register, login, forgotPassword } = require('../controllers/authController')

router.get('/', (req, res) => {
    res.send('MY APP');
  });
router.post('/register', register)
router.post('/login', login)
router.post('/forgot-password', forgotPassword)

module.exports = router
