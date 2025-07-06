/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
// /* eslint-disable @typescript-eslint/no-unused-vars */

import { Link } from "react-router-dom";
import { toast } from "sonner";
import { useAppSelector } from "@/redux/hooks";
import { useDeleteBookMutation, useGetBooksQuery } from "@/redux/features/bookApi";
import SearchBar from "./SearchBar";

const AllBooks = () => {
  const { data, isLoading, isError } = useGetBooksQuery();
  const [deleteBook] = useDeleteBookMutation();

  const searchTerm = useAppSelector((state) =>
    state.book.searchTerm.toLowerCase()
  );
  const books = data?.data || [];

  const filteredBooks = books.filter((book) =>
    `${book.title} ${book.author} ${book.genre}`.toLowerCase().includes(searchTerm)
  );

 

  const handleDelete = (id: string) => {
    toast("Are you sure you want to delete this book?", {
      action: {
        label: "Yes, Delete",
        onClick: async () => {
          try {
            await deleteBook(id).unwrap();
            toast.success("✅ Book deleted successfully!");
          } catch {
            toast.error("❌ Failed to delete the book.");
          }
        },
      },
      cancel: {
        label: "Cancel",
        onClick: () => toast.info("❎ Deletion cancelled."),
      },
    });
  };

  if (isLoading) return <p className="text-center text-gray-500 mt-10">Loading books...</p>;
  if (isError) return <p className="text-center text-red-500 mt-10">Failed to load books.</p>;

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-4 max-w-7xl mx-auto">
      <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-indigo-700 text-center">
        📚 All Books
      </h2>

      <div className="mb-4">
        <SearchBar />
      </div>

      {/* Desktop Table View */}
      <div className="hidden md:block overflow-x-auto bg-white rounded shadow mt-6">
        <table className="min-w-full divide-y divide-gray-200 text-sm">
          <thead className="bg-indigo-600 text-white">
            <tr>
              <th className="px-4 py-3 text-left">Title</th>
              <th className="px-4 py-3 text-left">Author</th>
              <th className="px-4 py-3 text-left">Genre</th>
              <th className="px-4 py-3 text-left">ISBN</th>
              <th className="px-4 py-3 text-center">Copies</th>
              <th className="px-4 py-3 text-center">Status</th>
              <th className="px-4 py-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 bg-white">
            {filteredBooks.map((book, idx) => (
              <tr
                key={book._id}
                className={idx % 2 === 0 ? "bg-gray-50 hover:bg-gray-100" : "hover:bg-gray-100"}
              >
                <td className="px-4 py-3">{book.title}</td>
                <td className="px-4 py-3">{book.author}</td>
                <td className="px-4 py-3">{book.genre}</td>
                <td className="px-4 py-3">{book.isbn}</td>
                <td className="px-4 py-3 text-center">{book.copies}</td>
                <td className="px-4 py-3 text-center">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                      book.copies > 0
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {book.copies > 0 ? "Available" : "Unavailable"}
                  </span>
                </td>
                <td className="px-4 py-3 text-center space-x-2">
                  <Link
                    to={`/book-details/${book._id}`}
                    className="bg-gray-500 hover:bg-gray-600 text-white px-3 py-1 rounded text-sm"
                  >
                    Details
                  </Link>
                  <Link
                    to={`/edit-book/${book._id}`}
                    className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-sm"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(book._id!)}
                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm"
                  >
                    Delete
                  </button>
                  <Link
                    to={`/borrow/${book._id}`}
                    className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded text-sm"
                  >
                    Borrow
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile View: Cards */}
      <div className="md:hidden grid grid-cols-1 gap-4 mt-6">
        {filteredBooks.map((book) => (
          <div key={book._id} className="bg-white shadow rounded p-4">
            <h3 className="text-lg font-semibold text-indigo-700 mb-2">{book.title}</h3>
            <p><strong>Author:</strong> {book.author}</p>
            <p><strong>Genre:</strong> {book.genre}</p>
            <p><strong>ISBN:</strong> {book.isbn}</p>
            <p><strong>Copies:</strong> {book.copies}</p>
            <p>
              <strong>Status:</strong>{" "}
              <span
                className={`text-sm font-medium ${
                  book.copies > 0 ? "text-green-600" : "text-red-600"
                }`}
              >
                {book.copies > 0 ? "Available" : "Unavailable"}
              </span>
            </p>
            <div className="flex flex-wrap gap-2 mt-3">
              <Link
                to={`/book-details/${book._id}`}
                className="bg-gray-500 hover:bg-gray-600 text-white px-3 py-1 rounded text-sm"
              >
                Details
              </Link>
              <Link
                to={`/edit-book/${book._id}`}
                className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-sm"
              >
                Edit
              </Link>
              <button
                onClick={() => handleDelete(book._id!)}
                className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm"
              >
                Delete
              </button>
              <Link
                to={`/borrow/${book._id}`}
                className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded text-sm"
              >
                Borrow
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllBooks;
