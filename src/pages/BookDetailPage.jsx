import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, Bookmark, Heart, Star, Check, Globe, TrendingUp, ShieldCheck, ArrowLeft, Send } from 'lucide-react';
import BookCover from '../components/common/BookCover';
import RatingStars from '../components/common/RatingStars';
import { WRITERS_DATA } from '../data/writersData';
import { useBookStore } from '../context/BookStoreContext';

const BookDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const {
    books,
    addToCart,
    toggleWishlist,
    isInWishlist,
    cart,
    addReview
  } = useBookStore();

  const book = books.find((b) => b.id === id) || books[0];
  const writer = WRITERS_DATA.find((w) => w.id === book.writerId) || WRITERS_DATA[0];

  // Related Reads (Cross-sell / Up-sell)
  const relatedReads = books.filter((b) => b.id !== book.id).slice(0, 3);

  const isWishlisted = isInWishlist(book.id);
  const cartItem = cart.find((c) => c.id === book.id);

  // Review Form state
  const [reviewText, setReviewText] = useState('');
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewSubmitted, setReviewSubmitted] = useState(false);

  const handleReviewSubmit = (e) => {
    e.preventDefault();
    if (!reviewText.trim()) return;

    addReview(book.id, {
      rating: reviewRating,
      comment: reviewText.trim()
    });

    setReviewText('');
    setReviewSubmitted(true);
    setTimeout(() => setReviewSubmitted(false), 3000);
  };

  return (
    <div className="max-w-[1500px] w-full mx-auto px-4 lg:px-6 py-4">
      
      {/* Breadcrumbs (Matches Image 5: Home / Non-Fiction / Self Help) */}
      <nav className="flex items-center space-x-2 text-xs text-zinc-400 mb-6">
        <Link to="/" className="hover:text-white transition-colors">Home</Link>
        <span>/</span>
        <span className="text-zinc-300">{book.genreTags?.[0] || 'Catalog'}</span>
        <span>/</span>
        <span className="text-blue-400 font-medium">{book.category}</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Main Book Detail Section (Left 8-9 cols) */}
        <div className="lg:col-span-8 space-y-8">
          
          {/* Top Hero: Cover + Main Meta Block */}
          <div className="bg-[#191c24] border border-[#282d3b] rounded-xl p-6 shadow-xl flex flex-col md:flex-row gap-6">
            
            {/* Large Cover */}
            <div className="shrink-0 flex justify-center md:justify-start">
              <BookCover book={book} size="xl" className="shadow-2xl" />
            </div>

            {/* Book Specs & CTA */}
            <div className="flex-1 flex flex-col justify-between">
              <div>
                <h1 className="text-xl md:text-2xl font-bold text-white leading-tight">
                  {book.title}
                </h1>
                <p className="text-sm text-zinc-400 mt-1">
                  by <Link to={`/writers#${writer.id}`} className="text-blue-400 hover:underline font-medium">{book.author}</Link>
                </p>

                <p className="text-xs text-zinc-300 mt-3 leading-relaxed">
                  {book.description}
                </p>

                <div className="mt-4 pt-3 border-t border-[#292e3d] space-y-1 text-xs">
                  <p className="text-zinc-400">
                    Published by: <span className="text-blue-400 font-medium">{book.publisher}</span>
                  </p>
                  <p className="text-zinc-300 font-medium">{book.format}</p>
                  <p className="text-zinc-400 text-[11px]">{book.genreTags?.join(', ')}</p>
                </div>
              </div>

              {/* Price & Actions */}
              <div className="mt-6 pt-4 border-t border-[#292e3d]">
                <div className="flex items-baseline space-x-3 mb-1">
                  <span className="text-2xl font-extrabold text-white">
                    ₹{book.price}
                  </span>
                  {book.originalPrice && book.originalPrice > book.price && (
                    <span className="text-zinc-500 text-sm line-through">
                      ₹{book.originalPrice}
                    </span>
                  )}
                </div>

                <p className="text-xs text-zinc-400 mb-4">
                  {book.deliveryDate}
                </p>

                {/* Buttons (Matches Image 5: Add to Cart & Add to Wishlist) */}
                <div className="flex flex-wrap items-center gap-3">
                  <button
                    onClick={() => addToCart(book, 1)}
                    className="flex-1 min-w-[140px] py-2.5 px-4 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-md text-xs shadow-md transition-colors flex items-center justify-center space-x-2"
                  >
                    <ShoppingCart size={14} />
                    <span>{cartItem ? `In Basket (${cartItem.quantity})` : 'Add to Cart'}</span>
                  </button>

                  <button
                    onClick={() => toggleWishlist(book.id)}
                    className={`py-2.5 px-4 border rounded-md text-xs font-semibold transition-colors flex items-center justify-center space-x-2 ${
                      isWishlisted
                        ? 'border-red-500/40 bg-red-500/10 text-red-400'
                        : 'border-[#333a4c] bg-[#1f232f] hover:bg-[#282d3c] text-zinc-200'
                    }`}
                  >
                    <Bookmark size={14} className={isWishlisted ? 'fill-red-400' : ''} />
                    <span>{isWishlisted ? 'Wishlisted' : 'Add to Wishlist'}</span>
                  </button>
                </div>

                {/* Metadata Pills (Matches Image 5: Language, Rating, Sells) */}
                <div className="grid grid-cols-3 gap-2 mt-6 pt-4 border-t border-[#292e3d] text-center">
                  <div className="bg-[#12141a] p-2 rounded-lg border border-[#252a37]">
                    <span className="text-[10px] text-zinc-500 block">Language</span>
                    <span className="text-xs font-semibold text-zinc-200">{book.language}</span>
                  </div>

                  <div className="bg-[#12141a] p-2 rounded-lg border border-[#252a37]">
                    <span className="text-[10px] text-zinc-500 block">Rating</span>
                    <div className="flex items-center justify-center space-x-1 mt-0.5">
                      <Star size={11} className="text-yellow-400 fill-yellow-400" />
                      <span className="text-xs font-semibold text-zinc-200">{book.rating}</span>
                    </div>
                  </div>

                  <div className="bg-[#12141a] p-2 rounded-lg border border-[#252a37]">
                    <span className="text-[10px] text-zinc-500 block">Sells</span>
                    <span className="text-xs font-semibold text-zinc-200">{book.soldCount} copies sold</span>
                  </div>
                </div>

              </div>

            </div>

          </div>

          {/* About the Writer Section (Matches Image 5) */}
          <div className="bg-[#191c24] border border-[#282d3b] rounded-xl p-6 shadow-md">
            <h3 className="text-sm font-bold text-white mb-4">About the writer</h3>
            <div className="flex items-start space-x-4">
              <img
                src={writer.avatar}
                alt={writer.name}
                className="w-14 h-14 rounded-full object-cover border-2 border-blue-500/40 shrink-0 shadow"
              />
              <div className="space-y-1">
                <h4 className="text-sm font-bold text-white">{writer.name}</h4>
                <p className="text-[11px] text-zinc-400 leading-relaxed">
                  {writer.bio}
                </p>
              </div>
            </div>
          </div>

          {/* Reviews Section (Matches Image 5) */}
          <div className="bg-[#191c24] border border-[#282d3b] rounded-xl p-6 shadow-md space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-white">Reviews & Ratings</h3>
              <span className="text-xs text-zinc-400">
                {book.reviews?.length || 0} customer reviews
              </span>
            </div>

            {/* Leave Review Box */}
            <form onSubmit={handleReviewSubmit} className="bg-[#14161d] border border-[#2a2f3e] rounded-lg p-4 space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-xs font-medium text-zinc-300">Leave Your Review</label>
                <span className="text-[11px] text-zinc-500">{reviewText.length}/100</span>
              </div>

              <textarea
                value={reviewText}
                maxLength={100}
                onChange={(e) => setReviewText(e.target.value)}
                placeholder="Share your thoughts about this book..."
                rows={3}
                className="w-full bg-[#0f1115] border border-[#262b37] rounded-md p-2.5 text-xs text-white placeholder-zinc-600 focus:outline-none focus:border-blue-500 resize-none"
              />

              <div className="flex items-center justify-between pt-1">
                <div className="flex items-center space-x-2">
                  <span className="text-[11px] text-zinc-400">Your Rating:</span>
                  <RatingStars
                    rating={reviewRating}
                    interactive={true}
                    onChange={(r) => setReviewRating(r)}
                  />
                </div>

                <button
                  type="submit"
                  disabled={!reviewText.trim()}
                  className="py-1.5 px-4 bg-blue-600 hover:bg-blue-500 disabled:opacity-40 text-white font-medium rounded text-xs transition-colors flex items-center space-x-1"
                >
                  <span>Submit</span>
                  <Send size={12} />
                </button>
              </div>

              {reviewSubmitted && (
                <p className="text-emerald-400 text-xs font-medium flex items-center space-x-1">
                  <Check size={12} />
                  <span>Thank you! Your review has been posted.</span>
                </p>
              )}
            </form>

            {/* User Reviews List */}
            <div className="space-y-4 pt-2">
              {book.reviews && book.reviews.length > 0 ? (
                book.reviews.map((rev) => (
                  <div
                    key={rev.id}
                    className="p-4 bg-[#14161d] border border-[#262b37] rounded-lg space-y-2 text-xs"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2.5">
                        <div className="w-6 h-6 rounded-full bg-blue-700/40 text-blue-300 flex items-center justify-center font-bold text-[10px]">
                          {rev.user[0]}
                        </div>
                        <span className="font-semibold text-white">{rev.user}</span>
                      </div>
                      <span className="text-[10px] text-zinc-500">{rev.date}</span>
                    </div>

                    <RatingStars rating={rev.rating} size={12} />

                    <p className="text-zinc-300 text-xs leading-relaxed">
                      {rev.comment}
                    </p>
                  </div>
                ))
              ) : (
                <p className="text-xs text-zinc-500 text-center py-4">No reviews yet. Be the first to review!</p>
              )}
            </div>

          </div>

        </div>

        {/* Right Sidebar: Related Reads (Matches Image 5) */}
        <div className="lg:col-span-4 space-y-4">
          <div className="bg-[#191c24] border border-[#282d3b] rounded-xl p-4 shadow-md sticky top-20">
            <h3 className="text-xs font-bold text-white uppercase tracking-wider mb-4 pb-2 border-b border-[#282d3b]">
              Related Reads
            </h3>

            <div className="space-y-4">
              {relatedReads.map((related) => (
                <div
                  key={related.id}
                  onClick={() => navigate(`/book/${related.id}`)}
                  className="group bg-[#14161d] hover:bg-[#1e222d] border border-[#262a36] hover:border-[#384052] rounded-lg p-3 flex space-x-3 cursor-pointer transition-all shadow-sm"
                >
                  <div className="shrink-0">
                    <BookCover book={related} size="sm" />
                  </div>

                  <div className="min-w-0 flex-1 flex flex-col justify-between">
                    <div>
                      <h4 className="text-xs font-semibold text-white group-hover:text-blue-400 transition-colors truncate">
                        {related.title}
                      </h4>
                      <p className="text-[11px] text-zinc-400 truncate">
                        by {related.author}
                      </p>
                      <p className="text-[10px] text-zinc-500 mt-1">
                        {related.format} • {related.category}
                      </p>
                    </div>

                    <div className="mt-2 pt-1 border-t border-[#252936] flex items-center justify-between">
                      <span className="text-white font-bold text-xs">
                        ₹{related.price}
                      </span>
                      <span className="text-[10px] text-zinc-400">
                        {related.deliveryDate}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 pt-4 border-t border-[#282d3b] text-center">
              <Link
                to="/"
                className="text-xs text-blue-400 hover:text-blue-300 font-medium hover:underline"
              >
                Explore Full Bookstore Catalog →
              </Link>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
};

export default BookDetailPage;
