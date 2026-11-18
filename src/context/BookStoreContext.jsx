import React, { createContext, useContext, useState, useEffect } from 'react';
import { BOOKS_DATA } from '../data/booksData';
import { INITIAL_ORDERS } from '../data/mockOrders';

const BookStoreContext = createContext();

export const useBookStore = () => {
  const context = useContext(BookStoreContext);
  if (!context) {
    throw new Error('useBookStore must be used within a BookStoreProvider');
  }
  return context;
};

export const BookStoreProvider = ({ children }) => {
  // Books Catalog
  const [books, setBooks] = useState(BOOKS_DATA);

  // User & Auth State
  const [user, setUser] = useState({
    id: 'usr-101',
    name: 'Purvi Rawool',
    email: 'purvi.rawool@example.com',
    phone: '+91 9876543210',
    isLoggedIn: true,
    role: 'Member', // 'Member' or 'Guest'
    giftPoints: 350,
    savedAddress: {
      firstName: 'Aditi',
      lastName: 'Sharma',
      email: 'purvi.rawool@example.com',
      phone: '+91 9876543210',
      addressLine: 'Flat 402, Green Glen Layout, Bellandur',
      city: 'Bengaluru',
      state: 'Karnataka',
      pin: '560103',
      country: 'India',
    }
  });

  // Cart State (Initialized with 2 items to match Image 6)
  const [cart, setCart] = useState([
    {
      id: 'joy-of-minimalism',
      book: BOOKS_DATA.find(b => b.id === 'joy-of-minimalism'),
      quantity: 1,
    },
    {
      id: 'the-path-to-success',
      book: BOOKS_DATA.find(b => b.id === 'the-path-to-success'),
      quantity: 1,
    }
  ]);

  // Wishlist State
  const [wishlist, setWishlist] = useState(['the-art-of-focus']);

  // Orders State
  const [orders, setOrders] = useState(INITIAL_ORDERS);

  // Filter & Search State
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedLanguage, setSelectedLanguage] = useState('All');
  const [selectedFormat, setSelectedFormat] = useState('All');
  const [selectedPriceRange, setSelectedPriceRange] = useState('All');
  const [sortBy, setSortBy] = useState('Relevance');

  // Checkout & Coupon State
  const [appliedCoupon, setAppliedCoupon] = useState({ code: 'BOOK100', discount: 100 });
  const [redeemedPoints, setRedeemedPoints] = useState(0);

  // Modals
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [lastCompletedOrder, setLastCompletedOrder] = useState(null);

  // Cart helpers
  const addToCart = (book, quantity = 1) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === book.id);
      if (existing) {
        return prev.map(item =>
          item.id === book.id ? { ...item, quantity: item.quantity + quantity } : item
        );
      }
      return [...prev, { id: book.id, book, quantity }];
    });
  };

  const removeFromCart = (bookId) => {
    setCart(prev => prev.filter(item => item.id !== bookId));
  };

  const updateQuantity = (bookId, newQty) => {
    if (newQty <= 0) {
      removeFromCart(bookId);
      return;
    }
    setCart(prev =>
      prev.map(item => (item.id === bookId ? { ...item, quantity: newQty } : item))
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  // Wishlist helpers
  const toggleWishlist = (bookId) => {
    setWishlist(prev =>
      prev.includes(bookId) ? prev.filter(id => id !== bookId) : [...prev, bookId]
    );
  };

  const isInWishlist = (bookId) => wishlist.includes(bookId);

  // Price calculations
  const cartSubtotal = cart.reduce((sum, item) => sum + (item.book?.price || 0) * item.quantity, 0);
  const cartItemCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const taxAmount = Math.round(cartSubtotal * 0.12);
  const discountAmount = appliedCoupon ? appliedCoupon.discount : 0;
  const giftPointsDiscount = redeemedPoints;
  const deliveryCharge = cartSubtotal > 300 || cartSubtotal === 0 ? 0 : 40;
  const grandTotal = Math.max(0, cartSubtotal + taxAmount + deliveryCharge - discountAmount - giftPointsDiscount);

  // Coupon handling
  const applyCouponCode = (code) => {
    const cleanCode = code.trim().toUpperCase();
    if (cleanCode === 'BOOK100') {
      setAppliedCoupon({ code: 'BOOK100', discount: 100, label: '₹100 Off Festive Offer' });
      return { success: true, message: 'Coupon BOOK100 applied successfully! ₹100 Saved' };
    } else if (cleanCode === 'READ20') {
      const discount = Math.round(cartSubtotal * 0.2);
      setAppliedCoupon({ code: 'READ20', discount, label: '20% Book Worm Special' });
      return { success: true, message: `Coupon READ20 applied! ₹${discount} Saved` };
    } else if (cleanCode === 'WELCOME50') {
      setAppliedCoupon({ code: 'WELCOME50', discount: 50, label: '₹50 New Reader Bonus' });
      return { success: true, message: 'Coupon WELCOME50 applied! ₹50 Saved' };
    } else {
      return { success: false, message: 'Invalid coupon code. Try BOOK100 or READ20' };
    }
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
  };

  const redeemGiftPoints = (pointsToRedeem) => {
    if (pointsToRedeem <= user.giftPoints) {
      setRedeemedPoints(pointsToRedeem);
      return { success: true, message: `Redeemed ${pointsToRedeem} points (₹${pointsToRedeem} off)!` };
    }
    return { success: false, message: 'Insufficient gift points balance' };
  };

  // Orders & Purchase flow
  const placeOrder = (orderDetails) => {
    const newOrder = {
      id: `ORD-${Math.floor(1000 + Math.random() * 9000)}-BW`,
      placedAt: new Date().toISOString(),
      status: 'Confirmed',
      deliveryDate: 'Delivery by Mon, 21 Jul',
      items: [...cart.map(c => ({
        id: c.book.id,
        title: c.book.title,
        author: c.book.author,
        price: c.book.price,
        quantity: c.quantity,
        format: c.book.format,
        coverStyle: c.book.coverStyle
      }))],
      address: orderDetails.address,
      paymentMethod: orderDetails.paymentMethod,
      subtotal: cartSubtotal,
      tax: taxAmount,
      discount: discountAmount + giftPointsDiscount,
      total: grandTotal,
      canCancelUntil: new Date(Date.now() + 48 * 60 * 60 * 1000).toISOString()
    };

    setOrders(prev => [newOrder, ...prev]);
    setLastCompletedOrder(newOrder);
    clearCart();
    setIsPaymentModalOpen(false);
    setIsSuccessModalOpen(true);
    return newOrder;
  };

  const cancelOrder = (orderId) => {
    const targetOrder = orders.find(o => o.id === orderId);
    if (!targetOrder) return { success: false, message: 'Order not found' };

    const orderTime = new Date(targetOrder.placedAt).getTime();
    const hoursElapsed = (Date.now() - orderTime) / (1000 * 60 * 60);

    if (hoursElapsed > 48) {
      return { success: false, message: 'Cannot cancel order. The 48-hour cancellation window has expired.' };
    }

    setOrders(prev =>
      prev.map(o => (o.id === orderId ? { ...o, status: 'Cancelled' } : o))
    );
    return { success: true, message: 'Order cancelled successfully. Refund initiated to original payment method.' };
  };

  const buyAgain = (orderItems) => {
    orderItems.forEach(item => {
      const book = books.find(b => b.id === item.id);
      if (book) {
        addToCart(book, item.quantity || 1);
      }
    });
  };

  // Reviews
  const addReview = (bookId, newReview) => {
    setBooks(prev =>
      prev.map(book => {
        if (book.id === bookId) {
          const updatedReviews = [
            {
              id: Date.now(),
              user: user.name || 'Anonymous Reader',
              avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=120&q=80',
              rating: newReview.rating,
              date: 'Just now',
              comment: newReview.comment
            },
            ...(book.reviews || [])
          ];
          return {
            ...book,
            reviews: updatedReviews,
            ratingCount: (book.ratingCount || 0) + 1
          };
        }
        return book;
      })
    );
  };

  // User management
  const loginUser = (credentials) => {
    setUser({
      id: 'usr-101',
      name: credentials.name || 'Purvi Rawool',
      email: credentials.email || 'purvi.rawool@example.com',
      phone: credentials.phone || '+91 9876543210',
      isLoggedIn: true,
      role: 'Member',
      giftPoints: 350,
      savedAddress: {
        firstName: credentials.name?.split(' ')[0] || 'Aditi',
        lastName: credentials.name?.split(' ')[1] || 'Sharma',
        email: credentials.email || 'purvi.rawool@example.com',
        phone: credentials.phone || '+91 9876543210',
        addressLine: 'Flat 402, Green Glen Layout, Bellandur',
        city: 'Bengaluru',
        state: 'Karnataka',
        pin: '560103',
        country: 'India',
      }
    });
    setIsAuthModalOpen(false);
  };

  const loginAsGuest = () => {
    setUser({
      id: 'guest-' + Date.now(),
      name: 'Guest Reader',
      email: '',
      phone: '',
      isLoggedIn: false,
      role: 'Guest',
      giftPoints: 0,
      savedAddress: null
    });
    setIsAuthModalOpen(false);
  };

  const logoutUser = () => {
    setUser({
      id: 'guest-' + Date.now(),
      name: 'Guest Reader',
      email: '',
      phone: '',
      isLoggedIn: false,
      role: 'Guest',
      giftPoints: 0,
      savedAddress: null
    });
  };

  return (
    <BookStoreContext.Provider
      value={{
        books,
        user,
        cart,
        wishlist,
        orders,
        searchQuery,
        setSearchQuery,
        selectedCategory,
        setSelectedCategory,
        selectedLanguage,
        setSelectedLanguage,
        selectedFormat,
        setSelectedFormat,
        selectedPriceRange,
        setSelectedPriceRange,
        sortBy,
        setSortBy,
        appliedCoupon,
        redeemedPoints,
        cartSubtotal,
        cartItemCount,
        taxAmount,
        discountAmount,
        deliveryCharge,
        grandTotal,
        isAuthModalOpen,
        setIsAuthModalOpen,
        isPaymentModalOpen,
        setIsPaymentModalOpen,
        isSuccessModalOpen,
        setIsSuccessModalOpen,
        lastCompletedOrder,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        toggleWishlist,
        isInWishlist,
        applyCouponCode,
        removeCoupon,
        redeemGiftPoints,
        placeOrder,
        cancelOrder,
        buyAgain,
        addReview,
        loginUser,
        loginAsGuest,
        logoutUser,
      }}
    >
      {children}
    </BookStoreContext.Provider>
  );
};
