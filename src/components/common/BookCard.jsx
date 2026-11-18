import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ShoppingCart, Heart, Check } from 'lucide-react';
import BookCover from './BookCover';
import { useBookStore } from '../../context/BookStoreContext';

const BookCard = ({ book }) => {
  const navigate = useNavigate();
  const { addToCart, toggleWishlist, isInWishlist, cart } = useBookStore();

  const isWishlisted = isInWishlist(book.id);
  const isInCart = cart.some(item => item.id === book.id);

  const handleCardClick = () => {
    navigate(`/book/${book.id}`);
  };

  const handleAddToCart = (e) => {
    e.stopPropagation();
    addToCart(book, 1);
  };

  const handleWishlistToggle = (e) => {
    e.stopPropagation();
    toggleWishlist(book.id);
  };

  return (
    <div
      onClick={handleCardClick}
      className="group relative flex bg-[#16181e] hover:bg-[#1d2028] border border-[#2a2e39] hover:border-[#3b4252] rounded-lg p-3 cursor-pointer transition-all duration-200 shadow-md hover:shadow-xl overflow-hidden"
    >
      {/* Wishlist Button in Top Right */}
      <button
        onClick={handleWishlistToggle}
        title={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
        className="absolute top-2 right-2 z-20 p-1.5 rounded-full bg-black/40 hover:bg-black/70 text-zinc-400 hover:text-red-400 transition-colors"
      >
        <Heart
          size={14}
          className={isWishlisted ? 'fill-red-500 text-red-500' : ''}
        />
      </button>

      {/* Book Cover Thumbnail */}
      <div className="flex-shrink-0 mr-3">
        <BookCover book={book} size="md" />
      </div>

      {/* Book Details */}
      <div className="flex flex-col justify-between flex-grow min-w-0 pr-4">
        <div>
          <h4 className="text-white text-sm font-semibold truncate group-hover:text-blue-400 transition-colors">
            {book.title}
          </h4>
          <p className="text-zinc-400 text-xs mt-0.5 truncate">
            by <span className="text-zinc-300 font-medium">{book.author}</span>
          </p>

          <p className="text-zinc-400 text-[11px] mt-1 line-clamp-2 leading-relaxed">
            {book.description}
          </p>
        </div>

        <div className="mt-2 space-y-1">
          <div className="flex items-center space-x-2 text-[10px]">
            <span className="text-zinc-300 font-medium">{book.format}</span>
          </div>

          <div className="text-[10px] text-zinc-500 truncate">
            {book.genreTags?.join(', ')}
          </div>

          {/* Price & Delivery */}
          <div className="pt-1 flex items-baseline justify-between">
            <div>
              <span className="text-white font-bold text-sm">
                ₹{book.price}
              </span>
              {book.originalPrice && book.originalPrice > book.price && (
                <span className="text-zinc-500 text-xs line-through ml-1.5">
                  ₹{book.originalPrice}
                </span>
              )}
            </div>
          </div>

          <div className="text-[10px] text-zinc-400">
            {book.deliveryDate}
          </div>

          {/* Add to Basket Action */}
          <div className="pt-2">
            <button
              onClick={handleAddToCart}
              className={`w-full py-1 px-2.5 rounded text-xs font-medium flex items-center justify-center space-x-1.5 transition-colors ${
                isInCart
                  ? 'bg-emerald-600/20 text-emerald-400 border border-emerald-500/30 hover:bg-emerald-600/30'
                  : 'bg-blue-600 hover:bg-blue-500 text-white shadow-sm'
              }`}
            >
              {isInCart ? (
                <>
                  <Check size={12} />
                  <span>In Basket ({cart.find(c => c.id === book.id)?.quantity})</span>
                </>
              ) : (
                <>
                  <ShoppingCart size={12} />
                  <span>Add to Basket</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookCard;
