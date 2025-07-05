
import { Route, Routes } from 'react-router-dom'
import './App.css'
import AllBooks from './home/books/AllBooks'
import AddBook from './home/books/AddBook'
import BorrowSummary from './home/borrows/BorrowSummary'
import EditBook from './home/books/EditBook'
import BorrowPage from './home/borrows/BorrowPage'
import Home from './home/Home/Home'
import FeatureSection from './home/Home/FeatureSection'
import BookDetails from './home/books/BookDetails'


function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/" element={<FeatureSection />} />
        <Route path="/books" element={<AllBooks />} />
        <Route path="/add-book" element={<AddBook />} />
        <Route path="/borrow" element={<BorrowSummary />} />
        <Route path="/edit-book/:id" element={<EditBook />} />
        <Route path="/borrow/:bookId" element={<BorrowPage />} />
        <Route path="/book-details/:id" element={<BookDetails />} />

      </Routes>
    </>
  )
}

export default App
