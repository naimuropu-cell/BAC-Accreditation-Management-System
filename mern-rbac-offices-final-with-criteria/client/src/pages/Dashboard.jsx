// import { useEffect, useState } from "react";
// import { useParams, useSearchParams } from "react-router-dom";
// import { useAuth } from "../context/AuthContext.jsx";

// export default function Dashboard() {
//   const { role } = useParams();
//   const [searchParams] = useSearchParams();
//   const standardId = searchParams.get("standardId");
//   const criterionId = searchParams.get("criterionId");

//   const { api, user } = useAuth();
//   const [items, setItems] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [form, setForm] = useState({ title: "", description: "", file: null });
//   const [editing, setEditing] = useState(null);
//   const [remarkInput, setRemarkInput] = useState({});
//   const [dateInput, setDateInput] = useState({});

//   async function fetchDocs() {
//     setLoading(true);
//     try {
//       const q = new URLSearchParams();
//       if (standardId) q.append("standardId", standardId);
//       if (criterionId) q.append("criterionId", criterionId);
//       const { data } = await api.get("/api/documents" + (q.toString() ? "?" + q.toString() : ""));
//       if (data?.ok && Array.isArray(data.data)) setItems(data.data);
//       else setItems([]);
//     } catch (e) {
//       console.error("Fetch error:", e);
//       setItems([]);
//     } finally {
//       setLoading(false);
//     }
//   }

//   useEffect(() => { fetchDocs(); }, [standardId, criterionId]);

//   function onFile(e) { setForm(prev => ({ ...prev, file: e.target.files?.[0] || null })); }

//   async function onCreate(e) {
//     e.preventDefault();
//     if (!form.title || !form.file) return alert("Title and file required");

//     const fd = new FormData();
//     fd.append("title", form.title);
//     fd.append("description", form.description);
//     if (standardId) fd.append("standardId", standardId);
//     if (criterionId) fd.append("criterionId", criterionId);
//     fd.append("file", form.file);

//     if (user?.office) fd.append("uploadedBy", user.office);
//     else if (user?.role) fd.append("uploadedBy", user.role);

//     try {
//       const { data } = await api.post("/api/documents", fd);
//       if (data?.ok) {
//         setForm({ title: "", description: "", file: null });
//         fetchDocs();
//       } else alert("Upload failed");
//     } catch (err) {
//       alert(err?.response?.data?.error || "Upload error");
//     }
//   }

//   async function onDelete(id) {
//     if (!confirm("Delete?")) return;
//     try {
//       const { data } = await api.delete("/api/documents/" + id);
//       if (data?.ok) fetchDocs();
//       else alert("Delete failed");
//     } catch (err) {
//       alert(err?.response?.data?.error || "Delete error");
//     }
//   }

//   function onStartEdit(doc) {
//     setEditing(doc);
//     setForm({ title: doc.title, description: doc.description, file: null });
//   }

//   async function onSaveEdit(e) {
//     e.preventDefault();
//     try {
//       const body = { title: form.title, description: form.description };
//       const { data } = await api.put("/api/documents/" + editing._id, body);
//       if (data?.ok) {
//         setEditing(null);
//         setForm({ title: "", description: "", file: null });
//         fetchDocs();
//       } else alert("Update failed");
//     } catch (err) {
//       alert(err?.response?.data?.error || "Update error");
//     }
//   }

//   async function postRemark(docId) {
//     try {
//       const remark = remarkInput[docId] || "";
//       const { data } = await api.put(`/api/documents/${docId}/remarks`, { remarks: remark });
//       if (data?.ok) {
//         setRemarkInput(prev => ({ ...prev, [docId]: "" }));
//         fetchDocs();
//       }
//     } catch (err) {
//       alert(err?.response?.data?.error || "Remark post error");
//     }
//   }

//   async function postDate(docId) {
//     try {
//       const customDate = dateInput[docId] || "";
//       const { data } = await api.put(`/api/documents/${docId}/date`, { customDate });

//       if (data?.ok) {
//         setDateInput(prev => ({ ...prev, [docId]: "" }));
//         fetchDocs();
//       }
//     } catch (err) {
//       alert(err?.response?.data?.error || "Date post error");
//     }
//   }

