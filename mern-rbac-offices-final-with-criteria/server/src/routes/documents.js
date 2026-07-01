import express from 'express';
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';
import { authRequired } from '../middleware/auth.js';

import {
  listDocuments,
  createDocument,
  updateDocument,
  deleteDocument,
  updateRemarks,
  updateCustomDate
} from '../controllers/documents.js';

const router = express.Router();


// const __filename = fileURLToPath(import.meta.url);  
// const __dirname = path.dirname(__filename);

// const uploadDir = process.env.UPLOAD_DIR || 'uploads';

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, uploadDir);
//   },
//   filename: function (req, file, cb) {
//     const unique = Date.now() + '-' + Math.round(Math.random() * 1e9);
//     const ext = path.extname(file.originalname);
//     cb(null, unique + ext);
//   }
// });

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Always store files in the REAL uploads folder (outside src)
const uploadDir = path.resolve(__dirname, '../../uploads');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    const unique = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname);
    cb(null, unique + ext);
  }
});




const upload = multer({ storage });

router.get('/', authRequired, listDocuments);
router.post('/', authRequired, upload.single('file'), createDocument);
router.put('/:id', authRequired, updateDocument);
router.delete('/:id', authRequired, deleteDocument);

router.put('/:id/remarks', authRequired, updateRemarks);

// NEW ROUTE FOR MANUAL DATE
router.put('/:id/date', authRequired, updateCustomDate);

export default router;
