
import { useGetBookQuery } from "@/redux/features/bookApi";
import { useBorrowBookMutation } from "@/redux/features/borrowApi";
import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import { toast, Toaster } from "sonner";

export default function BorrowPage() {
  const { bookId } = useParams<{ bookId: string }>();
  const navigate = useNavigate();

 
  const { data, isLoading, isError } = useGetBookQuery(bookId!);


  const [borrowBook, { isLoading: isBorrowing }] = useBorrowBookMutation();

  const [quantity, setQuantity] = useState(1);
  const [dueDate, setDueDate] = useState("");

  if (isLoading) {
    return <p className="text-center text-gray-600 mt-10">Loading book info...</p>;
  }

  if (isError || !data?.data) {
    return <p className="text-center text-red-600 mt-10">Failed to load book information.</p>;
  }

  const book = data.data;
  const maxCopies = book.copies;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (quantity < 1 || quantity > maxCopies) {
      toast.error(`❌ Quantity must be between 1 and ${maxCopies}`);
      return;
    }

    if (!dueDate) {
      toast.error("❌ Please select a due date.");
      return;
    }

    try {
      await borrowBook({ bookId: bookId!, quantity, dueDate }).unwrap();
      toast.success("✅ Book borrowed successfully!");
      navigate("/borrow");
    } catch (error) {
      console.error("❌ Borrow failed:", error);
      toast.error("Something went wrong while borrowing the book.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-indigo-50 to-white px-4">
      <Toaster position="top-center" richColors />
      <div className="w-full max-w-lg bg-white p-8 rounded-2xl shadow-2xl border border-gray-200">
        <h2 className="text-3xl font-bold text-center text-indigo-700 mb-6">
          📖 Borrow "{book.title}"
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="quantity" className="block mb-1 font-medium text-gray-700">
              Quantity <span className="text-sm text-gray-500">(Max: {maxCopies})</span>
            </label>
            <input
              id="quantity"
              type="number"
              value={quantity}
              min={1}
              max={maxCopies}
              onChange={(e) => setQuantity(Number(e.target.value))}
              className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
              required
              disabled={isBorrowing}
            />
          </div>

          <div>
            <label htmlFor="dueDate" className="block mb-1 font-medium text-gray-700">
              Due Date
            </label>
            <input
              id="dueDate"
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
              required
              disabled={isBorrowing}
            />
          </div>

          <div className="text-center">
            <button
              type="submit"
              className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-6 py-3 rounded-md shadow-lg transition disabled:opacity-50"
              disabled={isBorrowing}
            >
              {isBorrowing ? "Borrowing..." : "✅ Borrow Book"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
