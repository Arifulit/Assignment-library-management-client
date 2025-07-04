
// import { useState } from "react";

// interface Props {
//   maxCopies: number;
//   onBorrow: (quantity: number, dueDate: string) => void;
// }

// const BorrowForm = ({ maxCopies, onBorrow }: Props) => {
//   const [quantity, setQuantity] = useState(1);
//   const [dueDate, setDueDate] = useState("");

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     if (quantity <= maxCopies && dueDate) {
//       onBorrow(quantity, dueDate);
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit} className="space-y-4">
//       <input type="number" value={quantity} onChange={(e) => setQuantity(+e.target.value)} max={maxCopies} min={1} className="input" required />
//       <input type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} className="input" required />
//       <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">Borrow</button>
//     </form>
//   );
// };

// export default BorrowForm;