//   const toRoman = (num) => {
//     const romans = [["M", 1000], ["CM", 900], ["D", 500], ["CD", 400], ["C", 100], ["XC", 90], ["L", 50], ["XL", 40], ["X", 10], ["IX", 9], ["V", 5], ["IV", 4], ["I", 1]];
//     let result = "";
//     for (const [r, v] of romans) { while (num >= v) { result += r; num -= v; } }
//     return result;
//   };

//   return (
//     <div className="p-6 space-y-4">
//       <h2 className="text-2xl font-bold mb-4">{user.role} Dashboard: Standard {standardId || "-"} Criterion {criterionId || ""}</h2>

//       <div className="card bg-base-100 p-4">
//         <h3 className="font-bold">Upload</h3>
//         <form onSubmit={editing ? onSaveEdit : onCreate} className="space-y-2">
//           <input className="input input-bordered w-full" placeholder="Title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
//           <textarea className="textarea w-full" placeholder="Description" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
//           <input type="file" onChange={onFile} />
//           <div className="flex gap-2">
//             <button className="btn btn-primary" type="submit">{editing ? "Save" : "Upload"}</button>
//             {editing && <button type="button" className="btn" onClick={() => { setEditing(null); setForm({ title: "", description: "", file: null }) }}>Cancel</button>}
//           </div>
//         </form>
//       </div>

//       <div className="overflow-x-auto">
//         <table className="table w-full border border-gray-400">
//           <thead className="bg-emerald-300 text-black border border-gray-400">
//             <tr className="text-center">
//               <th>#</th>
//               <th>Documentation and Evidence</th>
//               <th>Uploaded By</th>
//               <th>Date (Manual)</th>
//               <th>Remarks</th>
//               <th>Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {loading ? (<tr><td colSpan="6" className="text-center">Loading...</td></tr>) : items.length === 0 ? (<tr><td colSpan="6" className="text-center">No files uploaded</td></tr>) :
//               items.map((it, idx) => (
//                 <tr key={it._id} className="border-y text-center">
//                   <td>{toRoman(idx + 1)}</td>

//                   <td className="text-left p-2">
//                     <div className="font-semibold">{it.title}</div>
//                     <div className="text-sm text-gray-600">{it.description}</div>
//                   </td>

//                   <td>{it.uploadedBy}</td>

//                   {/* MANUAL DATE FIELD */}
//                   <td className="p-2">
//                     <div className="text-left text-sm mb-2 text-gray-700">
//                       {it.customDate || "No date set"}
//                     </div>
//                     <div className="flex gap-1">
//                       <input
//                         type="text"
//                         className="input input-bordered input-sm w-full"
//                         placeholder="Enter date..."
//                         value={dateInput[it._id] || ""}
//                         onChange={(e) => setDateInput(prev => ({ ...prev, [it._id]: e.target.value }))}
//                       />
//                       <button className="btn btn-xs btn-primary" onClick={() => postDate(it._id)}>Set</button>
//                     </div>
//                   </td>

//                   {/* REMARKS */}
//                   <td className="p-2">
//                     <div className="text-left text-sm mb-2 text-gray-700">
//                       {it.remarks || "No remarks"}
//                     </div>
//                     <div className="flex gap-1">
//                       <input
//                         type="text"
//                         className="input input-bordered input-sm w-full"
//                         placeholder="Add remark..."
//                         value={remarkInput[it._id] || ""}
//                         onChange={(e) => setRemarkInput(prev => ({ ...prev, [it._id]: e.target.value }))}
//                       />
//                       <button className="btn btn-xs btn-primary" onClick={() => postRemark(it._id)}>Post</button>
//                     </div>
//                   </td>



//                   <td className="p-2">
//                     <div className="flex flex-col gap-1 items-center">

//                       {it.filePath && (
//                         <a
//                           href={`${api.defaults.baseURL}/${it.filePath}`}
//                           download
//                           target="_blank"
//                           className="btn btn-xs btn-success w-20"
//                         >
//                           Download
//                         </a>
//                       )}

//                       <button
//                         className="btn btn-xs btn-info w-20"
//                         onClick={() => onStartEdit(it)}
//                       >
//                         Edit
//                       </button>

//                       <button
//                         className="btn btn-xs btn-error w-20"
//                         onClick={() => onDelete(it._id)}
//                       >
//                         Delete
//                       </button>

//                     </div>
//                   </td>




