/* eslint-disable @typescript-eslint/no-unused-vars */

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCreateBookMutation, type BookFormData } from "@/redux/api/bookApi";
import { toast, Toaster } from "sonner";

export default function AddBook() {
  const navigate = useNavigate();
  const [createBook] = useCreateBookMutation();

  const [formData, setFormData] = useState<BookFormData>({
    title: "",
    author: "",
    genre: "",
    isbn: "",
    description: "",
    copies: 1,
    available: true,
  });

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
    try {
      await createBook(formData).unwrap();
      toast.success("📚 Book added successfully!");
      navigate("/books");
    } catch (error) {
      toast.error("❌ Failed to add book. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-white flex items-center justify-center px-4">
      <Toaster position="top-center" richColors />
      <div className="w-full max-w-2xl bg-white p-8 rounded-2xl shadow-2xl border border-gray-200">
        <h2 className="text-3xl font-bold text-indigo-700 text-center mb-8">
          📘 Add New Book
        </h2>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-6">
          {[
            { label: "Title", name: "title", type: "text" },
            { label: "Author", name: "author", type: "text" },
            { label: "Genre", name: "genre", type: "text" },
            { label: "ISBN", name: "isbn", type: "text" },
          ].map(({ label, name, type }) => (
            <div key={name}>
              <label className="block mb-1 text-sm font-medium text-gray-700">
                {label}
              </label>
              <input
                type={type}
                name={name}
                value={formData[name as keyof BookFormData] as string}
                onChange={handleChange}
                placeholder={`Enter ${label}`}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
              />
            </div>
          ))}

          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">
              Description
            </label>
            <textarea
              name="description"
              rows={4}
              value={formData.description}
              onChange={handleChange}
              placeholder="Enter book description"
              className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
            />
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">
              Number of Copies
            </label>
            <input
              type="number"
              name="copies"
              min={0}
              value={formData.copies}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
            />
          </div>

          <div className="text-center">
            <button
              type="submit"
              className="bg-indigo-600 text-white font-semibold px-6 py-3 rounded-md shadow-lg hover:bg-indigo-700 transition"
            >
              ➕ Add Book
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
