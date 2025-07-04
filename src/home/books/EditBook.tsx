/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useGetBookQuery, useUpdateBookMutation, type Book } from "@/redux/api/bookApi";

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

  // When fetched data changes, update formData state
  useEffect(() => {
    if (fetchedData?.data) {
      setFormData(fetchedData.data);
    }
  }, [fetchedData]);

  if (isLoading || !fetchedData) {
    return <p>Loading...</p>;
  }

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
      await updateBook({ id: id!, book: formData }).unwrap();
      alert("✅ Book updated successfully");
      navigate("/books");
    } catch (error) {
      console.error("❌ Update failed:", error);
      alert("Something went wrong");
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-8 p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-4 text-center">Edit Book</h2>
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
              value={(formData as any)[name]}
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
            Update Book
          </button>
        </div>
      </form>
    </div>
  );
}
