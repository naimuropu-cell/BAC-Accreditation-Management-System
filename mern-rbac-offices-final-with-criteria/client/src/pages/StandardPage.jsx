// import { useParams, useNavigate } from "react-router-dom";
// import { standards, roleAccess } from "../config/standards";
// import { useAuth } from "../context/AuthContext";

// export default function StandardPage() {
//   const { standardId } = useParams();
//   const navigate = useNavigate();
//   const { user } = useAuth();

//   if (!user) {
//     return (
//       <div className="p-6">
//         <p>You must be logged in to view this page.</p>
//       </div>
//     );
//   }

//   const role = user.role;
//   const allCriteria = standards[standardId]?.criteria || [];

//   // ✅ Apply role-based filtering
//   const allowedCriteria =
//     role === "Admin"
//       ? allCriteria
//       : roleAccess[role]?.[standardId] || [];

//   return (
//     <div className="p-6 bg-green-50 rounded-lg shadow">
//       <h2 className="text-xl font-bold mb-4">
//         Criteria for Standard {standardId} — {standards[standardId]?.title || ""}
//       </h2>

//       {allowedCriteria.length === 0 ? (
//         <p className="text-gray-600 italic">
//           No criteria assigned to your role for this standard.
//         </p>
//       ) : (
//         <div className="space-y-2">
//           {allowedCriteria.map((c) => (
//             <button
//               key={c}
//               onClick={() =>
//                 navigate(`/standards/${standardId}/criterion/${encodeURIComponent(c)}`)
//               }
//               className="block w-full text-left p-3 bg-green-100 hover:bg-green-200 rounded"
//             >
//               {c}
//             </button>
//           ))}
//         </div>
//       )}

//       <button
//         className="mt-4 bg-gray-600 text-white px-4 py-2 rounded"
//         onClick={() => navigate("/standards")}
//       >
//         Back to Standards
//       </button>
//     </div>
//   );
// }

import { useParams, useNavigate } from "react-router-dom";
import { standards, roleAccess } from "../config/standards.js";
import { useAuth } from "../context/AuthContext.jsx";

export default function StandardPage() {
  const { standardId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  if (!user) {
    return <div className="p-6">You must be logged in.</div>;
  }

  const role = user.role.toUpperCase();
  const allCriteria = standards[standardId]?.criteria || [];

  // ADMIN sees everything
  const allowedCriteria =
    role === "ADMIN"
      ? allCriteria
      : roleAccess[role]?.[standardId] || [];

  return (
    <div className="p-6 bg-green-50 rounded-lg shadow">
      <h2 className="text-xl font-bold mb-4">
        Criteria for Standard {standardId} — {standards[standardId]?.title}
      </h2>

      {allowedCriteria.length === 0 ? (
        <p className="text-gray-600 italic">
          No criteria assigned to your role for this standard.
        </p>
      ) : (
        <div className="space-y-2">
          {allowedCriteria.map((c) => (
            <button
              key={c}
              onClick={() =>
                navigate(
                  `/standards/${standardId}/criterion/${encodeURIComponent(c)}`
                )
              }
              className="block w-full text-left p-3 bg-green-100 hover:bg-green-200 rounded"
            >
              {c}
            </button>
          ))}
        </div>
      )}

      <button
        className="mt-4 bg-gray-600 text-white px-4 py-2 rounded"
        onClick={() => navigate("/standards")}
      >
        Back to Standards
      </button>
    </div>
  );
}
