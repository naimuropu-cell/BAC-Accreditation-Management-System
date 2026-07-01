import { Link, useParams } from "react-router-dom";

export default function CriterionTable() {
  const { listId, criterionId } = useParams();

  return (
    <div className="min-h-screen bg-green-50 flex flex-col justify-center items-center p-6">
      <div className="bg-white border border-green-200 rounded-lg shadow-md p-6 w-full max-w-3xl">
        <h2 className="text-xl font-bold mb-4 text-gray-800">
          Criterion {listId}.{criterionId}
        </h2>

        <table className="table w-full border">
          <thead>
            <tr className="bg-green-700 text-white">
              <th>Column 1</th>
              <th>Column 2</th>
              <th>Column 3</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Example Data 1</td>
              <td>Example Data 2</td>
              <td>Example Data 3</td>
            </tr>
          </tbody>
        </table>

        <div className="mt-6 flex gap-2">
          <Link
            to={`/list/${listId}`}
            className="btn bg-green-700 text-white border-none"
          >
            🔙 Back to Standard {listId}
          </Link>

          <Link to="/" className="btn bg-green-700 text-white border-none">
            🏠 Home
          </Link>
        </div>
      </div>
    </div>
  );
}
