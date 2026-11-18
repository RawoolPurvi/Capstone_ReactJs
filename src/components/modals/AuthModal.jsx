import React, { useState } from 'react';
import { X, Lock, Mail, User, ShieldCheck } from 'lucide-react';
import { useBookStore } from '../../context/BookStoreContext';

const AuthModal = () => {
  const { isAuthModalOpen, setIsAuthModalOpen, loginUser, loginAsGuest } = useBookStore();
  const [isRegisterMode, setIsRegisterMode] = useState(false);
  const [formData, setFormData] = useState({
    name: 'Purvi Rawool',
    email: 'purvi.rawool@example.com',
    password: 'password123',
  });

  if (!isAuthModalOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    loginUser(formData);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-xs animate-in fade-in">
      <div className="relative w-full max-w-md bg-[#191c24] border border-[#2e3444] rounded-xl shadow-2xl p-6 text-white">
        {/* Close Button */}
        <button
          onClick={() => setIsAuthModalOpen(false)}
          className="absolute top-4 right-4 p-1.5 text-zinc-400 hover:text-white rounded-lg hover:bg-zinc-800 transition-colors"
        >
          <X size={18} />
        </button>

        <div className="text-center mb-6">
          <div className="w-12 h-12 mx-auto bg-blue-600/20 text-blue-400 border border-blue-500/30 rounded-xl flex items-center justify-center mb-3">
            <Lock size={22} />
          </div>
          <h3 className="text-lg font-bold">
            {isRegisterMode ? 'Create Member Account' : 'Welcome to Book Worm'}
          </h3>
          <p className="text-xs text-zinc-400 mt-1">
            Access personalised recommendations, order history & loyalty rewards.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3.5">
          {isRegisterMode && (
            <div>
              <label className="block text-xs font-medium text-zinc-300 mb-1">Full Name</label>
              <div className="relative">
                <User size={14} className="absolute left-3 top-3 text-zinc-500" />
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Purvi Rawool"
                  className="w-full bg-[#111317] border border-[#2c3240] rounded-md py-2 pl-9 pr-3 text-xs text-white placeholder-zinc-600 focus:outline-none focus:border-blue-500"
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-xs font-medium text-zinc-300 mb-1">Email Address</label>
            <div className="relative">
              <Mail size={14} className="absolute left-3 top-3 text-zinc-500" />
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="reader@bookworm.com"
                className="w-full bg-[#111317] border border-[#2c3240] rounded-md py-2 pl-9 pr-3 text-xs text-white placeholder-zinc-600 focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-zinc-300 mb-1">Password</label>
            <div className="relative">
              <Lock size={14} className="absolute left-3 top-3 text-zinc-500" />
              <input
                type="password"
                required
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                placeholder="••••••••"
                className="w-full bg-[#111317] border border-[#2c3240] rounded-md py-2 pl-9 pr-3 text-xs text-white placeholder-zinc-600 focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-2.5 px-4 bg-blue-600 hover:bg-blue-500 text-white font-medium rounded-md text-xs shadow-md transition-colors mt-2"
          >
            {isRegisterMode ? 'Register & Start Reading' : 'Sign In as Member'}
          </button>
        </form>

        <div className="relative my-4">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-zinc-700/60" />
          </div>
          <div className="relative flex justify-center text-[10px] uppercase">
            <span className="bg-[#191c24] px-2 text-zinc-500">Or continue as</span>
          </div>
        </div>

        <button
          type="button"
          onClick={loginAsGuest}
          className="w-full py-2 px-4 bg-[#252936] hover:bg-[#2f3545] border border-[#373e50] text-zinc-300 rounded-md text-xs font-medium transition-colors flex items-center justify-center space-x-2"
        >
          <ShieldCheck size={14} className="text-zinc-400" />
          <span>Guest Checkout Mode</span>
        </button>

        <div className="mt-4 text-center text-xs text-zinc-400">
          {isRegisterMode ? (
            <span>
              Already have an account?{' '}
              <button
                type="button"
                onClick={() => setIsRegisterMode(false)}
                className="text-blue-400 hover:underline font-semibold"
              >
                Sign In
              </button>
            </span>
          ) : (
            <span>
              New reader?{' '}
              <button
                type="button"
                onClick={() => setIsRegisterMode(true)}
                className="text-blue-400 hover:underline font-semibold"
              >
                Create Account
              </button>
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthModal;
