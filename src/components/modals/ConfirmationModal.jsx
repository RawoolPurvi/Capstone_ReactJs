import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Check, BookOpen, Clock, AlertCircle } from 'lucide-react';
import BookCover from '../common/BookCover';
import { useBookStore } from '../../context/BookStoreContext';

const ConfirmationModal = () => {
  const navigate = useNavigate();
  const {
    isSuccessModalOpen,
    setIsSuccessModalOpen,
    lastCompletedOrder,
    cancelOrder
  } = useBookStore();

  if (!isSuccessModalOpen || !lastCompletedOrder) return null;

  const handleContinueShopping = () => {
    setIsSuccessModalOpen(false);
    navigate('/');
  };

  const handleCancelThisOrder = () => {
    if (window.confirm('Are you sure you want to cancel this order? Instant refund will be processed.')) {
      cancelOrder(lastCompletedOrder.id);
      setIsSuccessModalOpen(false);
      navigate('/orders');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0d1b2a]/90 backdrop-blur-md animate-in fade-in">
      
      {/* Background illustration overlay matching Image 8 */}
      <div className="absolute inset-0 pointer-events-none opacity-20 overflow-hidden flex items-center justify-center">
        <svg viewBox="0 0 1000 700" className="w-full h-full object-cover">
          <rect x="120" y="90" width="280" height="400" rx="20" transform="rotate(-15 250 290)" fill="#ea580c" />
          <rect x="600" y="300" width="320" height="440" rx="20" transform="rotate(12 750 550)" fill="#0284c7" />
          <rect x="200" y="370" width="300" height="380" rx="20" fill="#0d9488" />
        </svg>
      </div>

      <div className="relative w-full max-w-2xl bg-[#1e212b] border border-[#2e3546] rounded-xl shadow-2xl p-6 md:p-8 text-white z-10 text-center">
        
        {/* Success Green Checkmark Icon */}
        <div className="w-14 h-14 mx-auto bg-[#22c55e] text-white rounded-full flex items-center justify-center shadow-lg mb-4 ring-8 ring-[#22c55e]/20">
          <Check size={32} strokeWidth={3} />
        </div>

        {/* Success Message */}
        <h3 className="text-lg md:text-xl font-bold text-white mb-1">
          Your purchase of the following reads is successful
        </h3>
        <p className="text-xs text-zinc-400 mb-6">
          Order ID: <span className="font-mono text-zinc-200">{lastCompletedOrder.id}</span> • Total Paid: <span className="text-emerald-400 font-bold">₹{lastCompletedOrder.total}</span>
        </p>

        {/* Purchased Books Cards Grid (Image 8 layout) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6 text-left">
          {lastCompletedOrder.items.map((item) => (
            <div
              key={item.id}
              className="bg-[#15171e] border border-[#2c3242] rounded-lg p-3 flex items-center space-x-3 shadow-md"
            >
              <div className="shrink-0">
                <BookCover book={item} size="sm" />
              </div>

              <div className="min-w-0 flex-1">
                <h4 className="text-sm font-semibold text-white truncate">
                  {item.title}
                </h4>
                <p className="text-xs text-zinc-400 truncate">
                  by {item.author}
                </p>

                <div className="mt-2 text-[11px] space-y-0.5">
                  <span className="text-zinc-300 font-medium block">
                    {item.format || 'Paperback'}
                  </span>
                  <div className="flex items-center justify-between pt-1">
                    <span className="text-white font-bold text-xs">
                      ₹{item.price}
                    </span>
                    <span className="text-zinc-400 text-[10px]">
                      Qty: {item.quantity}
                    </span>
                  </div>
                  <span className="text-zinc-400 text-[10px] block">
                    {lastCompletedOrder.deliveryDate}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* 48-Hour Cancellation Guarantee Notice */}
        <div className="bg-[#15171e] border border-[#2b3140] rounded-lg p-3 mb-6 flex flex-col sm:flex-row items-center justify-between text-xs text-left">
          <div className="flex items-center space-x-2.5 mb-2 sm:mb-0">
            <Clock size={16} className="text-amber-400 shrink-0" />
            <p className="text-zinc-300 text-[11px]">
              Need changes? You can <span className="text-white font-semibold">cancel this order within 48 hours</span> for an instant full refund.
            </p>
          </div>
          <button
            onClick={handleCancelThisOrder}
            className="text-[11px] text-red-400 hover:text-red-300 underline font-medium hover:bg-red-500/10 px-2 py-1 rounded transition-colors whitespace-nowrap"
          >
            Cancel Order
          </button>
        </div>

        {/* Action Button: Continue Shopping */}
        <div className="flex justify-center">
          <button
            onClick={handleContinueShopping}
            className="py-2.5 px-6 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-md text-xs shadow-lg transition-colors flex items-center space-x-2"
          >
            <span>Continue your Shopping</span>
            <BookOpen size={14} />
          </button>
        </div>

      </div>

    </div>
  );
};

export default ConfirmationModal;
