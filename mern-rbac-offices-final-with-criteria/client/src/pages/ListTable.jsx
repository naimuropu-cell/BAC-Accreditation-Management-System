import { Link, useParams } from "react-router-dom";
import standards from "../assets/full_list_fixed_clean.json";

export default function ListTable() {
    const { id, criterionId } = useParams(); // id = standardId
    const standard = standards.find((s) => s.id === id);
    if (!standard) return <p>Standard not found.</p>;

    const index = parseInt(criterionId, 10);
    const criterion = standard.criteria[index];
    if (!criterion) return <p>Criterion not found.</p>;

    const normalizeEvidence = (evidence = []) =>
        evidence.map((ev) => ({
            documentation:
                ev["Documentation and Evidence"] || ev["Documentation"] || ev["doc"] || "",
            source1: ev["Source 1"] || ev["Source1"] || ev["Source"] || "",
            source2: ev["Source 2"] || ev["Source2"] || "",
            status: ev["Status"] || "",
            date: ev["Date"] || "",
            remarks: ev["Remarks"] || "",
        }));

    const rows = normalizeEvidence(criterion.evidence || []);


    // helper function
    const toRoman = (num) => {
        const romans = [
            ["M", 1000],
            ["CM", 900],
            ["D", 500],
            ["CD", 400],
            ["C", 100],
            ["XC", 90],
            ["L", 50],
            ["XL", 40],
            ["X", 10],
            ["IX", 9],
            ["V", 5],
            ["IV", 4],
            ["I", 1],
        ];
        let result = "";
        for (const [symbol, value] of romans) {
            while (num >= value) {
                result += symbol;
                num -= value;
            }
        }
        return result;
    };




    return (
        <div className="min-h-screen bg-green-50 flex justify-center items-center p-6">
            <div className="bg-white border border-green-200 rounded-lg shadow-md p-6 w-full max-w-5xl">
                <h2 className="text-xl font-bold mb-6 text-gray-800">{criterion.title}</h2>

                <div className="overflow-x-auto">
                    <table className="w-full border border-green-200 rounded-lg text-sm">
                        <thead className="bg-green-100 text-gray-800 font-semibold">
                            <tr>
                                <th className="p-2 text-center border border-green-200 w-12">#</th>
                                <th className="p-2 text-left border border-green-200">Documentation and Evidence</th>
                                <th className="p-2 text-left border border-green-200">Source 1</th>
                                <th className="p-2 text-left border border-green-200">Source 2</th>
                                <th className="p-2 text-left border border-green-200">Status</th>
                                <th className="p-2 text-left border border-green-200">Date</th>
                                <th className="p-2 text-left border border-green-200">Remarks</th>
                            </tr>
                        </thead>
                        <tbody>
                            {(rows.length ? rows : [{}]).map((ev, idx) => (
                                <tr
                                    key={idx}
                                    className={`${idx % 2 === 0 ? "bg-white" : "bg-green-50"} border-t border-green-100`}
                                >
                                    <td className="p-2 text-center border border-green-200 font-medium">{toRoman(idx + 1)}</td>
                                    <td className="p-2 border border-green-200">{ev.documentation || ""}</td>
                                    <td className="p-2 border border-green-200">{ev.source1 || ""}</td>
                                    <td className="p-2 border border-green-200">{ev.source2 || ""}</td>
                                    <td className="p-2 border border-green-200">{ev.status || ""}</td>
                                    <td className="p-2 border border-green-200">{ev.date || ""}</td>
                                    <td className="p-2 border border-green-200">{ev.remarks || ""}</td>
                                </tr>
                            ))}
                        </tbody>

                    </table>
                </div>

                <Link
                    to={`/list/${standard.id}`}
                    className="btn bg-green-700 text-white border-none flex items-center gap-2 mt-6"
                >
                    🔙 Back to Criteria
                </Link>
            </div>
        </div>
    );
}
