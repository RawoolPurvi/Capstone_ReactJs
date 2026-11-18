import React from 'react';
import { BookOpen, ShieldCheck, Truck, Clock, RefreshCw } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-[#121318] border-t border-[#242834] text-zinc-400 text-xs py-8 px-4 lg:px-8 mt-auto select-none">
      <div className="max-w-[1400px] mx-auto">
        {/* Value proposition badges */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 py-4 mb-6 border-b border-[#242834]">
          <div className="flex items-center space-x-3">
            <Truck size={20} className="text-blue-400" />
            <div>
              <p className="text-white font-medium text-xs">Fast & Reliable Delivery</p>
              <p className="text-[11px] text-zinc-500">Tracked with tentative dates</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <Clock size={20} className="text-blue-400" />
            <div>
              <p className="text-white font-medium text-xs">48-Hr Order Cancellation</p>
              <p className="text-[11px] text-zinc-500">Instant refund guarantee</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <ShieldCheck size={20} className="text-blue-400" />
            <div>
              <p className="text-white font-medium text-xs">100% Secure Checkout</p>
              <p className="text-[11px] text-zinc-500">Cards, UPI & Wallet points</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <RefreshCw size={20} className="text-blue-400" />
            <div>
              <p className="text-white font-medium text-xs">Buy In Again</p>
              <p className="text-[11px] text-zinc-500">One-click reorder from history</p>
            </div>
          </div>
        </div>

        {/* Brand & copyright */}
        <div className="flex flex-col md:flex-row items-center justify-between text-[11px] text-zinc-500">
          <div className="flex items-center space-x-2 mb-2 md:mb-0">
            <BookOpen size={16} className="text-blue-500" />
            <span className="text-zinc-300 font-semibold">Book Worm</span>
            <span>— The Modern Online Bookstore Platform</span>
          </div>
          <p>© 2026 Book Worm Inc. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