//                 </tr>
//               ))
//             }
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// }


// import { useEffect, useState } from "react";
// import { useParams, useSearchParams } from "react-router-dom";
// import { useAuth } from "../context/AuthContext.jsx";

// export default function Dashboard() {
//   const { role } = useParams();
//   const [searchParams] = useSearchParams();
//   const standardId = searchParams.get("standardId");
//   const criterionId = searchParams.get("criterionId");

//   const { api, user } = useAuth();
//   const [items, setItems] = useState([]);
//   const [loading, setLoading] = useState(false);

//   // STATUS MAP FOR FRONTEND ONLY
//   const [statusMap, setStatusMap] = useState({});

//   const [form, setForm] = useState({ title: "", description: "", file: null });
//   const [editing, setEditing] = useState(null);
//   const [remarkInput, setRemarkInput] = useState({});
//   const [dateInput, setDateInput] = useState({});

//   // FETCH DOCUMENTS & MERGE STATUS MAP
//   async function fetchDocs() {
//     setLoading(true);
//     try {
//       const q = new URLSearchParams();
//       if (standardId) q.append("standardId", standardId);
//       if (criterionId) q.append("criterionId", criterionId);

//       const { data } = await api.get(
//         "/api/documents" + (q.toString() ? "?" + q.toString() : "")
//       );

//       if (data?.ok && Array.isArray(data.data)) {
//         const loaded = data.data;

//         // MERGE STATUS MAP TO PRESERVE EXISTING STATUS
//         const nextMap = { ...statusMap };
//         loaded.forEach((d) => {
//           if (!nextMap[d._id]) nextMap[d._id] = "Uploaded";
//         });

//         setStatusMap(nextMap);
//         setItems(loaded);
//       } else {
//         setItems([]);
//       }
//     } catch (e) {
//       console.error("Fetch error:", e);
//       setItems([]);
//     } finally {
//       setLoading(false);
//     }
//   }

//   useEffect(() => {
//     fetchDocs();
//   }, [standardId, criterionId]);

//   function onFile(e) {
//     setForm((prev) => ({ ...prev, file: e.target.files?.[0] || null }));
//   }

//   async function onCreate(e) {
//     e.preventDefault();
//     if (!form.title || !form.file) return alert("Title and file required");

//     const fd = new FormData();
//     fd.append("title", form.title);
//     fd.append("description", form.description);
//     if (standardId) fd.append("standardId", standardId);
//     if (criterionId) fd.append("criterionId", criterionId);
//     fd.append("file", form.file);

//     if (user?.office) fd.append("uploadedBy", user.office);
//     else if (user?.role) fd.append("uploadedBy", user.role);

//     try {
//       const { data } = await api.post("/api/documents", fd);
//       if (data?.ok) {
//         const newId = data.data._id;

//         // SET STATUS → UPLOADED
//         setStatusMap((prev) => ({ ...prev, [newId]: "Uploaded" }));

//         setForm({ title: "", description: "", file: null });
//         fetchDocs();
//       } else alert("Upload failed");
//     } catch (err) {
//       alert(err?.response?.data?.error || "Upload error");
//     }
//   }

//   async function onDelete(id) {
//     if (!confirm("Delete?")) return;
//     try {
//       const { data } = await api.delete("/api/documents/" + id);
//       if (data?.ok) {
//         // REMOVE STATUS FROM MAP
//         setStatusMap((prev) => {
//           const copy = { ...prev };
//           delete copy[id];
//           return copy;
//         });
//         fetchDocs();
//       } else alert("Delete failed");
//     } catch (err) {
//       alert(err?.response?.data?.error || "Delete error");
//     }
//   }

//   function onStartEdit(doc) {
//     setEditing(doc);
//     setForm({ title: doc.title, description: doc.description, file: null });
//   }

//   async function onSaveEdit(e) {
//     e.preventDefault();
//     try {
//       const body = { title: form.title, description: form.description };
//       const { data } = await api.put("/api/documents/" + editing._id, body);

//       if (data?.ok) {
//         // SET STATUS → EDITED
//         setStatusMap((prev) => ({ ...prev, [editing._id]: "Edited" }));

//         setEditing(null);
//         setForm({ title: "", description: "", file: null });
//         fetchDocs();
//       } else alert("Update failed");
//     } catch (err) {
//       alert(err?.response?.data?.error || "Update error");
//     }
//   }

