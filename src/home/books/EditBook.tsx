/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  useGetBookQuery,
  useUpdateBookMutation,
  type Book,
} from "@/redux/api/bookApi";
import { toast } from "sonner";

export default function EditBook() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const { data: fetchedData, isLoading } = useGetBookQuery(id!);
  const [updateBook] = useUpdateBookMutation();

  const [formData, setFormData] = useState<Book>({
    title: "",
    author: "",
    genre: "",
    isbn: "",
    description: "",
    copies: 1,
    available: true,
  });

  useEffect(() => {
    if (fetchedData?.data) {
      setFormData(fetchedData.data);
    }
  }, [fetchedData]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "copies" ? Number(value) : value,
    }));
  };

 const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  // Prevent update if data is unchanged
  const originalData = JSON.stringify(fetchedData?.data);
  const currentData = JSON.stringify(formData);

  if (originalData === currentData) {
    toast.warning("⚠️ No changes made to the book.");
    return;
  }

  try {
    await updateBook({ id: id!, book: formData }).unwrap();
    toast.success("✅ Book updated successfully");
    navigate("/books");
  } catch (error) {
    console.error("❌ Update failed:", error);
    toast.error("Something went wrong");
  }
};

  if (isLoading || !fetchedData) {
    return (
      <div className="min-h-[40vh] flex items-center justify-center">
        <p className="text-lg text-gray-600 font-medium animate-pulse">
          Loading book data...
        </p>
      </div>
    );
  }

  return (
    <section className="max-w-3xl mx-auto my-10 p-6 sm:p-8 bg-white rounded-lg shadow-md border border-gray-100">
      <h2 className="text-3xl font-bold text-indigo-700 text-center mb-8">
        ✏️ Edit Book
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Input Fields */}
        {[
          { label: "Title", name: "title", type: "text" },
          { label: "Author", name: "author", type: "text" },
          { label: "Genre", name: "genre", type: "text" },
          { label: "ISBN", name: "isbn", type: "text" },
        ].map(({ label, name, type }) => (
          <div key={name}>
            <label
              htmlFor={name}
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              {label}
            </label>
            <input
              id={name}
              name={name}
              type={type}
              value={(formData as any)[name]}
              onChange={handleChange}
              required
              className="w-full rounded-md border border-gray-300 px-4 py-2 shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
              placeholder={`Enter ${label}`}
            />
          </div>
        ))}

        {/* Description */}
        <div>
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Description
          </label>
          <textarea
            id="description"
            name="description"
            rows={4}
            value={formData.description}
            onChange={handleChange}
            className="w-full rounded-md border border-gray-300 px-4 py-2 shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
            placeholder="Enter book description"
          />
        </div>

        {/* Copies */}
        <div>
          <label
            htmlFor="copies"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Number of Copies
          </label>
          <input
            id="copies"
            name="copies"
            type="number"
            min={0}
            value={formData.copies}
            onChange={handleChange}
            className="w-full rounded-md border border-gray-300 px-4 py-2 shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
          />
        </div>

        {/* Submit Button */}
        <div className="text-center pt-4">
          <button
            type="submit"
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-8 py-3 rounded-md shadow-lg transition duration-300"
          >
            Update Book
          </button>
        </div>
      </form>
    </section>
  );
}
