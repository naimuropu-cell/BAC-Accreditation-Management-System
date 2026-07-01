// import { Link } from "react-router-dom";
// import standards from "../assets/full_list_fixed_clean.json"; // adjust path if needed

// export default function List() {
//   return (
//     <div className="min-h-screen bg-green-50 flex justify-center items-center p-6">
//       <div className="w-full max-w-5xl bg-green-50 border border-green-100 rounded-lg shadow-sm p-6">
//         <h2 className="text-lg font-bold text-gray-800 mb-4">Standards</h2>

//         <div className="flex flex-col gap-2">
//           {standards.map((std) => (
//             <Link
//               key={std.id}
//               to={`/list/${std.id}`}
//               className="bg-white hover:bg-green-50 border border-green-100 rounded-md p-3 text-gray-700 cursor-pointer transition-all"
//             >
//               {std.name}
//             </Link>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }


import { Link } from "react-router-dom";
import standards from "../assets/full_list_fixed_clean.json";

export default function List() {
  return (
    <div className="min-h-screen bg-green-50 flex justify-center items-center p-6">
      <div className="w-full max-w-5xl bg-green-50 border border-green-100 rounded-lg shadow-sm p-6">
        <h2 className="text-lg font-bold text-gray-800 mb-4">Standards</h2>
        <div className="flex flex-col gap-2">
          {standards.map((std) => (
            <Link
              key={std.id}
              to={`/list/${std.id}`}
              className="bg-white hover:bg-green-50 border border-green-100 rounded-md p-3 text-gray-700 cursor-pointer transition-all"
            >
              {std.name}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