//   async function postRemark(docId) {
//     try {
//       const remark = remarkInput[docId] || "";
//       const { data } = await api.put(`/api/documents/${docId}/remarks`, { remarks: remark });

//       if (data?.ok) {
//         setRemarkInput((prev) => ({ ...prev, [docId]: "" }));
//         fetchDocs();
//       }
//     } catch (err) {
//       alert(err?.response?.data?.error || "Remark post error");
//     }
//   }

//   async function postDate(docId) {
//     try {
//       const customDate = dateInput[docId] || "";
//       const { data } = await api.put(`/api/documents/${docId}/date`, { customDate });

//       if (data?.ok) {
//         setDateInput((prev) => ({ ...prev, [docId]: "" }));
//         fetchDocs();
//       }
//     } catch (err) {
//       alert(err?.response?.data?.error || "Date post error");
//     }
//   }

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
//     for (const [r, v] of romans) {
//       while (num >= v) {
//         result += r;
//         num -= v;
//       }
//     }
//     return result;
//   };

//   return (
//     <div className="p-6 space-y-4">
//       <h2 className="text-2xl font-bold mb-4">
//         {user.role} Dashboard: Standard {standardId || "-"} Criterion {criterionId || ""}
//       </h2>

//       {/* UPLOAD CARD */}
//       <div className="card bg-base-100 p-4">
//         <h3 className="font-bold">Upload</h3>
//         <form onSubmit={editing ? onSaveEdit : onCreate} className="space-y-2">
//           <input
//             className="input input-bordered w-full"
//             placeholder="Title"
//             value={form.title}
//             onChange={(e) => setForm({ ...form, title: e.target.value })}
//           />
//           <textarea
//             className="textarea w-full"
//             placeholder="Description"
//             value={form.description}
//             onChange={(e) => setForm({ ...form, description: e.target.value })}
//           />
//           <input type="file" onChange={onFile} />
//           <div className="flex gap-2">
//             <button className="btn btn-primary" type="submit">
//               {editing ? "Save" : "Upload"}
//             </button>
//             {editing && (
//               <button
//                 type="button"
//                 className="btn"
//                 onClick={() => {
//                   setEditing(null);
//                   setForm({ title: "", description: "", file: null });
//                 }}
//               >
//                 Cancel
//               </button>
//             )}
//           </div>
//         </form>
//       </div>

//       {/* TABLE */}
//       <div className="overflow-x-auto">
//         <table className="table w-full border border-gray-400">
//           <thead className="bg-emerald-300 text-black border border-gray-400">
//             <tr className="text-center">
//               <th>#</th>
//               <th>Documentation and Evidence</th>
//               <th>Uploaded By</th>
//               <th>Date (Manual)</th>
//               <th>Remarks</th>
//               <th>Status</th> {/* NEW COLUMN */}
//               <th>Actions</th>
//             </tr>
//           </thead>

//           <tbody>
//             {loading ? (
//               <tr>
//                 <td colSpan="7" className="text-center">
//                   Loading...
//                 </td>
//               </tr>
//             ) : items.length === 0 ? (
//               <tr>
//                 <td colSpan="7" className="text-center">
//                   No files uploaded
//                 </td>
//               </tr>
//             ) : (
//               items.map((it, idx) => (
//                 <tr key={it._id} className="border-y text-center">
//                   <td>{toRoman(idx + 1)}</td>

//                   <td className="text-left p-2">
//                     <div className="font-semibold">{it.title}</div>
//                     <div className="text-sm text-gray-600">{it.description}</div>
//                   </td>

//                   <td>{it.uploadedBy}</td>

//                   {/* DATE */}
//                   <td className="p-2">
//                     <div className="text-left text-sm mb-2 text-gray-700">
//                       {it.customDate || "No date set"}
//                     </div>
//                     <div className="flex gap-1">
//                       <input
//                         type="text"
//                         className="input input-bordered input-sm w-full"
//                         placeholder="Enter date..."
//                         value={dateInput[it._id] || ""}
//                         onChange={(e) =>
//                           setDateInput((prev) => ({ ...prev, [it._id]: e.target.value }))
//                         }
//                       />
//                       <button className="btn btn-xs btn-primary" onClick={() => postDate(it._id)}>
//                         Set
//                       </button>
//                     </div>
//                   </td>

