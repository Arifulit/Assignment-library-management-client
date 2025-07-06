
import { useGetBorrowSummaryQuery } from "@/redux/features/borrowApi";

export default function BorrowSummary() {
  const { data, isLoading, isError, error } = useGetBorrowSummaryQuery();

  console.log("Borrow summary API data:", data);

  if (isLoading) {
    return <p className="text-center text-gray-500 mt-10">⏳ Loading borrow summary...</p>;
  }

  if (isError) {
    console.error("Error fetching borrow summary:", error);
    return <p className="text-center text-red-500 mt-10">⚠️ Error loading borrow summary.</p>;
  }

  const borrowList = data?.data || [];

  if (borrowList.length === 0) {
    return <p className="text-center text-gray-500 mt-10">No borrow summary found.</p>;
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-10">
      <h2 className="text-2xl sm:text-3xl font-bold text-center text-indigo-700 mb-8">
        📘 Borrow Summary
      </h2>

      <div className="overflow-x-auto bg-white shadow rounded-xl ring-1 ring-gray-200">
        <table className="min-w-full divide-y divide-gray-200 text-sm">
          <thead className="bg-indigo-600 text-white">
            <tr>
              <th className="px-4 sm:px-6 py-3 text-left font-semibold uppercase tracking-wide">Title</th>
              <th className="px-4 sm:px-6 py-3 text-left font-semibold uppercase tracking-wide">ISBN</th>
              <th className="px-4 sm:px-6 py-3 text-center font-semibold uppercase tracking-wide">Total Borrowed</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-100 bg-white">
            {borrowList.map((entry) => (
              <tr key={entry.isbn ?? entry.title} className="hover:bg-indigo-50 transition duration-200">
                <td className="px-4 sm:px-6 py-4 text-gray-800 font-medium">{entry.title}</td>
                <td className="px-4 sm:px-6 py-4 text-gray-600">{entry.isbn}</td>
                <td className="px-4 sm:px-6 py-4 text-center text-indigo-700 font-semibold">{entry.totalBorrowed}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
