const express = require('express');
const router = express.Router();
const multer = require('multer'); 
const path = require('path');
const { getAll, getOne, create, update, remove } = require('../controllers/superheroController');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
const upload = multer({ storage });

router.get('/', getAll);
router.get('/:id', getOne);
router.post('/', upload.array('images'), create);
router.put('/:id', upload.array('images'), update);
router.delete('/:id', remove);

module.exports = router;