//                   {/* REMARKS */}
//                   <td className="p-2">
//                     <div className="text-left text-sm mb-2 text-gray-700">
//                       {it.remarks || "No remarks"}
//                     </div>
//                     <div className="flex gap-1">
//                       <input
//                         type="text"
//                         className="input input-bordered input-sm w-full"
//                         placeholder="Add remark..."
//                         value={remarkInput[it._id] || ""}
//                         onChange={(e) =>
//                           setRemarkInput((prev) => ({ ...prev, [it._id]: e.target.value }))
//                         }
//                       />
//                       <button className="btn btn-xs btn-primary" onClick={() => postRemark(it._id)}>
//                         Post
//                       </button>
//                     </div>
//                   </td>

//                   {/* STATUS */}
//                   <td className="p-2">
//                     {statusMap[it._id] === "Edited" ? (
//                       <span className="badge badge-primary">{statusMap[it._id]}</span>
//                     ) : (
//                       <span className="badge badge-success">{statusMap[it._id]}</span>
//                     )}
//                   </td>

//                   {/* ACTIONS */}
//                   <td className="p-2">
//                     <div className="flex flex-col gap-1 items-center">
//                       {it.filePath && (
//                         <a
//                           href={`${api.defaults.baseURL}/${it.filePath}`}
//                           download
//                           target="_blank"
//                           className="btn btn-xs btn-success w-20"
//                         >
//                           Download
//                         </a>
//                       )}

//                       <button className="btn btn-xs btn-info w-20" onClick={() => onStartEdit(it)}>
//                         Edit
//                       </button>

//                       <button className="btn btn-xs btn-error w-20" onClick={() => onDelete(it._id)}>
//                         Delete
//                       </button>
//                     </div>
//                   </td>
//                 </tr>
//               ))
//             )}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// }

import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

