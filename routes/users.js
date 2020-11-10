const router = require('express').Router();

const auth = require('../middlewares/auth');
const { getUserInfo } = require('../controllers/users');

router.get('/users/me', auth, getUserInfo);

module.exports = router;
