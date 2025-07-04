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
    console.log("Sending book data to backend:", formData);
    try {
      await createBook(formData).unwrap();
      toast.success("✅ Book added successfully"); 
      navigate("/books");
    } catch (error) {
      console.error("❌ Failed to add book:", error);
      toast.error("❌ Something went wrong"); 
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-8 p-6 bg-white rounded shadow">
      {/* ✅ Toast Container */}
      <Toaster position="top-center" richColors />

      <h2 className="text-2xl font-bold mb-4 text-center">Add New Book</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
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
              value={formData[name as keyof BookFormData] as string}
              onChange={handleChange}
              required
              className="w-full rounded-md border border-gray-300 px-4 py-2 shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              placeholder={`Enter ${label}`}
            />
          </div>
        ))}

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
            className="w-full rounded-md border border-gray-300 px-4 py-2 shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="Enter book description"
          />
        </div>

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
            className="w-full rounded-md border border-gray-300 px-4 py-2 shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>

        <div className="text-center">
          <button
            type="submit"
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-6 py-2 rounded-md shadow"
          >
            Add Book
          </button>
        </div>
      </form>
    </div>
  );
}
