import { useBorrowBookMutation, useGetBookQuery } from "@/redux/api/bookApi";
import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";

export default function BorrowPage() {
  const { bookId } = useParams();
  const navigate = useNavigate();
  const { data, isLoading } = useGetBookQuery(bookId!);
  const [borrowBook] = useBorrowBookMutation();

  const [quantity, setQuantity] = useState(1);
  const [dueDate, setDueDate] = useState("");

  if (isLoading || !data?.data) return <p>Loading...</p>;

  const maxCopies = data.data.copies;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (quantity < 1 || quantity > maxCopies) {
      alert(`❌ Quantity must be between 1 and ${maxCopies}`);
      return;
    }

    if (!dueDate) {
      alert("❌ Please select a due date.");
      return;
    }

    try {
      await borrowBook({ bookId: bookId!, quantity, dueDate });
      alert("✅ Book borrowed successfully!");
      navigate("/borrow");
    } catch (error) {
      console.error("❌ Borrow failed:", error);
      alert("Something went wrong while borrowing the book.");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow rounded">
      <h2 className="text-2xl font-semibold mb-6 text-center">Borrow Book</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="quantity" className="block mb-1 font-medium">
            Quantity (Max: {maxCopies})
          </label>
          <input
            id="quantity"
            type="number"
            value={quantity}
            min={1}
            max={maxCopies}
            onChange={(e) => setQuantity(Number(e.target.value))}
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          />
        </div>

        <div>
          <label htmlFor="dueDate" className="block mb-1 font-medium">
            Due Date
          </label>
          <input
            id="dueDate"
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          />
        </div>

        <div className="text-center">
          <button
            type="submit"
            className="bg-indigo-600 text-white px-6 py-2 rounded hover:bg-indigo-700 transition"
          >
            Borrow Book
          </button>
        </div>
      </form>
    </div>
  );
}
