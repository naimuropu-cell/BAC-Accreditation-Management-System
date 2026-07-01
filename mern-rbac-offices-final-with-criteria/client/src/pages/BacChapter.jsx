import React from "react";
import { MdOutlineFileDownload } from "react-icons/md";
import { Link } from "react-router-dom"; 

const chapters = [
    {
        title: "Chapter 1",
        docs: [
            { name: "1.1", path: "/src/Public/1.1-Quality-Assurance.docx" },
            { name: "1.2", path: "/src/Public/1.2-Quality-Assurance-in-Higher-Education-of-Banglade.docx" },
            { name: "1.3", path: "/src/Public/1.3-Bangladesh-National-Qualifications-Framework.docx" },
            { name: "1.4", path: "/src/Public/1.4-Accreditation.docx" },
            { name: "1.5", path: "/src/Public/1.5-Bangladesh-Accreditation-Council.docx" },
            { name: "1.6", path: "/src/Public/1.6-Significance-of-Accreditation.docx" },
            { name: "1.7", path: "/src/Public/1.7-General-Policy-on-Accreditation.docx" },
        ],
    },
    {
        title: "Chapter 2",
        docs: [
            { name: "2.1", path: "/src/Public/2.1-Eligibility-to-Apply-for-BAC-Accreditation.docx" },
            { name: "2.2", path: "/src/Public/2.2-Intent-to-Apply.docx" },
            { name: "2.3", path: "/src/Public/2.3-Preparation-to-Apply-for-BAC-Accreditation.docx" },
            { name: "2.4", path: "/src/Public/2.4-Self-assessment.docx" },
            { name: "2.5", path: "/src/Public/2.5-Mentoring-Services.docx" },
            { name: "2.6", path: "/src/Public/2.6-Application-for-Accreditation.docx" },
            { name: "2.7", path: "/src/Public/2.7-Acceptance-or-Refusal-of-Application.docx" },
            { name: "2.8", path: "/src/Public/2.8-Accreditation-Fee.docx" },
            { name: "2.9", path: "/src/Public/2.9-Formation-of-Accreditation-Committee.docx" },
            { name: "2.10", path: "/src/Public/2.10-Formation-of-Expert-Committee.docx" },
            { name: "2.11", path: "/src/Public/2.11-External-Quality-Assessment.docx" },
            { name: "2.12", path: "/src/Public/2.12-Conditions-for-BAC-Certificate-of-Accreditation.docx" },
            { name: "2.13", path: "/src/Public/2.13-Decision-Issuance-of-Certificate.docx" },
            { name: "2.14", path: "/src/Public/2.14-Accreditation-by-Recognition.docx" },
            { name: "2.15", path: "/src/Public/2.15-Validity-of-BAC-Certificate.docx" },
            { name: "2.16", path: "/src/Public/2.16-Biennial-Audit-and-Impromptu-audit.docx" },
            { name: "2.17", path: "/src/Public/2.17-Suspension-and-Cancellation-of-Certificate.docx" },
            { name: "2.18", path: "/src/Public/2.18-Application-for-Reconsideration.docx" },
            { name: "2.19", path: "/src/Public/2.19-Accreditation-Process-Flow.docx" },
        ],
    },
    {
        title: "Chapter 3",
        docs: [
           
            { name: "3.1", path: "/standards" },
        ],
    },
    {
        title: "Chapter 4",
        docs: [
            { name: "4.1", path: "/src/Public/4.1-Self-Assessment-Concept.docx" },
            { name: "4.2", path: "/src/Public/4.2-Significance-of-Self.docx" },
            { name: "4.3", path: "/src/Public/4.3-Principles-of-Self-Assessment.docx" },
            { name: "4.4", path: "/src/Public/4.4-Self-Assessment-Process-for-Academic-Program.docx" },
            { name: "4.5", path: "/src/Public/4.5-Self-Assessment-Report.docx" },
            { name: "4.6", path: "/src/Public/4.6-Responsibilities-in-the-Program-Self-Assessment-Process.docx" },
            { name: "4.7", path: "/src/Public/4.7-Self-Assessment-Process-Flow.docx" },
        ],
    },
    {
        title: "Chapter 5",
        docs: [
            { name: "5.1", path: "/src/Public/5.1-External-Quality-Assessment-Concept.docx" },
            { name: "5.2", path: "/src/Public/5.2-External-Quality-Assessment-Process.docx" },
            { name: "5.3", path: "/src/Public/5.3-Responsibilities-of-the-HEI-and-POE.docx" },
        ],
    },
];

const BacChapter = () => {
    return (
        <div className="p-5">
            <h2 className="text-3xl font-semibold">BAC Chapters and Documents</h2>

            {chapters.map((chapter, index) => (
                <div key={index} className="my-5 font-semibold">
                    <h3 className="text-lg">{chapter.title}</h3>
                    <hr className="mb-2 border-gray-400" />

                    <ul className="space-y-2">
                        {chapter.docs.map((doc, docIndex) => (
                            <li key={docIndex}>
                                {chapter.title === "Chapter 3" ? (
                                    
                                    <Link
                                        to="/standards"
                                        className="text-emerald-700 hover:underline flex items-center gap-2"
                                    >
                                        Go to Standards
                                    </Link>
                                ) : (
                                    
                                    <a
                                        href={doc.path}
                                        download
                                        className="text-emerald-700 hover:underline flex items-center gap-2"
                                    >
                                        <MdOutlineFileDownload />
                                        Download {doc.name}
                                    </a>
                                )}
                            </li>
                        ))}
                    </ul>
                </div>
            ))}
        </div>
    );
};

export default BacChapter;
