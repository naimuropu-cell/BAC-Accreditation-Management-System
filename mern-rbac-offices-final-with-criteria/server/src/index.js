
// import express from 'express';
// import morgan from 'morgan';
// import cors from 'cors';
// import dotenv from 'dotenv';
// import path from 'path';
// import { fileURLToPath } from 'url';
// import mongoose from 'mongoose';

// import authRoutes from './routes/auth.js';
// import docRoutes from './routes/documents.js';

// dotenv.config();

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// const app = express();
// const PORT = process.env.PORT || 5000;
// const CLIENT_ORIGIN = process.env.CLIENT_ORIGIN || 'http://localhost:5173';

// app.use(cors({ origin: CLIENT_ORIGIN, credentials: true }));
// app.use(morgan('dev'));
// app.use(express.json());

// // Serve uploaded files statically
// const uploadDir = process.env.UPLOAD_DIR || 'uploads';
// app.use('/uploads', express.static(path.join(__dirname, '..', uploadDir)));

// app.get('/', (req, res) => res.json({ ok: true, message: 'RBAC Offices API' }));

// app.use('/api/auth', authRoutes);
// app.use('/api/documents', docRoutes);

// mongoose.connect(process.env.MONGODB_URI, { })
//   .then(() => {
//     console.log('MongoDB connected');
//     app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
//   })
//   .catch(err => {
//     console.error('MongoDB connection error:', err.message);
//     process.exit(1);
//   });

import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import mongoose from 'mongoose';

import authRoutes from './routes/auth.js';
import docRoutes from './routes/documents.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;
const CLIENT_ORIGIN = process.env.CLIENT_ORIGIN || 'http://localhost:5173';

app.use(cors({ origin: CLIENT_ORIGIN, credentials: true }));
app.use(morgan('dev'));
app.use(express.json());

// ✔ Serve uploads from /SERVER/uploads
app.use('/uploads', express.static(path.join(__dirname, '..', 'uploads')));

app.get('/', (req, res) => {
  res.json({ ok: true, message: 'RBAC Offices API' });
});

app.use('/api/auth', authRoutes);
app.use('/api/documents', docRoutes);

mongoose.connect(process.env.MONGODB_URI, {})
  .then(() => {
    console.log('MongoDB connected');
    app.listen(PORT, () =>
      console.log(`Server running on http://localhost:${PORT}`)
    );
  })
  .catch(err => {
    console.error('MongoDB connection error:', err.message);
    process.exit(1);
  });
