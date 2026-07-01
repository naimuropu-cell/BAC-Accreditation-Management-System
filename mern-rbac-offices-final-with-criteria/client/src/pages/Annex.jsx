import { FaFilePdf, FaDownload } from "react-icons/fa";

const annexDocuments = [
  { id: 1, title: "Annex 1 ", file: "/src/Public/nnex1.docx" },
  { id: 2, title: "Annex 2 ", file: "/src/Public/nnex2.docx" },
  { id: 3, title: "Annex 3 ", file: "/src/Public/nnex3.docx" },
  { id: 4, title: "Annex 4", file: "/src/Public/nnex4.docx" },
  { id: 5, title: "Annex 5 ", file: "/src/Public/nnex5.docx" },
  { id: 6, title: "Annex 6 ", file: "/src/Public/nnex6.docx" },
  { id: 7, title: "Annex 7 ", file: "/src/Public/nnex7.docx" },
  { id: 8, title: "Annex 8 ", file: "/src/Public/nnex8.docx" },
  { id: 9, title: "Annex 9 ", file: "/src/Public/nnex9.docx" },
  { id: 10, title:"Annex 10 ", file: "/src/Public/nnex10.docx" },
  { id: 11, title:"Annex 11 ", file: "/src/Public/nnex11.docx" },
  { id: 11, title:"Annex 12 ", file: "/src/Public/nnex12.docx" },
];

export default function Annex() {
  return (
    <div className="max-w-5xl mx-auto p-4">
      <h1 className="text-2xl font-bold text-emerald-700 mb-6">
        Annex Documents
      </h1>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {annexDocuments.map((doc) => (
          <div
            key={doc.id}
            className="flex items-center justify-between bg-white p-4 rounded-lg shadow hover:shadow-md transition"
          >
            <div className="flex items-center gap-3">
              <FaFilePdf className="text-red-600 text-xl" />
              <span className="text-sm font-medium">{doc.title}</span>
            </div>

            <a
              href={doc.file}
              download
              className="text-emerald-700 hover:text-emerald-900"
            >
              <FaDownload />
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
