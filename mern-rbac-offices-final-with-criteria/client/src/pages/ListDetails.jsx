// import { Link, useParams } from "react-router-dom";
// import standards from "../assets/full_list_fixed_clean.json";

// export default function ListDetails() {
//   const { id } = useParams();
//   const standard = standards.find((s) => s.id === id);

//   if (!standard) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <p className="text-gray-600">Standard not found.</p>
//       </div>
//     );
//   }

//   // normalize evidence rows so keys are consistent
//   const normalizeEvidence = (evidence = []) => {
//     return evidence.map((ev) => ({
//       documentation:
//         ev["Documentation and Evidence"] || ev["Documentation"] || ev["doc"] || "",
//       source1: ev["Source 1"] || ev["Source1"] || ev["Source"] || "",
//       source2: ev["Source 2"] || ev["Source2"] || "",
//       status: ev["Status"] || "",
//       date: ev["Date"] || "",
//       remarks: ev["Remarks"] || "",
//     }));
//   };

//   // helper: convert number to Roman numeral
//   const toRoman = (num) => {
//     const romans = [
//       ["M", 1000],
//       ["CM", 900],
//       ["D", 500],
//       ["CD", 400],
//       ["C", 100],
//       ["XC", 90],
//       ["L", 50],
//       ["XL", 40],
//       ["X", 10],
//       ["IX", 9],
//       ["V", 5],
//       ["IV", 4],
//       ["I", 1],
//     ];
//     let result = "";
//     for (const [symbol, value] of romans) {
//       while (num >= value) {
//         result += symbol;
//         num -= value;
//       }
//     }
//     return result;
//   };

//   return (
//     <div className="min-h-screen bg-green-50 flex justify-center items-center p-6">
//       <div className="bg-white border border-green-200 rounded-lg shadow-md p-6 w-full max-w-5xl">
//         <h2 className="text-xl font-bold mb-6 text-gray-800">{standard.name}</h2>

//         {standard.criteria.map((criterion, index) => {
//           const rows = normalizeEvidence(criterion.evidence);

//           return (
//             <div key={criterion.id} className="mb-10">
//               <h3 className="text-lg font-semibold mb-3 text-green-800">
//                 {criterion.title}
//               </h3>

//               <div className="overflow-x-auto">
//                 <table className="w-full border border-green-200 rounded-lg text-sm">
//                   <thead className="bg-green-100 text-gray-800 font-semibold">
//                     <tr>
//                       <th className="p-2 text-center border border-green-200 w-12">#</th>
//                       <th className="p-2 text-left border border-green-200">
//                         Documentation and Evidence
//                       </th>
//                       <th className="p-2 text-left border border-green-200">Source 1</th>
//                       <th className="p-2 text-left border border-green-200">Source 2</th>
//                       <th className="p-2 text-left border border-green-200">Status</th>
//                       <th className="p-2 text-left border border-green-200">Date</th>
//                       <th className="p-2 text-left border border-green-200">Remarks</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {(rows.length
//                       ? rows
//                       : [
//                         {
//                           documentation: "",
//                           source1: "",
//                           source2: "",
//                           status: "",
//                           date: "",
//                           remarks: "",
//                         },
//                       ]
//                     ).map((ev, idx) => (
//                       <tr
//                         key={idx}
//                         className={`${idx % 2 === 0 ? "bg-white" : "bg-green-50"
//                           } border-t border-green-100`}
//                       >
//                         {/* Roman numeral column */}
//                         <td className="p-2 text-center border border-green-200 font-medium">
//                           {toRoman(index + 1)}
//                         </td>
//                         <td className="p-2 border border-green-200">{ev.documentation}</td>
//                         <td className="p-2 border border-green-200">{ev.source1}</td>
//                         <td className="p-2 border border-green-200">{ev.source2}</td>
//                         <td className="p-2 border border-green-200">{ev.status}</td>
//                         <td className="p-2 border border-green-200">{ev.date}</td>
//                         <td className="p-2 border border-green-200">{ev.remarks}</td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </table>
//               </div>
//             </div>
//           );
//         })}

//         <Link
//           to="/"
//           className="btn bg-green-700 text-white border-none flex items-center gap-2 mt-6"
//         >
//           🏠 Back to Home
//         </Link>
//       </div>
//     </div>
//   );
// }


import { Link, useParams } from "react-router-dom";
import standards from "../assets/full_list_fixed_clean.json";

export default function ListDetails() {
  const { id } = useParams();
  const standard = standards.find((s) => s.id === id);

  if (!standard) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-600">Standard not found.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-green-50 flex justify-center items-center p-6">
      <div className="w-full max-w-5xl bg-green-50 border border-green-100 rounded-lg shadow-sm p-6">
        <h2 className="text-lg font-bold text-gray-800 mb-4">{standard.name}</h2>
        <h3 className="text-md font-semibold mb-3 text-green-800">Criteria</h3>

        <div className="flex flex-col gap-2">
          {standard.criteria.map((criterion, index) => (
            <Link
              key={index}
              to={`/list/${standard.id}/criterion/${index}`}
              className="bg-white hover:bg-green-50 border border-green-100 rounded-md p-3 text-gray-700 cursor-pointer transition-all"
            >
              {criterion.title.split("\n")[0]} {/* Show only the first line of the title */}
            </Link>
          ))}
        </div>

        <Link
          to="/list"
          className="btn bg-green-700 text-white border-none flex items-center gap-2 mt-6"
        >
          🏠 Back to Standards
        </Link>
      </div>
    </div>
  );
}

