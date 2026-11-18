import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { BookOpen, ShoppingCart, Heart, Users, Package, User, LogOut, Sparkles, ChevronDown } from 'lucide-react';
import { useBookStore } from '../../context/BookStoreContext';

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const {
    cartItemCount,
    wishlist,
    user,
    setIsAuthModalOpen,
    logoutUser
  } = useBookStore();

  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  const navLinks = [
    { name: 'My Orders', path: '/orders', icon: Package },
    { name: 'My Wishlist', path: '/wishlist', icon: Heart, badge: wishlist.length },
    { name: 'My Writers', path: '/writers', icon: Users },
  ];

  return (
    <header className="sticky top-0 z-40 bg-[#16181f] border-b border-[#282d39] select-none">
      <div className="max-w-[1500px] mx-auto px-4 lg:px-6 h-14 flex items-center justify-between">
        
        {/* Brand Logo */}
        <Link to="/" className="flex items-center space-x-2.5 group">
          <div className="w-8 h-8 rounded bg-gradient-to-tr from-blue-600 to-indigo-500 flex items-center justify-center text-white shadow-md group-hover:scale-105 transition-transform">
            <BookOpen size={18} />
          </div>
          <span className="font-bold text-base tracking-wide text-white group-hover:text-blue-400 transition-colors">
            Book Worm
          </span>
        </Link>

        {/* Center / Navigation Links */}
        <nav className="hidden md:flex items-center space-x-6">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const isActive = location.pathname === link.path;
            return (
              <Link
                key={link.name}
                to={link.path}
                className={`relative flex items-center space-x-1.5 text-xs font-medium transition-colors ${
                  isActive
                    ? 'text-blue-400 font-semibold'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                <Icon size={14} />
                <span>{link.name}</span>
                {link.badge > 0 && (
                  <span className="bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.2 rounded-full">
                    {link.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Right Actions: Cart & Profile */}
        <div className="flex items-center space-x-4">
          
          {/* Cart Icon with Counter Badge */}
          <Link
            to="/checkout"
            className="relative p-2 text-zinc-300 hover:text-white transition-colors hover:bg-zinc-800/60 rounded-full"
            title="Shopping Cart & Checkout"
          >
            <ShoppingCart size={20} />
            {cartItemCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 bg-red-500 text-white font-bold text-[10px] w-4 h-4 rounded-full flex items-center justify-center shadow">
                {cartItemCount}
              </span>
            )}
          </Link>

          {/* User Profile / Auth Toggle */}
          <div className="relative">
            {user.isLoggedIn ? (
              <button
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                className="flex items-center space-x-2 text-xs font-medium text-zinc-300 hover:text-white bg-[#222631] hover:bg-[#2b303e] py-1.5 px-3 rounded-full border border-zinc-700/60 transition-colors"
              >
                <div className="w-5 h-5 rounded-full bg-blue-600 text-white flex items-center justify-center text-[10px] font-bold uppercase">
                  {user.name[0]}
                </div>
                <span className="max-w-[90px] truncate hidden sm:inline">{user.name}</span>
                <ChevronDown size={12} className="text-zinc-400" />
              </button>
            ) : (
              <button
                onClick={() => setIsAuthModalOpen(true)}
                className="flex items-center space-x-1.5 text-xs font-medium bg-blue-600 hover:bg-blue-500 text-white py-1.5 px-3 rounded-md transition-colors shadow-sm"
              >
                <User size={13} />
                <span>Login</span>
              </button>
            )}

            {/* User Dropdown */}
            {isUserMenuOpen && user.isLoggedIn && (
              <div
                onMouseLeave={() => setIsUserMenuOpen(false)}
                className="absolute right-0 mt-2 w-64 bg-[#1e212b] border border-[#2e3444] rounded-lg shadow-2xl py-2 z-50 text-xs animate-in fade-in"
              >
                <div className="px-4 py-2 border-b border-zinc-700/50">
                  <p className="font-semibold text-white">{user.name}</p>
                  <p className="text-[11px] text-zinc-400 truncate">{user.email}</p>
                  <div className="mt-1.5 flex items-center justify-between text-[10px]">
                    <span className="bg-blue-900/40 text-blue-300 border border-blue-700/50 px-1.5 py-0.5 rounded">
                      {user.role}
                    </span>
                    <span className="text-yellow-400 flex items-center space-x-1 font-semibold">
                      <Sparkles size={11} />
                      <span>{user.giftPoints} Points</span>
                    </span>
                  </div>
                </div>

                <div className="py-1">
                  <Link
                    to="/orders"
                    onClick={() => setIsUserMenuOpen(false)}
                    className="flex items-center px-4 py-2 text-zinc-300 hover:text-white hover:bg-zinc-800/60"
                  >
                    <Package size={14} className="mr-2 text-zinc-400" />
                    <span>My Order History</span>
                  </Link>

                  <Link
                    to="/wishlist"
                    onClick={() => setIsUserMenuOpen(false)}
                    className="flex items-center px-4 py-2 text-zinc-300 hover:text-white hover:bg-zinc-800/60"
                  >
                    <Heart size={14} className="mr-2 text-zinc-400" />
                    <span>My Wishlist ({wishlist.length})</span>
                  </Link>
                </div>

                <div className="border-t border-zinc-700/50 pt-1">
                  <button
                    onClick={() => {
                      logoutUser();
                      setIsUserMenuOpen(false);
                    }}
                    className="w-full text-left flex items-center px-4 py-2 text-red-400 hover:bg-red-500/10 transition-colors"
                  >
                    <LogOut size={14} className="mr-2" />
                    <span>Log Out</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

      </div>
    </header>
  );
};

export default Navbar;
