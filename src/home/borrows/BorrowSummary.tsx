import { useGetBorrowSummaryQuery } from "@/redux/api/bookApi";

export default function BorrowSummary() {
  const { data, isLoading } = useGetBorrowSummaryQuery();

  if (isLoading) {
    return <p className="text-center text-gray-500 mt-10">⏳ Loading borrow summary...</p>;
  }

  const borrowList = data?.data || [];

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-10">
      <h2 className="text-2xl sm:text-3xl font-bold text-center text-indigo-700 mb-8">
        📘 Borrow Summary
      </h2>

      <div className="overflow-x-auto bg-white shadow rounded-xl ring-1 ring-gray-200">
        <table className="min-w-full divide-y divide-gray-200 text-sm">
          <thead className="bg-indigo-600 text-white">
            <tr>
              <th className="px-4 sm:px-6 py-3 text-left font-semibold uppercase tracking-wide">
                Title
              </th>
              <th className="px-4 sm:px-6 py-3 text-left font-semibold uppercase tracking-wide">
                ISBN
              </th>
              <th className="px-4 sm:px-6 py-3 text-center font-semibold uppercase tracking-wide">
                Total Borrowed
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-100 bg-white">
            {borrowList.length > 0 ? (
              borrowList.map((entry) => (
                <tr key={entry.isbn} className="hover:bg-indigo-50 transition duration-200">
                  <td className="px-4 sm:px-6 py-4 text-gray-800 font-medium">
                    {entry.title}
                  </td>
                  <td className="px-4 sm:px-6 py-4 text-gray-600">{entry.isbn}</td>
                  <td className="px-4 sm:px-6 py-4 text-center text-indigo-700 font-semibold">
                    {entry.totalBorrowed}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={3} className="text-center text-gray-500 px-6 py-6">
                  No borrow summary found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
