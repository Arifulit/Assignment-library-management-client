import { Link } from "react-router-dom";


const categories = ["Fiction", "Science", "History", "Technology"];

export default function FeatureSection() {
  return (
    <div className="bg-white">
      {/* Explore Categories */}
      <section className="py-16 text-center bg-gradient-to-r from-indigo-50 to-white">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl sm:text-4xl font-bold text-indigo-800 mb-4">
            📚 Explore Categories
          </h2>
          <p className="text-gray-600 mb-8 text-lg">
            Dive into genres that spark your curiosity.
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
            {categories.map((cat) => (
              <div
                key={cat}
                className="bg-indigo-100 hover:bg-indigo-200 text-indigo-900 font-semibold py-5 rounded-lg shadow transition duration-300 cursor-pointer"
              >
                {cat}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Borrow Summary */}
      <section className="py-16 bg-indigo-50 text-center shadow-inner">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-indigo-700 mb-3">
            📊 Borrow Statistics
          </h2>
          <p className="text-gray-600 mb-6 text-lg">
            Track the most borrowed books in your collection.
          </p>
          <Link
            to="/borrow"
            className="inline-block px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-medium shadow-md transition"
          >
            View Borrow Summary
          </Link>
        </div>
      </section>

      {/* About This System */}
      <section className="py-16 bg-white text-center">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-indigo-800 mb-4">
            ℹ️ About This System
          </h2>
          <p className="text-gray-600 text-lg leading-relaxed">
            Our Library Management System is built for speed, accuracy, and ease of use. Whether it's borrowing, returning, or managing books — we help you stay organized and efficient.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 bg-gradient-to-r from-indigo-600 to-purple-700 text-white text-center">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-4">🚀 Ready to Explore?</h2>
          <p className="text-lg mb-6">
            Browse our collection or add your own books with just a click.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              to="/books"
              className="bg-white text-indigo-700 px-6 py-3 rounded-md font-semibold hover:bg-gray-100 transition"
            >
              Browse Books
            </Link>
            <Link
              to="/add-book"
              className="bg-black px-6 py-3 rounded-md font-semibold hover:bg-gray-800 transition"
            >
              Add Book
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
