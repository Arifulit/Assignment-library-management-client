import { useGetBorrowSummaryQuery } from "@/redux/api/bookApi";

const BorrowSummary = () => {
  const { data, isLoading } = useGetBorrowSummaryQuery();

  if (isLoading) return <p>Loading...</p>;

  const borrowList = data?.data || [];

  return (
    <div className="overflow-x-auto mt-8">
      <table className="min-w-full bg-white rounded shadow">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-4 py-2">Title</th>
            <th className="px-4 py-2">ISBN</th>
            <th className="px-4 py-2">Total Borrowed</th>
          </tr>
        </thead>
        <tbody>
          {borrowList.map((entry) => (
            <tr key={entry.isbn} className="text-center border-t">
              <td className="px-4 py-2">{entry.title}</td>
              <td className="px-4 py-2">{entry.isbn}</td>
              <td className="px-4 py-2">{entry.totalBorrowed}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BorrowSummary;
