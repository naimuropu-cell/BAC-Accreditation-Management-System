import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import Document from '../models/Document.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// List documents filtered
export async function listDocuments(req, res) {
  try {
    const { standardId, criterionId } = req.query;
    const role = req.user?.role;
    const filter = {};

    if (standardId) filter.standardId = standardId;
    if (criterionId) filter.criterionId = criterionId;

    if (role !== 'ADMIN') {
      filter.uploadedBy = role;
    }

    const docs = await Document.find(filter).sort({ createdAt: -1 }).lean();
    res.json({ ok: true, data: docs });
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
}

// Create / upload
export async function createDocument(req, res) {
  try {
    const { title, description, standardId, criterionId } = req.body;
    const file = req.file;

    if (!title || !file) {
      return res.status(400).json({ error: 'Title and file required' });
    }

    const doc = new Document({
      title,
      description,
      filePath: path.join(process.env.UPLOAD_DIR || 'uploads', file.filename),
      originalName: file.originalname,
      ownerRole: req.user.role,
      createdBy: req.user.username || req.user.role,
      standardId,
      criterionId,
      uploadedBy: req.user.role,
      remarks: "",
      customDate: "" // initialize empty
    });

    await doc.save();
    res.json({ ok: true, data: doc });
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
}

// Update metadata
export async function updateDocument(req, res) {
  try {
    const { id } = req.params;
    const { title, description } = req.body;

    const doc = await Document.findById(id);
    if (!doc) return res.status(404).json({ error: 'Document not found' });

    const role = req.user.role;
    if (role !== 'ADMIN' && doc.uploadedBy !== role) {
      return res.status(403).json({ error: 'Forbidden: cannot edit this document' });
    }

    if (title) doc.title = title;
    if (description) doc.description = description;

    await doc.save();
    res.json({ ok: true, data: doc });
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
}

// Update/add remarks
export async function updateRemarks(req, res) {
  try {
    const { id } = req.params;
    const { remarks } = req.body;

    const doc = await Document.findById(id);
    if (!doc) return res.status(404).json({ error: "Document not found" });

    doc.remarks = remarks;
    await doc.save();

    res.json({ ok: true, data: doc });
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
}

// Update manual date
export async function updateCustomDate(req, res) {
  try {
    const { id } = req.params;
    const { customDate } = req.body;

    const doc = await Document.findById(id);
    if (!doc) return res.status(404).json({ error: "Document not found" });

    doc.customDate = customDate;
    await doc.save();

    res.json({ ok: true, data: doc });
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
}

// Delete
export async function deleteDocument(req, res) {
  try {
    const { id } = req.params;

    const doc = await Document.findById(id);
    if (!doc) return res.status(404).json({ error: 'Document not found' });

    const role = req.user.role;
    if (role !== 'ADMIN' && doc.uploadedBy !== role) {
      return res.status(403).json({ error: 'Forbidden: cannot delete this document' });
    }

    if (doc.filePath) {
      const p = path.join(__dirname, '..', '..', doc.filePath);
      fs.promises.unlink(p).catch(() => {});
    }

    await doc.deleteOne();
    res.json({ ok: true });
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
}
