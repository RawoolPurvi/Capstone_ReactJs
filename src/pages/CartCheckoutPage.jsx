import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Trash2, Plus, Minus, Tag, ShieldCheck, ArrowRight, BookOpen, Check, Gift } from 'lucide-react';
import BookCover from '../components/common/BookCover';
import PaymentModal from '../components/modals/PaymentModal';
import ConfirmationModal from '../components/modals/ConfirmationModal';
import { useBookStore } from '../context/BookStoreContext';

const CartCheckoutPage = () => {
  const navigate = useNavigate();
  const {
    cart,
    cartSubtotal,
    cartItemCount,
    taxAmount,
    discountAmount,
    deliveryCharge,
    grandTotal,
    appliedCoupon,
    applyCouponCode,
    removeCoupon,
    redeemGiftPoints,
    redeemedPoints,
    updateQuantity,
    removeFromCart,
    user,
    setIsPaymentModalOpen,
  } = useBookStore();

  const [useSavedAddress, setUseSavedAddress] = useState(true);
  const [couponInput, setCouponInput] = useState(appliedCoupon ? appliedCoupon.code : 'BOOK100');
  const [couponMessage, setCouponMessage] = useState(null);
  const [pointsInput, setPointsInput] = useState('');
  const [pointsMessage, setPointsMessage] = useState(null);

  // Address form fields
  const [addressForm, setAddressForm] = useState({
    firstName: user.savedAddress?.firstName || 'Aditi',
    lastName: user.savedAddress?.lastName || 'Sharma',
    addressLine: user.savedAddress?.addressLine || 'Flat 402, Green Glen Layout, Bellandur',
    email: user.savedAddress?.email || 'purvi.rawool@example.com',
    city: user.savedAddress?.city || 'Bengaluru',
    pin: user.savedAddress?.pin || '560103',
    phone: user.savedAddress?.phone || '9876543210',
    state: user.savedAddress?.state || 'Karnataka',
    country: user.savedAddress?.country || 'India',
  });

  useEffect(() => {
    if (useSavedAddress && user.savedAddress) {
      setAddressForm({
        firstName: user.savedAddress.firstName || '',
        lastName: user.savedAddress.lastName || '',
        addressLine: user.savedAddress.addressLine || '',
        email: user.savedAddress.email || '',
        city: user.savedAddress.city || '',
        pin: user.savedAddress.pin || '',
        phone: user.savedAddress.phone || '',
        state: user.savedAddress.state || '',
        country: user.savedAddress.country || 'India',
      });
    }
  }, [useSavedAddress, user.savedAddress]);

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    if (!couponInput.trim()) return;
    const res = applyCouponCode(couponInput);
    setCouponMessage(res);
  };

  const handleRedeemPoints = (e) => {
    e.preventDefault();
    const pts = parseInt(pointsInput, 10);
    if (isNaN(pts) || pts <= 0) return;
    const res = redeemGiftPoints(pts);
    setPointsMessage(res);
    setPointsInput('');
  };

  const handlePayNow = () => {
    if (cart.length === 0) return;
    setIsPaymentModalOpen(true);
  };

  return (
    <div className="max-w-[1500px] w-full mx-auto px-4 lg:px-6 py-4">
      
      {/* Breadcrumbs matching Image 6 */}
      <nav className="flex items-center space-x-2 text-xs text-zinc-400 mb-6 flex-wrap">
        <Link to="/" className="hover:text-white transition-colors">Home</Link>
        <span>/</span>
        <span>Non-Fiction</span>
        <span>/</span>
        <span>Self Help</span>
        <span>/</span>
        <span className="text-zinc-300">Joy of Minimalism</span>
        <span>/</span>
        <span className="text-blue-400 font-medium">Checkout</span>
      </nav>

      <h1 className="text-lg md:text-xl font-bold text-white mb-6">
        Shopping Cart & Delivery Details
      </h1>

      {cart.length === 0 ? (
        <div className="bg-[#191c24] border border-[#282d3b] rounded-xl p-12 text-center shadow-lg my-8">
          <BookOpen size={48} className="mx-auto text-zinc-600 mb-4" />
          <h2 className="text-lg font-bold text-white mb-2">Your basket is currently empty</h2>
          <p className="text-xs text-zinc-400 mb-6">Explore our curated bookstore catalog and discover your next great read.</p>
          <Link
            to="/"
            className="inline-flex items-center space-x-2 px-6 py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-medium rounded-md text-xs shadow-md transition-colors"
          >
            <span>Browse Books</span>
            <ArrowRight size={14} />
          </Link>
        </div>
      ) : (
        <div className="space-y-6">
          
          {/* Top Cart Items Summary Bar (Matches Image 6 layout) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {cart.map((item) => (
              <div
                key={item.id}
                className="bg-[#191c24] border border-[#282d3b] rounded-xl p-4 flex items-center space-x-4 shadow-md"
              >
                <div className="shrink-0">
                  <BookCover book={item.book} size="md" />
                </div>

                <div className="flex-1 min-w-0 flex flex-col justify-between py-1">
                  <div>
                    <h3 className="text-sm font-bold text-white truncate">
                      {item.book.title}
                    </h3>
                    <p className="text-xs text-zinc-400 truncate">
                      by <span className="text-zinc-300">{item.book.author}</span>
                    </p>
                    <p className="text-[11px] text-zinc-400 mt-1 line-clamp-1">
                      {item.book.description}
                    </p>
                    <span className="inline-block mt-1 text-[10px] text-zinc-400 bg-[#12141a] px-2 py-0.5 rounded border border-[#252936]">
                      {item.book.format || 'Paperback'}
                    </span>
                  </div>

                  <div className="mt-3 pt-2 border-t border-[#272c3a] flex items-center justify-between">
                    <div>
                      <span className="text-white font-bold text-sm">
                        ₹{item.book.price}
                      </span>
                      <p className="text-[10px] text-zinc-400">{item.book.deliveryDate}</p>
                    </div>

                    {/* Quantity Selector `1 - +` (Matches Image 6) */}
                    <div className="flex items-center space-x-2">
                      <div className="flex items-center bg-[#111318] border border-[#2d3344] rounded-md px-1.5 py-1 space-x-2">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="p-1 text-zinc-400 hover:text-white"
                          title="Decrease quantity"
                        >
                          <Minus size={12} />
                        </button>
                        <span className="text-xs font-semibold text-white px-1">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="p-1 text-zinc-400 hover:text-white"
                          title="Increase quantity"
                        >
                          <Plus size={12} />
                        </button>
                      </div>

                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="p-1.5 text-zinc-500 hover:text-red-400 transition-colors"
                        title="Remove item"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom Grid: Left Address Form + Right Grand Total Summary */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            
            {/* Left Column: Address Form (Matches Image 6) */}
            <div className="lg:col-span-7 bg-[#191c24] border border-[#282d3b] rounded-xl p-6 shadow-md space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-[#282d3b]">
                <h3 className="text-sm font-bold text-white">Address</h3>
                <label className="flex items-center space-x-2 cursor-pointer text-xs text-zinc-300">
                  <input
                    type="checkbox"
                    checked={useSavedAddress}
                    onChange={(e) => setUseSavedAddress(e.target.checked)}
                    className="rounded bg-[#12141a] border-zinc-600 text-blue-600 focus:ring-blue-500"
                  />
                  <span>Use Saved Address</span>
                </label>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-medium text-zinc-400 mb-1">First Name</label>
                  <input
                    type="text"
                    value={addressForm.firstName}
                    onChange={(e) => setAddressForm({ ...addressForm, firstName: e.target.value })}
                    placeholder="First Name"
                    className="w-full bg-[#111317] border border-[#2a2f3f] rounded-md py-2 px-3 text-xs text-white placeholder-zinc-600 focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-medium text-zinc-400 mb-1">Last Name</label>
                  <input
                    type="text"
                    value={addressForm.lastName}
                    onChange={(e) => setAddressForm({ ...addressForm, lastName: e.target.value })}
                    placeholder="Last Name"
                    className="w-full bg-[#111317] border border-[#2a2f3f] rounded-md py-2 px-3 text-xs text-white placeholder-zinc-600 focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-medium text-zinc-400 mb-1">Address / Street</label>
                <input
                  type="text"
                  value={addressForm.addressLine}
                  onChange={(e) => setAddressForm({ ...addressForm, addressLine: e.target.value })}
                  placeholder="Address Line 2"
                  className="w-full bg-[#111317] border border-[#2a2f3f] rounded-md py-2 px-3 text-xs text-white placeholder-zinc-600 focus:outline-none focus:border-blue-500"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-medium text-zinc-400 mb-1">e-mail</label>
                  <input
                    type="email"
                    value={addressForm.email}
                    onChange={(e) => setAddressForm({ ...addressForm, email: e.target.value })}
                    placeholder="e-mail"
                    className="w-full bg-[#111317] border border-[#2a2f3f] rounded-md py-2 px-3 text-xs text-white placeholder-zinc-600 focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-medium text-zinc-400 mb-1">City</label>
                  <input
                    type="text"
                    value={addressForm.city}
                    onChange={(e) => setAddressForm({ ...addressForm, city: e.target.value })}
                    placeholder="City"
                    className="w-full bg-[#111317] border border-[#2a2f3f] rounded-md py-2 px-3 text-xs text-white placeholder-zinc-600 focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-[11px] font-medium text-zinc-400 mb-1">Phone Number</label>
                  <div className="flex">
                    <span className="inline-flex items-center px-2.5 rounded-l-md border border-r-0 border-[#2a2f3f] bg-[#1a1d26] text-zinc-400 text-xs">
                      +91
                    </span>
                    <input
                      type="text"
                      value={addressForm.phone}
                      onChange={(e) => setAddressForm({ ...addressForm, phone: e.target.value })}
                      placeholder="1234567890"
                      className="w-full bg-[#111317] border border-[#2a2f3f] rounded-r-md py-2 px-3 text-xs text-white placeholder-zinc-600 focus:outline-none focus:border-blue-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-medium text-zinc-400 mb-1">Pin (Postal Code)</label>
                  <input
                    type="text"
                    value={addressForm.pin}
                    onChange={(e) => setAddressForm({ ...addressForm, pin: e.target.value })}
                    placeholder="000000"
                    className="w-full bg-[#111317] border border-[#2a2f3f] rounded-md py-2 px-3 text-xs text-white placeholder-zinc-600 focus:outline-none focus:border-blue-500 font-mono"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-medium text-zinc-400 mb-1">State / Country</label>
                  <select
                    value={addressForm.country}
                    onChange={(e) => setAddressForm({ ...addressForm, country: e.target.value })}
                    className="w-full bg-[#111317] border border-[#2a2f3f] rounded-md py-2 px-2 text-xs text-white focus:outline-none focus:border-blue-500"
                  >
                    <option value="India">India</option>
                    <option value="USA">United States</option>
                    <option value="UK">United Kingdom</option>
                    <option value="Canada">Canada</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Right Column: Grand Total & Coupon (Matches Image 6) */}
            <div className="lg:col-span-5 bg-[#191c24] border border-[#282d3b] rounded-xl p-6 shadow-md flex flex-col justify-between">
              
              {/* Graphic Banner */}
              <div className="relative rounded-lg overflow-hidden bg-gradient-to-r from-blue-900/40 via-indigo-900/30 to-purple-900/40 border border-blue-500/20 p-3 mb-4 flex items-center justify-between">
                <div className="space-y-0.5">
                  <span className="text-[10px] text-blue-400 font-semibold tracking-wider uppercase">Member Benefits</span>
                  <p className="text-xs font-bold text-white">Free express delivery applied</p>
                </div>
                <BookOpen size={28} className="text-blue-400 opacity-80" />
              </div>

              <div>
                <h3 className="text-sm font-bold text-white mb-4 pb-2 border-b border-[#282d3b]">
                  Grand Total
                </h3>

                {/* Price Breakdown */}
                <div className="space-y-2.5 text-xs text-zinc-300">
                  <div className="flex justify-between">
                    <span className="text-zinc-400">Price ({cartItemCount} items)</span>
                    <span className="text-white font-medium">₹{cartSubtotal}.00</span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-zinc-400">Tax (GST)</span>
                    <span className="text-white font-medium">₹{taxAmount}.00</span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-zinc-400">Delivery Charges</span>
                    <span className="text-emerald-400 font-medium">
                      {deliveryCharge === 0 ? 'Free' : `₹${deliveryCharge}.00`}
                    </span>
                  </div>

                  {/* Apply Coupon Input & Button */}
                  <form onSubmit={handleApplyCoupon} className="pt-3 pb-1">
                    <div className="flex space-x-2">
                      <div className="relative flex-1">
                        <Tag size={13} className="absolute left-2.5 top-2.5 text-zinc-500" />
                        <input
                          type="text"
                          value={couponInput}
                          onChange={(e) => setCouponInput(e.target.value)}
                          placeholder="Apply Coupon (e.g. BOOK100)"
                          className="w-full bg-[#111317] border border-[#2a2f3f] rounded-md py-1.5 pl-8 pr-2 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-blue-500 uppercase font-mono"
                        />
                      </div>
                      <button
                        type="submit"
                        className="px-4 py-1.5 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-md text-xs shadow-sm transition-colors"
                      >
                        Apply
                      </button>
                    </div>

                    {couponMessage && (
                      <p className={`text-[11px] mt-1.5 ${couponMessage.success ? 'text-emerald-400' : 'text-red-400'}`}>
                        {couponMessage.message}
                      </p>
                    )}
                  </form>

                  {/* Redeem Gift Points */}
                  <div className="bg-[#12141a] p-2.5 rounded-lg border border-[#262b38] space-y-2">
                    <div className="flex items-center justify-between text-[11px]">
                      <span className="text-zinc-300 flex items-center space-x-1">
                        <Gift size={12} className="text-amber-400" />
                        <span>Redeem Gift Points</span>
                      </span>
                      <span className="text-amber-400 font-semibold">{user.giftPoints} Pts available</span>
                    </div>

                    <form onSubmit={handleRedeemPoints} className="flex space-x-2">
                      <input
                        type="number"
                        min="1"
                        max={user.giftPoints}
                        value={pointsInput}
                        onChange={(e) => setPointsInput(e.target.value)}
                        placeholder={`Enter pts (Max: ${user.giftPoints})`}
                        className="w-full bg-[#0d0f13] border border-[#252a36] rounded py-1 px-2 text-[11px] text-white focus:outline-none focus:border-blue-500"
                      />
                      <button
                        type="submit"
                        className="px-3 py-1 bg-amber-600 hover:bg-amber-500 text-white text-[11px] font-medium rounded transition-colors whitespace-nowrap"
                      >
                        Redeem
                      </button>
                    </form>

                    {pointsMessage && (
                      <p className={`text-[10px] ${pointsMessage.success ? 'text-emerald-400' : 'text-red-400'}`}>
                        {pointsMessage.message}
                      </p>
                    )}
                  </div>

                  {/* Discount line */}
                  {(discountAmount > 0 || redeemedPoints > 0) && (
                    <div className="flex justify-between text-emerald-400 pt-1">
                      <span>Discount / Points Savings</span>
                      <span className="font-semibold">-₹{discountAmount + redeemedPoints}</span>
                    </div>
                  )}

                  {/* Final Total Amount */}
                  <div className="pt-3 border-t border-[#282d3b] flex justify-between items-baseline">
                    <span className="text-white font-bold text-sm">Total Amount</span>
                    <span className="text-white font-extrabold text-lg">
                      ₹{grandTotal}
                    </span>
                  </div>
                </div>
              </div>

              {/* Pay Now Button (Matches Image 6) */}
              <div className="mt-6 pt-4 border-t border-[#282d3b]">
                <button
                  type="button"
                  onClick={handlePayNow}
                  className="w-full py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-lg text-sm shadow-xl transition-all flex items-center justify-center space-x-2"
                >
                  <span>Pay Now</span>
                  <ArrowRight size={16} />
                </button>
                <p className="text-[10px] text-zinc-500 text-center mt-2 flex items-center justify-center space-x-1">
                  <ShieldCheck size={12} className="text-emerald-500" />
                  <span>Guaranteed Safe & Secure Checkout</span>
                </p>
              </div>

            </div>

          </div>

        </div>
      )}

      {/* Payment and Confirmation Modals */}
      <PaymentModal addressData={addressForm} />
      <ConfirmationModal />

    </div>
  );
};

export default CartCheckoutPage;
