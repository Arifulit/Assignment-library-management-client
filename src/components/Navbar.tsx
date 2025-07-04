import { Link } from "react-router-dom";

const Navbar = () => (
  <nav className="bg-indigo-700 text-white p-4 flex justify-between items-center">
    <h1 className="text-xl font-bold">📚 Library</h1>
    <div className="flex gap-4">
      <Link to="/books" className="hover:underline">
        All Books
      </Link>
      <Link to="/add-book" className="hover:underline">
        Add Book
      </Link>
      <Link to="/borrow" className="hover:underline">
        Borrow Summary
      </Link>
    </div>
  </nav>
);

export default Navbar;
