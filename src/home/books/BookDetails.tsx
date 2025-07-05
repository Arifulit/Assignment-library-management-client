import { useParams, useNavigate } from "react-router-dom";
import { useGetBookQuery } from "@/redux/api/bookApi";

const BookDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data, isLoading, isError } = useGetBookQuery(id!);
  const book = data?.data;

  if (isLoading)
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-gray-500 text-lg">Loading book details...</p>
      </div>
    );

  if (isError || !book)
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-red-500 text-lg">Book not found ❌</p>
      </div>
    );

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 to-white py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto bg-white shadow-xl rounded-2xl p-6 sm:p-10 space-y-6">
        <h1 className="text-3xl sm:text-4xl font-bold text-indigo-700 border-b pb-2">
          📖 {book.title}
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-sm sm:text-base text-gray-700">
          <div>
            <p className="font-medium">Author:</p>
            <p>{book.author}</p>
          </div>
          <div>
            <p className="font-medium">Genre:</p>
            <p>{book.genre}</p>
          </div>
          <div>
            <p className="font-medium">ISBN:</p>
            <p>{book.isbn}</p>
          </div>
          <div>
            <p className="font-medium">Copies Available:</p>
            <p>{book.copies}</p>
          </div>
          <div className="sm:col-span-2">
            <p className="font-medium">Description:</p>
            <p>{book.description || "No description provided."}</p>
          </div>
          <div>
            <p className="font-medium">Status:</p>
            <span
              className={`inline-block mt-1 px-3 py-1 text-sm font-semibold rounded-full ${
                book.copies > 0
                  ? "bg-green-100 text-green-700"
                  : "bg-red-100 text-red-700"
              }`}
            >
              {book.copies > 0 ? "Available ✅" : "Unavailable ❌"}
            </span>
          </div>
        </div>

        <div className="pt-4 border-t text-right">
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center bg-indigo-600 hover:bg-indigo-700 text-white font-medium px-5 py-2 rounded-lg shadow-md transition-all"
          >
            ⬅ Back to All Books
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookDetails;
