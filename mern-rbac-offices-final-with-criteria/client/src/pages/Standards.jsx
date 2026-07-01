// import { useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { useAuth } from "../context/AuthContext.jsx";
// import { standards, roleAccess } from "../config/standards.js";

// export default function Standards() {
//   const { user } = useAuth();
//   const navigate = useNavigate();
//   const role = user?.role;

//   useEffect(() => {
//     if (!user) navigate("/login");
//   }, [user, navigate]);

//   const allowed = (() => {
//     if (!role) return standards;
//     if (roleAccess[role]) {
//       const keys = Object.keys(roleAccess[role]);
//       const obj = {};
//       keys.forEach((k) => {
//         if (standards[k]) {
//           obj[k] = {
//             ...standards[k],
//             criteria: standards[k].criteria.filter((c) =>
//               roleAccess[role][k].includes(c)
//             ),
//           };
//         }
//       });
//       return obj;
//     } else {
//       return standards;
//     }
//   })();

//   return (
//     <div className="p-6">
//       <h2 className="text-2xl font-bold mb-4">Standards</h2>
//       <div className="grid md:grid-cols-3 gap-4">
//         {Object.entries(allowed).map(([id, s]) => (
//           <div key={id} className="card bg-base-100 shadow">
//             <div className="card-body">
//               <h3 className="card-title">
//                 Standard {id}: {s.title}
//               </h3>
//               <p>Criteria available: {s.criteria.join(", ")}</p>
//               <div className="card-actions justify-end">
//                 <button
//                   className="btn bg-emerald-500"
//                   onClick={() => navigate(`/standards/${id}`)}
//                 >
//                   Open
//                 </button>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }


import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import { standards, roleAccess } from "../config/standards.js";

export default function Standards() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const role = user?.role?.toUpperCase();

  useEffect(() => {
    if (!user) navigate("/login");
  }, [user, navigate]);

  const allowed = (() => {
    if (!role) return standards;
    if (role === "ADMIN") return standards;

    if (roleAccess[role]) {
      const obj = {};
      Object.keys(roleAccess[role]).forEach((k) => {
        if (standards[k]) {
          obj[k] = {
            ...standards[k],
            criteria: standards[k].criteria.filter((c) =>
              roleAccess[role][k].includes(c)
            ),
          };
        }
      });
      return obj;
    }

    return {};
  })();

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Standards</h2>
      <div className="grid md:grid-cols-3 gap-4">
        {Object.entries(allowed).map(([id, s]) => (
          <div key={id} className="card bg-base-100 shadow">
            <div className="card-body">
              <h3 className="card-title">
                Standard {id}: {s.title}
              </h3>
              <p>Criteria available: {s.criteria.join(", ")}</p>
              <div className="card-actions justify-end">
                <button
                  className="btn bg-emerald-500"
                  onClick={() => navigate(`/standards/${id}`)}
                >
                  Open
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
