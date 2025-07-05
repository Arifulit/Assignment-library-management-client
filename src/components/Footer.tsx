const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 py-10 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          {/* Logo and name */}
          <div className="text-center md:text-left">
            <h2 className="text-xl font-bold">📚 Library Management System</h2>
            <p className="text-sm text-gray-400">
              Empowering readers. One book at a time.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-x-4 text-sm">
            <a href="/" className="hover:text-yellow-400 transition">
              Home
            </a>
            <a href="/books" className="hover:text-yellow-400 transition">
              Books
            </a>
            <a href="/add-book" className="hover:text-yellow-400 transition">
              Add Book
            </a>
            <a href="/borrow" className="hover:text-yellow-400 transition">
              Borrow Summary
            </a>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-6 pt-4 text-center text-xs text-gray-500">
          &copy; {new Date().getFullYear()} Library Management System. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
