import { useParams, useNavigate, Link } from "react-router-dom";
import { standards, roleAccess } from "../config/standards";
import { useAuth } from "../context/AuthContext";

export default function Criteria() {
  const { standardId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  if (!user) return <div className="p-6">Not logged in</div>;

  const allCriteria = standards[standardId]?.criteria || [];
  const allowedCriteria =
    user.role === "Admin"
      ? allCriteria
      : roleAccess[user.role]?.[standardId] || [];

  return (
    <div className="p-6 bg-green-50 rounded-lg shadow">
      <h2 className="text-xl font-bold mb-4">Criterion {standardId}</h2>
      <div className="space-y-2">
        {allowedCriteria.map((c) => (
          <button
            key={c}
            onClick={() => navigate(`/dashboard/${standardId}/${c}`)}
            className="block w-full text-left p-3 bg-green-100 hover:bg-green-200 rounded"
          >
            {c}
          </button>
        ))}
      </div>
      <Link
        to="/standards"
        className="mt-4 inline-block px-4 py-2 bg-gray-600 text-white rounded"
      >
        Back to Standards
      </Link>
    </div>
  );
}
