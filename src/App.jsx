import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import HomePage from './pages/HomePage';
import BookDetailPage from './pages/BookDetailPage';
import CartCheckoutPage from './pages/CartCheckoutPage';
import OrdersPage from './pages/OrdersPage';
import WishlistPage from './pages/WishlistPage';
import WritersPage from './pages/WritersPage';
import AuthModal from './components/modals/AuthModal';
import { BookStoreProvider } from './context/BookStoreContext';

function App() {
  return (
    <BookStoreProvider>
      <Router>
        <div className="min-h-screen flex flex-col bg-[#121316] text-white">
          <Navbar />
          <div className="flex-1 flex flex-col">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/book/:id" element={<BookDetailPage />} />
              <Route path="/checkout" element={<CartCheckoutPage />} />
              <Route path="/cart" element={<CartCheckoutPage />} />
              <Route path="/orders" element={<OrdersPage />} />
              <Route path="/wishlist" element={<WishlistPage />} />
              <Route path="/writers" element={<WritersPage />} />
            </Routes>
          </div>
          <Footer />
          <AuthModal />
        </div>
      </Router>
    </BookStoreProvider>
  );
}

export default App;
