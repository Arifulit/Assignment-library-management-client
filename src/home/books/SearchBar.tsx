// src/components/SearchBar.tsx
import { setSearchTerm } from "@/redux/features/bookSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";


const SearchBar = () => {
  const dispatch = useAppDispatch();
  const searchTerm = useAppSelector((state) => state.book.searchTerm);

  return (
    <div className="mb-4">
      <input
        type="text"
        placeholder="Search by title, author, or genre..."
        value={searchTerm}
        onChange={(e) => dispatch(setSearchTerm(e.target.value))}
        className="w-full px-4 py-2 border rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
      />
    </div>
  );
};

export default SearchBar;
