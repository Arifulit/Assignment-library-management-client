import { useDeleteBookMutation, useGetBooksQuery } from "@/redux/api/bookApi";
import { Link } from "react-router-dom";
import { useAppSelector } from "@/redux/hooks";
import SearchBar from "./SearchBar";

const AllBooks = () => {
  const { data, isLoading, isError } = useGetBooksQuery();
  const [deleteBook] = useDeleteBookMutation();
  const searchTerm = useAppSelector((state) => state.book.searchTerm.toLowerCase());

  const books = data?.data || [];
  console.log("books data", books);

  const filteredBooks = books?.filter((book) =>
    `${book.title} ${book.author} ${book.genre}`.toLowerCase().includes(searchTerm)
  );

  if (isLoading) return <p className="text-center text-gray-600">Loading books...</p>;
  if (isError) return <p className="text-center text-red-500">Failed to load books.</p>;

  return (
    <div className="overflow-x-auto p-4">
      <h2 className="text-2xl font-semibold mb-4">📚 All Books</h2>
      <SearchBar />

      <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
        <thead className="bg-indigo-600 text-white">
          <tr>
            <th className="px-4 py-2 text-left">Title</th>
            <th className="px-4 py-2 text-left">Author</th>
            <th className="px-4 py-2 text-left">Genre</th>
            <th className="px-4 py-2 text-left">ISBN</th>
            <th className="px-4 py-2 text-center">Copies</th>
            <th className="px-4 py-2 text-center">Status</th>
            <th className="px-4 py-2 text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredBooks?.map((book) => (
            <tr key={book._id} className="border-b hover:bg-gray-50">
              <td className="px-4 py-2">{book.title}</td>
              <td className="px-4 py-2">{book.author}</td>
              <td className="px-4 py-2">{book.genre}</td>
              <td className="px-4 py-2">{book.isbn}</td>
              <td className="px-4 py-2 text-center">{book.copies}</td>
              <td className="px-4 py-2 text-center">
                <span className={book.copies > 0 ? "text-green-600" : "text-red-600"}>
                  {book.copies > 0 ? "Available" : "Unavailable"}
                </span>
              </td>
              <td className="px-4 py-2 text-center space-x-2">
                <Link to={`/edit-book/${book._id}`} className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-sm">Edit</Link>
                <button onClick={() => deleteBook(book._id!)} className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm">Delete</button>
                <Link to={`/borrow/${book._id}`} className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded text-sm">Borrow</Link>
              </td>
            </tr>
          ))}
          {filteredBooks?.length === 0 && (
            <tr>
              <td colSpan={7} className="text-center py-4 text-gray-500">
                No books found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AllBooks;
