// import { Link } from 'react-router-dom'

// export default function Office() {
//   const cards = [
//     { title: 'Admin', role: 'admin', desc: 'Full access to all offices' },
//     { title: 'Proctorial Office', role: 'proctorial', desc: 'Manage Proctorial documents' },
//     { title: 'IT Office', role: 'it', desc: 'Manage IT documents' },
//   ]
//   return (
//     <div className="grid md:grid-cols-3 gap-6">
//       {cards.map(c => (
//         <div key={c.role} className="card bg-base-100 shadow-xl">
//           <div className="card-body">
//             <h2 className="card-title">{c.title}</h2>
//             <p>{c.desc}</p>
//             <div className="card-actions justify-end">
//               <Link to={`/dashboard/${c.role}`} className="btn btn-primary">Open</Link>
//             </div>
//           </div>
//         </div>
//       ))}
//     </div>
//   )
// }

// import { Link } from 'react-router-dom'
// import { useAuth } from '../context/AuthContext.jsx'

// export default function Office() {
//   const { user } = useAuth()

//   const allCards = [
//     { title: 'Admin', role: 'admin', desc: 'Full access to all offices' },
//     { title: 'Proctorial Office', role: 'proctorial', desc: 'Manage Proctorial documents' },
//     { title: 'IT Office', role: 'it', desc: 'Manage IT documents' },
//   ]

//   // Filter cards only if user is logged in
//   const visibleCards = user
//     ? allCards.filter(c => {
//         if (user.role === 'ADMIN') return true       // Admin sees all
//         if (user.role === 'IT' && c.role === 'it') return true
//         if (user.role === 'PROCTORIAL' && c.role === 'proctorial') return true
//         return false
//       })
//     : allCards // Guest sees all

//   return (
//     <div className="grid md:grid-cols-3 gap-6">
//       {visibleCards.map(c => (
//         <div key={c.role} className="card bg-base-100 shadow-xl">
//           <div className="card-body">
//             <h2 className="card-title">{c.title}</h2>
//             <p>{c.desc}</p>
//             <div className="card-actions justify-end">
//               <Link to={`/dashboard/${c.role}`} className="btn btn-primary">Open</Link>
//             </div>
//           </div>
//         </div>
//       ))}
//     </div>
//   )
// }

import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import {
  MdBusiness,
  MdAttachMoney,
  MdComputer,
  MdOutlineSchool,
  MdLocalLibrary,
  MdGroup,
  MdFolder,
  MdScience,
  MdArticle,
} from "react-icons/md";

export default function Office() {
  const { user } = useAuth();

  const allCards = [
    { title: "Proctorial Office", role: "proctorial", desc: "Manage Proctorial documents", icon: <MdBusiness /> },
    { title: "Finance Office", role: "finance", desc: "Manage Finance documents", icon: <MdAttachMoney /> },
    { title: "IT Office", role: "it", desc: "Manage IT documents", icon: <MdComputer /> },
    { title: "Controller of Exam", role: "exam", desc: "Manage Exam documents", icon: <MdOutlineSchool /> },
    { title: "Library Office", role: "library", desc: "Manage Library documents", icon: <MdLocalLibrary /> },
    { title: "HR Office", role: "hr", desc: "Manage HR documents", icon: <MdGroup /> },
    { title: "POE", role: "poe", desc: "POE Office", icon: <MdFolder /> },
    { title: "CETL", role: "cetl", desc: "CETL Office", icon: <MdFolder /> },
    { title: "CLS", role: "cls", desc: "CLS Office", icon: <MdFolder /> },
    { title: "CRIT", role: "crit", desc: "CRIT Office", icon: <MdScience /> },
    { title: "IQAC", role: "iqac", desc: "IQAC Office", icon: <MdArticle /> },
    { title: "CCD", role: "ccd", desc: "CCD Office", icon: <MdFolder /> },
  ];

  // RBAC filtering
  const visibleCards = user
    ? allCards.filter(c => {
        if (user.role === "ADMIN") return true;
        if (user.role === "IT" && c.role === "it") return true;
        if (user.role === "PROCTORIAL" && c.role === "proctorial") return true;
        return false;
      })
    : allCards; // Guest sees all

  return (
    <div className="p-6">
      <div className="bg-green-50 p-4 rounded-lg shadow">
        <h2 className="text-lg font-bold mb-4">Offices</h2>

        <div className="space-y-2">
          {visibleCards.map(c => (
            <Link
              to={`/dashboard/${c.role}`}
              key={c.role}
              className="flex items-center gap-3 p-3 rounded-lg border hover:bg-green-100 cursor-pointer transition"
            >
              <span className="text-xl text-green-700 shrink-0">{c.icon}</span>
              <span className="truncate">{c.title}</span>
            </Link>
          ))}
        </div>
      </div>

      <div className="mt-8 bg-green-50 p-6 rounded-lg shadow">
        <h2 className="text-xl font-bold mb-2">Welcome to Green University QA System</h2>
        <p className="text-sm text-gray-700 leading-relaxed">
          The Bangladesh Accreditation Council (BAC) plays a vital role in ensuring the quality and standards of higher
          education institutions in Bangladesh. To streamline and digitalize the accreditation process, a BAC
          Accreditation Management System offers an efficient platform for managing self-assessment reports,
          documentation, peer reviews, and accreditation decisions. This system enhances transparency, simplifies
          communication between institutions and BAC officials, and ensures a more structured and accountable quality
          assurance framework.
        </p>
      </div>
    </div>
  );
}
