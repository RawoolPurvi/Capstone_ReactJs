import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingCart, Trash2, ArrowRight } from 'lucide-react';
import BookCover from '../components/common/BookCover';
import { useBookStore } from '../context/BookStoreContext';

const WishlistPage = () => {
  const { wishlist, books, toggleWishlist, addToCart } = useBookStore();

  const wishlistedBooks = books.filter((b) => wishlist.includes(b.id));

  return (
    <div className="max-w-[1500px] w-full mx-auto px-4 lg:px-6 py-6">
      
      {/* Breadcrumbs */}
      <nav className="flex items-center space-x-2 text-xs text-zinc-400 mb-6">
        <Link to="/" className="hover:text-white transition-colors">Home</Link>
        <span>/</span>
        <span className="text-blue-400 font-medium">My Wishlist</span>
      </nav>

      <div className="flex items-center justify-between pb-4 mb-6 border-b border-[#282d3b]">
        <div>
          <h1 className="text-xl font-bold text-white">My Wishlist</h1>
          <p className="text-xs text-zinc-400 mt-0.5">
            {wishlistedBooks.length} books saved for future reading
          </p>
        </div>
      </div>

      {wishlistedBooks.length === 0 ? (
        <div className="p-12 text-center bg-[#171922] border border-[#282d3b] rounded-xl">
          <Heart size={44} className="mx-auto text-zinc-600 mb-3" />
          <h3 className="text-base font-semibold text-white">Your wishlist is empty</h3>
          <p className="text-xs text-zinc-400 mt-1 mb-4">Save books you love to purchase later or track price updates.</p>
          <Link
            to="/"
            className="px-5 py-2 bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold rounded-md shadow inline-block"
          >
            Browse Books
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {wishlistedBooks.map((book) => (
            <div
              key={book.id}
              className="bg-[#181a23] border border-[#282d3b] rounded-xl p-4 flex flex-col justify-between shadow-lg"
            >
              <div className="flex space-x-4">
                <div className="shrink-0">
                  <BookCover book={book} size="md" />
                </div>
                <div className="min-w-0 flex-1">
                  <Link
                    to={`/book/${book.id}`}
                    className="text-sm font-bold text-white hover:text-blue-400 transition-colors line-clamp-1"
                  >
                    {book.title}
                  </Link>
                  <p className="text-xs text-zinc-400 mt-0.5">by {book.author}</p>
                  <p className="text-[11px] text-zinc-500 mt-1 line-clamp-2">{book.description}</p>
                  <p className="text-sm font-bold text-white mt-2">₹{book.price}</p>
                  <p className="text-[10px] text-zinc-400">{book.deliveryDate}</p>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-[#262a37] flex items-center space-x-2">
                <button
                  onClick={() => addToCart(book, 1)}
                  className="flex-1 py-2 px-3 bg-blue-600 hover:bg-blue-500 text-white font-medium text-xs rounded-md shadow transition-colors flex items-center justify-center space-x-1.5"
                >
                  <ShoppingCart size={13} />
                  <span>Move to Basket</span>
                </button>

                <button
                  onClick={() => toggleWishlist(book.id)}
                  className="p-2 text-zinc-500 hover:text-red-400 hover:bg-red-500/10 rounded-md border border-zinc-700/60 transition-colors"
                  title="Remove from wishlist"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

    </div>
  );
};

export default WishlistPage;
