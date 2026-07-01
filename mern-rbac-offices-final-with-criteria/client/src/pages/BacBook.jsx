import React from 'react';
import { MdFileDownload } from "react-icons/md";

const BacBook = () => {
    const pdfFile = '/src/Public/Accreditation-Manual-2nd-Edition-2024-2.pdf';

    return (
        <div className="p-5">
            <h2 className="text-xl font-semibold mb-4">
                Accreditation Manual - 2nd Edition (2024)
            </h2>

            {/* Preview PDF */}
            <iframe
                src={pdfFile}
                title="PDF Preview"
                width="100%"
                height="600px"
                className="border border-gray-300 rounded"
            ></iframe>

            {/* Download button */}
            <div className="mt-5">
                <a
                    href={pdfFile}
                    download
                    className="inline-flex items-center gap-2 px-5 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                >
                    <MdFileDownload />
                    Download PDF
                </a>
            </div>
        </div>
    );
};

export default BacBook;