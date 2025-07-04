// /* eslint-disable @typescript-eslint/no-explicit-any */
// import type { Book } from "@/redux/api/bookApi";
// import { useEffect, useState } from "react";

// interface Props {
//   onSubmit: (data: Book) => void;
//   initialData?: Book;
// }

// const BookForm = ({ onSubmit, initialData }: Props) => {
//   const [formData, setFormData] = useState<Book>({
//     data: undefined,
//     title: "",
//     author: "",
//     genre: "",
//     isbn: "",
//     description: "",
//     copies: 1,
//     available: true,
//   });

//   // ✅ update formData when initialData changes (especially for EditBook)
//   useEffect(() => {
//     if (initialData) {
//       setFormData(initialData);
//     }
//   }, [initialData]);

//   const handleChange = (
//     e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
//   ) => {
//     const { name, value } = e.target;
//     setFormData({
//       ...formData,
//       [name]: name === "copies" ? Number(value) : value,
//     });
//   };

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     onSubmit(formData);
//   };
// console.log("Submitting:", formData);

//   return (
    
//     <form onSubmit={handleSubmit} className="space-y-6">
//       {[
//         { label: "Title", name: "title", type: "text" },
//         { label: "Author", name: "author", type: "text" },
//         { label: "Genre", name: "genre", type: "text" },
//         { label: "ISBN", name: "isbn", type: "text" },
//       ].map(({ label, name, type }) => (
//         <div key={name}>
//           <label
//             htmlFor={name}
//             className="block text-sm font-medium text-gray-700 mb-1"
//           >
//             {label}
//           </label>
//           <input
//             id={name}
//             name={name}
//             type={type}
//             value={(formData as any)[name]}
//             onChange={handleChange}
//             required
//             className="w-full rounded-md border border-gray-300 px-4 py-2 shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
//             placeholder={`Enter ${label}`}
//           />
//         </div>
//       ))}

//       {/* Description */}
//       <div>
//         <label
//           htmlFor="description"
//           className="block text-sm font-medium text-gray-700 mb-1"
//         >
//           Description
//         </label>
//         <textarea
//           id="description"
//           name="description"
//           rows={4}
//           value={formData.description}
//           onChange={handleChange}
//           className="w-full rounded-md border border-gray-300 px-4 py-2 shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
//           placeholder="Enter book description"
//         />
//       </div>

//       {/* Copies */}
//       <div>
//         <label
//           htmlFor="copies"
//           className="block text-sm font-medium text-gray-700 mb-1"
//         >
//           Number of Copies
//         </label>
//         <input
//           id="copies"
//           name="copies"
//           type="number"
//           min={0}
//           value={formData.copies}
//           onChange={handleChange}
//           className="w-full rounded-md border border-gray-300 px-4 py-2 shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
//         />
//       </div>

//       {/* Submit Button */}
//       <div className="text-center">
//         <button
//           type="submit"
//           className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-6 py-2 rounded-md shadow"
//         >
//           {initialData ? "Update Book" : "Add Book"}
//         </button>
//       </div>
//     </form>
//   );
// };

// export default BookForm;

