const express = require('express');
const router = express.Router();

const siteController = require('../app/controllers/SiteController');

router.use('/search', siteController.search);
router.use('/login', siteController.login);
router.use('/signup', siteController.signup);
router.use('/contact', siteController.contact);
router.use('/' , siteController.index);


module.exports = router;

