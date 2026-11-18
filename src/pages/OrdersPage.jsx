import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Package, RefreshCw, XCircle, Clock, CheckCircle2, ChevronRight, AlertCircle, ArrowLeft } from 'lucide-react';
import BookCover from '../components/common/BookCover';
import { useBookStore } from '../context/BookStoreContext';

const OrdersPage = () => {
  const navigate = useNavigate();
  const { orders, cancelOrder, buyAgain, addToCart } = useBookStore();
  const [toastMessage, setToastMessage] = useState(null);

  const handleCancel = (orderId) => {
    if (window.confirm('Are you sure you want to cancel this order? Instant refund will be processed to original payment method.')) {
      const res = cancelOrder(orderId);
      setToastMessage(res);
      setTimeout(() => setToastMessage(null), 4000);
    }
  };

  const handleBuyAgain = (items) => {
    buyAgain(items);
    setToastMessage({ success: true, message: 'Items added back to your cart!' });
    setTimeout(() => {
      setToastMessage(null);
      navigate('/checkout');
    }, 1000);
  };

  return (
    <div className="max-w-[1500px] w-full mx-auto px-4 lg:px-6 py-6">
      
      {/* Breadcrumbs */}
      <nav className="flex items-center space-x-2 text-xs text-zinc-400 mb-6">
        <Link to="/" className="hover:text-white transition-colors">Home</Link>
        <span>/</span>
        <span className="text-blue-400 font-medium">My Orders & Purchase History</span>
      </nav>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 mb-6 border-b border-[#282d3b] gap-2">
        <div>
          <h1 className="text-xl font-bold text-white">Order History</h1>
          <p className="text-xs text-zinc-400 mt-0.5">
            Track deliveries, re-order reads with Buy In Again, or cancel orders within 48 hours.
          </p>
        </div>
      </div>

      {toastMessage && (
        <div
          className={`p-3 rounded-lg text-xs mb-6 flex items-center space-x-2 ${
            toastMessage.success
              ? 'bg-emerald-900/40 border border-emerald-500/40 text-emerald-300'
              : 'bg-red-900/40 border border-red-500/40 text-red-300'
          }`}
        >
          {toastMessage.success ? <CheckCircle2 size={16} /> : <AlertCircle size={16} />}
          <span>{toastMessage.message}</span>
        </div>
      )}

      {orders.length === 0 ? (
        <div className="p-12 text-center bg-[#171922] border border-[#282d3b] rounded-xl">
          <Package size={44} className="mx-auto text-zinc-600 mb-3" />
          <h3 className="text-base font-semibold text-white">No previous orders found</h3>
          <p className="text-xs text-zinc-400 mt-1 mb-4">Start your reading journey by exploring our bookstore catalogue.</p>
          <Link
            to="/"
            className="px-5 py-2 bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold rounded-md shadow inline-block"
          >
            Explore Catalog
          </Link>
        </div>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => {
            const orderTime = new Date(order.placedAt).getTime();
            const hoursElapsed = (Date.now() - orderTime) / (1000 * 60 * 60);
            const isCancellable = hoursElapsed <= 48 && order.status !== 'Cancelled';
            const hoursLeft = Math.max(0, Math.floor(48 - hoursElapsed));

            return (
              <div
                key={order.id}
                className="bg-[#181a23] border border-[#282d3b] rounded-xl overflow-hidden shadow-lg"
              >
                {/* Order Top Bar */}
                <div className="px-6 py-3.5 bg-[#14161e] border-b border-[#262b38] flex flex-wrap items-center justify-between gap-3 text-xs">
                  <div className="flex items-center space-x-4 flex-wrap">
                    <div>
                      <span className="text-zinc-500 block text-[10px] uppercase font-semibold">Order Placed</span>
                      <span className="text-zinc-300 font-medium">{new Date(order.placedAt).toLocaleDateString()}</span>
                    </div>

                    <div>
                      <span className="text-zinc-500 block text-[10px] uppercase font-semibold">Total</span>
                      <span className="text-white font-bold">₹{order.total}</span>
                    </div>

                    <div>
                      <span className="text-zinc-500 block text-[10px] uppercase font-semibold">Order ID</span>
                      <span className="font-mono text-zinc-300">{order.id}</span>
                    </div>
                  </div>

                  {/* Status Badge */}
                  <div className="flex items-center space-x-2">
                    <span
                      className={`px-2.5 py-0.5 rounded-full text-[11px] font-semibold border ${
                        order.status === 'Cancelled'
                          ? 'bg-red-950/40 text-red-400 border-red-800/40'
                          : order.status === 'Delivered'
                          ? 'bg-emerald-950/40 text-emerald-400 border-emerald-800/40'
                          : 'bg-blue-950/40 text-blue-400 border-blue-800/40'
                      }`}
                    >
                      {order.status}
                    </span>
                  </div>
                </div>

                {/* Order Items */}
                <div className="p-6 divide-y divide-[#262a37]">
                  {order.items.map((item) => (
                    <div key={item.id} className="py-4 first:pt-0 last:pb-0 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div className="flex items-center space-x-4">
                        <div className="shrink-0">
                          <BookCover book={item} size="sm" />
                        </div>
                        <div>
                          <Link to={`/book/${item.id}`} className="text-sm font-bold text-white hover:text-blue-400 transition-colors">
                            {item.title}
                          </Link>
                          <p className="text-xs text-zinc-400">by {item.author}</p>
                          <p className="text-[11px] text-zinc-500 mt-1">
                            {item.format || 'Paperback'} • Qty: {item.quantity} • ₹{item.price} each
                          </p>
                          <p className="text-[11px] text-emerald-400 mt-1">{order.deliveryDate}</p>
                        </div>
                      </div>

                      {/* Item specific actions */}
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => addToCart(item, item.quantity)}
                          className="px-3 py-1.5 bg-[#252936] hover:bg-[#2f3545] border border-[#383f52] text-zinc-200 text-xs font-medium rounded-md transition-colors flex items-center space-x-1"
                        >
                          <RefreshCw size={12} />
                          <span>Buy In Again</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Order Footer Actions & 48h cancel status */}
                <div className="px-6 py-3.5 bg-[#14161e] border-t border-[#262b38] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
                  {order.status === 'Cancelled' ? (
                    <div className="text-red-400 flex items-center space-x-1.5">
                      <XCircle size={14} />
                      <span>Order cancelled. Refund completed.</span>
                    </div>
                  ) : isCancellable ? (
                    <div className="flex items-center space-x-2 text-amber-400">
                      <Clock size={14} />
                      <span className="text-[11px]">
                        Can cancel order within {hoursLeft} hours for instant refund
                      </span>
                    </div>
                  ) : (
                    <div className="text-zinc-500 text-[11px]">
                      Cancellation window expired (48h passed)
                    </div>
                  )}

                  <div className="flex items-center space-x-3 w-full sm:w-auto justify-end">
                    {isCancellable && (
                      <button
                        onClick={() => handleCancel(order.id)}
                        className="px-3 py-1.5 text-red-400 hover:text-red-300 hover:bg-red-500/10 border border-red-500/30 rounded-md text-xs font-medium transition-colors"
                      >
                        Cancel Order
                      </button>
                    )}

                    <button
                      onClick={() => handleBuyAgain(order.items)}
                      className="px-4 py-1.5 bg-blue-600 hover:bg-blue-500 text-white rounded-md text-xs font-semibold shadow transition-colors flex items-center space-x-1.5"
                    >
                      <RefreshCw size={12} />
                      <span>Re-Order Entire Package</span>
                    </button>
                  </div>
                </div>

              </div>
            );
          })}
        </div>
      )}

    </div>
  );
};

export default OrdersPage;
