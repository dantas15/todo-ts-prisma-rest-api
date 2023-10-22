import multer from 'multer';

// Define storage for uploaded files
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

// Initialize Multer middleware
const upload = multer({
  storage: storage,
});

export default upload;
