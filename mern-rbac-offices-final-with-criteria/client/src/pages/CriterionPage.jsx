import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { standards } from "../config/standards.js";
import { useAuth } from "../context/AuthContext.jsx";

export default function CriterionPage() {
  const { standardId, criterionId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  // find the criterion from standards.js
  const criterionExists = standards[standardId]?.criteria.includes(criterionId);

  if (!criterionExists) {
    return (
      <div className="p-6">
        <h2 className="text-xl font-bold mb-4">Criterion {criterionId}</h2>
        <p className="text-gray-700">No data found for this criterion.</p>
        <button
          className="mt-6 bg-gray-500 text-white px-4 py-2 rounded"
          onClick={() => navigate(`/standards/${standardId}`)}
        >
          Back to Standard {standardId}
        </button>
      </div>
    );
  }

  return (
    <div className="p-6 bg-green-50 rounded-lg shadow">
      <h2 className="text-xl font-bold mb-4">
        Criterion {criterionId} – Standard {standardId}
      </h2>

      <p className="mb-6 text-gray-700">
        Here you can manage and view documents for this specific criterion.
      </p>

      <div className="space-y-2">
        <button
          onClick={() =>
            navigate(
              `/dashboard/${user.role}?standardId=${standardId}&criterionId=${criterionId}`
            )
          }
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
        >
          Go to Dashboard
        </button>

        <button
          className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition"
          onClick={() => navigate(`/standards/${standardId}`)}
        >
          Back to Standard {standardId}
        </button>

        <button
          className="bg-gray-700 text-white px-4 py-2 rounded hover:bg-gray-800 transition"
          onClick={() => navigate("/standards")}
        >
          Back to All Standards
        </button>
      </div>
    </div>
  );
}
