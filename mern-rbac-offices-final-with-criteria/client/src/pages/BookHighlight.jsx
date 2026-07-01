import { FaBookOpen, FaDownload } from "react-icons/fa";

export default function BookHighlight() {
  const file = {
    title: "Book Highlight Document",
    description: "This document contains the highlighted sections of the book.",
    filePath: "/src/Public/BAC_Accreditation_Compact_Key_Points.pdf",
  };

  return (
    <div className="p-6 space-y-4">
      {/* HEADER */}
      <div className="flex items-center gap-2">
        <FaBookOpen className="text-emerald-600 text-2xl" />
        <h2 className="text-2xl font-bold">{file.title}</h2>
      </div>

      <p className="text-gray-700">{file.description}</p>

      {/* PDF VIEWER */}
      <div className="w-full h-[80vh] border rounded-lg shadow">
        <iframe
          src={file.filePath}
          title="Book Highlight PDF"
          className="w-full h-full rounded-lg"
        />
      </div>

      {/* OPTIONAL DOWNLOAD BUTTON */}
      <div className="flex justify-end">
        <a
          href={file.filePath}
          download
          className="btn btn-outline btn-primary flex items-center gap-2"
        >
          <FaDownload /> Download PDF
        </a>
      </div>
    </div>
  );
}