export default function Dashboard() {
  const { role } = useParams();
  const [searchParams] = useSearchParams();
  const standardId = searchParams.get("standardId");
  const criterionId = searchParams.get("criterionId");

  const { api, user } = useAuth();
  const isAdmin = user?.role?.toLowerCase() === "admin";

  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [statusMap, setStatusMap] = useState({});
  const [form, setForm] = useState({ title: "", description: "", file: null });
  const [editing, setEditing] = useState(null);
  const [remarkInput, setRemarkInput] = useState({});
  const [dateInput, setDateInput] = useState({});

  async function fetchDocs() {
    setLoading(true);
    try {
      const q = new URLSearchParams();
      if (standardId) q.append("standardId", standardId);
      if (criterionId) q.append("criterionId", criterionId);

      const { data } = await api.get(
        "/api/documents" + (q.toString() ? "?" + q.toString() : "")
      );

      if (data?.ok) {
        const map = {};
        data.data.forEach((d) => (map[d._id] = "Uploaded"));
        setStatusMap(map);
        setItems(data.data);
      } else {
        setItems([]);
      }
    } catch {
      setItems([]);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchDocs();
  }, [standardId, criterionId]);

  function onFile(e) {
    setForm((p) => ({ ...p, file: e.target.files?.[0] || null }));
  }

  async function onCreate(e) {
    e.preventDefault();
    if (!form.title || !form.file) return;

    const fd = new FormData();
    fd.append("title", form.title);
    fd.append("description", form.description);
    fd.append("file", form.file);
    if (standardId) fd.append("standardId", standardId);
    if (criterionId) fd.append("criterionId", criterionId);
    fd.append("uploadedBy", user.office || user.role);

    await api.post("/api/documents", fd);
    setForm({ title: "", description: "", file: null });
    fetchDocs();
  }

  function onStartEdit(doc) {
    setEditing(doc);
    setForm({ title: doc.title, description: doc.description, file: null });
  }

  async function onSaveEdit(e) {
    e.preventDefault();
    await api.put(`/api/documents/${editing._id}`, {
      title: form.title,
      description: form.description,
    });
    setEditing(null);
    fetchDocs();
  }

  async function onDelete(id) {
    if (!confirm("Delete?")) return;
    await api.delete(`/api/documents/${id}`);
    fetchDocs();
  }

  async function postRemark(id) {
    await api.put(`/api/documents/${id}/remarks`, {
      remarks: remarkInput[id] || "",
    });
    setRemarkInput((p) => ({ ...p, [id]: "" }));
    fetchDocs();
  }

  async function postDate(id) {
    await api.put(`/api/documents/${id}/date`, {
      customDate: dateInput[id] || "",
    });
    setDateInput((p) => ({ ...p, [id]: "" }));
    fetchDocs();
  }

  const toRoman = (num) => {
    const map = [
      ["M", 1000], ["CM", 900], ["D", 500], ["CD", 400],
      ["C", 100], ["XC", 90], ["L", 50], ["XL", 40],
      ["X", 10], ["IX", 9], ["V", 5], ["IV", 4], ["I", 1],
    ];
    let out = "";
    for (const [r, v] of map) while (num >= v) (out += r, num -= v);
    return out;
  };

  return (
    <div className="p-6 space-y-4">
      <h2 className="text-2xl font-bold">
        {user.role} Dashboard — Standard {standardId || "-"} Criterion {criterionId || "-"}
      </h2>

      {/* 🚫 UPLOAD UI — HIDDEN FOR ADMIN ONLY */}
      {!isAdmin && (
        <div className="card bg-base-100 p-4">
          <h3 className="font-bold">Upload</h3>

          <form onSubmit={editing ? onSaveEdit : onCreate} className="space-y-2">
            <input
              className="input input-bordered w-full"
              placeholder="Title"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
            />

            <textarea
              className="textarea w-full"
              placeholder="Description"
              value={form.description}
              onChange={(e) =>
                setForm({ ...form, description: e.target.value })
              }
            />

            <input type="file" onChange={onFile} />

            <div className="flex gap-2">
              <button className="btn btn-primary">
                {editing ? "Save" : "Upload"}
              </button>

              {editing && (
                <button
                  type="button"
                  className="btn"
                  onClick={() => {
                    setEditing(null);
                    setForm({ title: "", description: "", file: null });
                  }}
                >
                  Cancel
                </button>
              )}
            </div>
          </form>
        </div>
      )}

      {/* ✅ TABLE — UNCHANGED */}
      <div className="overflow-x-auto">
        <table className="table w-full border">
          <thead className="bg-emerald-300 text-black">
            <tr className="text-center">
              <th>#</th>
              <th>Documentation and Evidence</th>
              <th>Uploaded By</th>
              <th>Date</th>
              <th>Remarks</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {loading ? (
              <tr><td colSpan="7" className="text-center">Loading...</td></tr>
            ) : items.length === 0 ? (
              <tr><td colSpan="7" className="text-center">No files uploaded</td></tr>
            ) : (
              items.map((it, idx) => (
                <tr key={it._id} className="text-center">
                  <td>{toRoman(idx + 1)}</td>

                  <td className="text-left">
                    <div className="font-semibold">{it.title}</div>
                    <div className="text-sm text-gray-600">{it.description}</div>
                  </td>

                  <td>{it.uploadedBy}</td>

                  <td>
                    <input
                      className="input input-xs"
                      value={dateInput[it._id] || it.customDate || ""}
                      onChange={(e) =>
                        setDateInput((p) => ({ ...p, [it._id]: e.target.value }))
                      }
                    />
                    <button className="btn btn-xs mt-1" onClick={() => postDate(it._id)}>
                      Save
                    </button>
                  </td>

                  <td>
                    <textarea
                      className="textarea textarea-xs"
                      value={remarkInput[it._id] || it.remarks || ""}
                      onChange={(e) =>
                        setRemarkInput((p) => ({ ...p, [it._id]: e.target.value }))
                      }
                    />
                    <button className="btn btn-xs mt-1" onClick={() => postRemark(it._id)}>
                      Save
                    </button>
                  </td>

                  <td>
                    <span className="badge badge-success">
                      {statusMap[it._id]}
                    </span>
                  </td>

                  <td className="space-y-1">
                    {it.filePath && (
                      <a
                        href={`${api.defaults.baseURL}/${it.filePath}`}
                        target="_blank"
                        className="btn btn-xs btn-success"
                      >
                        Download
                      </a>
                    )}
                    <button className="btn btn-xs btn-info" onClick={() => onStartEdit(it)}>
                      Edit
                    </button>
                    <button className="btn btn-xs btn-error" onClick={() => onDelete(it._id)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}


