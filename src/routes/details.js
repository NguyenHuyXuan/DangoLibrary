const express = require('express');
const router = express.Router();
const multer = require('multer');
const RateLimit = require('express-rate-limit');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads')
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now())
    }
  });

const upload = multer({ storage: storage });

const detailsController = require('../app/controllers/DetailsController');

const detailsLimiter = RateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs for details routes
});

router.use('/create', detailsController.create);
router.post('/store', upload.array('image', 12));
router.use('/:slug/chapter', detailsLimiter, detailsController.show);
router.use('/:slug', detailsLimiter, detailsController.show);
router.use('/', detailsController.index);

module.exports = router;