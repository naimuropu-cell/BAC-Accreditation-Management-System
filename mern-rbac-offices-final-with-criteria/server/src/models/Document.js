import mongoose from 'mongoose';

const DocumentSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  filePath: { type: String },
  originalName: { type: String },
  ownerRole: { type: String },
  createdBy: { type: String, required: true },
  standardId: { type: String },
  criterionId: { type: String },
  uploadedBy: { type: String },
  remarks: { type: String, default: "" },

  // MANUAL DATE FIELD
  customDate: { type: String, default: "" }

}, { timestamps: true });

export default mongoose.model('Document', DocumentSchema);
