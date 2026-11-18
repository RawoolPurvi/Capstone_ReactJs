import React, { useState } from 'react';
import { X, CreditCard, Smartphone, Wallet, Shield, CheckCircle2, QrCode } from 'lucide-react';
import { useBookStore } from '../../context/BookStoreContext';

const PaymentModal = ({ addressData }) => {
  const {
    isPaymentModalOpen,
    setIsPaymentModalOpen,
    grandTotal,
    placeOrder,
    user
  } = useBookStore();

  const [activeTab, setActiveTab] = useState('credit'); // 'credit' | 'debit' | 'upi' | 'wallet'
  const [isProcessing, setIsProcessing] = useState(false);

  // Form states
  const [cardForm, setCardForm] = useState({
    cardNumber: '4242 •••• •••• 4242',
    nameOnCard: 'Purvi Rawool',
    cvv: '891',
    expiryDate: '12/28',
  });

  const [upiId, setUpiId] = useState('aditi@okhdfcbank');
  const [selectedWallet, setSelectedWallet] = useState('bookworm');

  if (!isPaymentModalOpen) return null;

  const handlePay = (e) => {
    e.preventDefault();
    setIsProcessing(true);

    let paymentMethodName = 'Credit Card';
    if (activeTab === 'debit') paymentMethodName = 'Debit Card';
    if (activeTab === 'upi') paymentMethodName = `UPI (${upiId})`;
    if (activeTab === 'wallet') paymentMethodName = 'Book Worm Wallet & Points';

    setTimeout(() => {
      setIsProcessing(false);
      placeOrder({
        address: addressData || user.savedAddress,
        paymentMethod: paymentMethodName
      });
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0d1b2a]/85 backdrop-blur-md animate-in fade-in">
      
      {/* Illustrated background decorative shapes matching Image 7 */}
      <div className="absolute inset-0 pointer-events-none opacity-20 overflow-hidden flex items-center justify-center">
        <svg viewBox="0 0 1000 700" className="w-full h-full object-cover">
          <rect x="100" y="80" width="300" height="420" rx="20" transform="rotate(-15 250 290)" fill="#ea580c" />
          <rect x="580" y="320" width="340" height="460" rx="20" transform="rotate(12 750 550)" fill="#0284c7" />
          <rect x="180" y="380" width="320" height="400" rx="20" fill="#0d9488" />
        </svg>
      </div>

      <div className="relative w-full max-w-2xl bg-[#191c24] border border-[#2e3546] rounded-xl shadow-2xl overflow-hidden text-white z-10">
        
        {/* Modal Header */}
        <div className="px-6 py-4 bg-[#14161d] border-b border-[#282d3b] flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-white tracking-wide">
              Complete Payment
            </h3>
            <p className="text-[11px] text-zinc-400">
              Select your preferred payment method
            </p>
          </div>
          <div className="flex items-center space-x-3">
            <div className="text-right">
              <span className="text-[11px] text-zinc-400 block">Payable Amount</span>
              <span className="text-base font-extrabold text-white">
                ₹{grandTotal}
              </span>
            </div>
            <button
              onClick={() => setIsPaymentModalOpen(false)}
              className="p-1.5 text-zinc-400 hover:text-white rounded-lg hover:bg-zinc-800 transition-colors"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Modal Body: Left Tabs + Right Payment Content */}
        <div className="flex flex-col md:flex-row min-h-[320px]">
          
          {/* Left Navigation Tabs */}
          <div className="w-full md:w-48 bg-[#13151b] border-r border-[#242936] p-2 space-y-1 shrink-0">
            {[
              { id: 'credit', label: 'Credit Card', icon: CreditCard },
              { id: 'debit', label: 'Debit card', icon: CreditCard },
              { id: 'upi', label: 'UPI', icon: Smartphone },
              { id: 'wallet', label: 'Wallet', icon: Wallet },
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center space-x-3 px-3 py-3 rounded-lg text-xs font-medium text-left transition-colors ${
                    isActive
                      ? 'bg-[#222735] text-blue-400 border border-blue-500/30'
                      : 'text-zinc-400 hover:text-white hover:bg-[#1a1d26]'
                  }`}
                >
                  <Icon size={16} />
                  <span>{tab.label}</span>
                </button>
              );
            })}

            <div className="pt-6 px-2 text-[10px] text-zinc-500 flex items-center space-x-1.5">
              <Shield size={12} className="text-emerald-500" />
              <span>256-bit SSL Encrypted</span>
            </div>
          </div>

          {/* Right Form Content */}
          <div className="flex-1 p-6 flex flex-col justify-between bg-[#191c24]">
            
            {/* Credit or Debit Card Tab */}
            {(activeTab === 'credit' || activeTab === 'debit') && (
              <form onSubmit={handlePay} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-medium text-zinc-300 mb-1">
                      Card Number
                    </label>
                    <input
                      type="text"
                      required
                      value={cardForm.cardNumber}
                      onChange={(e) => setCardForm({ ...cardForm, cardNumber: e.target.value })}
                      placeholder="XXXX-XXXX-XXXX-XXXX"
                      className="w-full bg-[#101216] border border-[#2c3242] rounded-md py-2 px-3 text-xs text-white placeholder-zinc-600 focus:outline-none focus:border-blue-500 font-mono"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-medium text-zinc-300 mb-1">
                      Name on Card
                    </label>
                    <input
                      type="text"
                      required
                      value={cardForm.nameOnCard}
                      onChange={(e) => setCardForm({ ...cardForm, nameOnCard: e.target.value })}
                      placeholder="Name"
                      className="w-full bg-[#101216] border border-[#2c3242] rounded-md py-2 px-3 text-xs text-white placeholder-zinc-600 focus:outline-none focus:border-blue-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-medium text-zinc-300 mb-1">
                      CVV
                    </label>
                    <input
                      type="password"
                      maxLength={4}
                      required
                      value={cardForm.cvv}
                      onChange={(e) => setCardForm({ ...cardForm, cvv: e.target.value })}
                      placeholder="XXX"
                      className="w-full bg-[#101216] border border-[#2c3242] rounded-md py-2 px-3 text-xs text-white placeholder-zinc-600 focus:outline-none focus:border-blue-500 font-mono tracking-widest"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-medium text-zinc-300 mb-1">
                      Date of Expiry
                    </label>
                    <input
                      type="text"
                      maxLength={7}
                      required
                      value={cardForm.expiryDate}
                      onChange={(e) => setCardForm({ ...cardForm, expiryDate: e.target.value })}
                      placeholder="MM/YYYY"
                      className="w-full bg-[#101216] border border-[#2c3242] rounded-md py-2 px-3 text-xs text-white placeholder-zinc-600 focus:outline-none focus:border-blue-500 font-mono"
                    />
                  </div>
                </div>

                <div className="pt-4 flex justify-end">
                  <button
                    type="submit"
                    disabled={isProcessing}
                    className="px-6 py-2.5 bg-blue-600 hover:bg-blue-500 disabled:bg-blue-800 text-white font-semibold rounded-md text-xs shadow-lg transition-colors flex items-center space-x-2"
                  >
                    {isProcessing ? (
                      <>
                        <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        <span>Processing Payment...</span>
                      </>
                    ) : (
                      <span>Pay Now ₹{grandTotal}</span>
                    )}
                  </button>
                </div>
              </form>
            )}

            {/* UPI Tab */}
            {activeTab === 'upi' && (
              <form onSubmit={handlePay} className="space-y-4">
                <div>
                  <label className="block text-[11px] font-medium text-zinc-300 mb-1">
                    Enter UPI ID (Google Pay, PhonePe, Paytm, BHIM)
                  </label>
                  <input
                    type="text"
                    required
                    value={upiId}
                    onChange={(e) => setUpiId(e.target.value)}
                    placeholder="username@okhdfcbank"
                    className="w-full bg-[#101216] border border-[#2c3242] rounded-md py-2 px-3 text-xs text-white placeholder-zinc-600 focus:outline-none focus:border-blue-500 font-mono"
                  />
                </div>

                <div className="flex items-center space-x-4 p-3 bg-[#12141a] rounded-lg border border-[#292f3e]">
                  <QrCode size={40} className="text-blue-400 shrink-0" />
                  <div className="text-xs">
                    <p className="font-semibold text-white">Scan & Pay via any UPI App</p>
                    <p className="text-[11px] text-zinc-400">Open GPay, Paytm or PhonePe to scan dynamic QR code at checkout</p>
                  </div>
                </div>

                <div className="pt-4 flex justify-end">
                  <button
                    type="submit"
                    disabled={isProcessing}
                    className="px-6 py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-md text-xs shadow-lg transition-colors flex items-center space-x-2"
                  >
                    {isProcessing ? (
                      <>
                        <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        <span>Verifying UPI Request...</span>
                      </>
                    ) : (
                      <span>Verify & Pay ₹{grandTotal}</span>
                    )}
                  </button>
                </div>
              </form>
            )}

            {/* Wallet Tab */}
            {activeTab === 'wallet' && (
              <form onSubmit={handlePay} className="space-y-4">
                <div className="p-3 bg-[#12141a] border border-[#2b3140] rounded-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-semibold text-white text-xs">Book Worm Reader Wallet</p>
                      <p className="text-[11px] text-zinc-400">Available Reward Points Balance: {user.giftPoints} pts (₹{user.giftPoints})</p>
                    </div>
                    <span className="text-emerald-400 font-bold text-xs">Active</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="block text-[11px] font-medium text-zinc-300">Other Supported Wallets</label>
                  <div className="grid grid-cols-2 gap-2">
                    {['Amazon Pay', 'Paytm Wallet', 'PhonePe Wallet', 'Mobikwik'].map((wallet) => (
                      <button
                        type="button"
                        key={wallet}
                        onClick={() => setSelectedWallet(wallet)}
                        className={`p-2.5 rounded-md text-xs border text-left transition-colors ${
                          selectedWallet === wallet
                            ? 'border-blue-500 bg-blue-600/10 text-white'
                            : 'border-[#2c3242] bg-[#12141a] text-zinc-400 hover:text-white'
                        }`}
                      >
                        {wallet}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="pt-4 flex justify-end">
                  <button
                    type="submit"
                    disabled={isProcessing}
                    className="px-6 py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-md text-xs shadow-lg transition-colors flex items-center space-x-2"
                  >
                    {isProcessing ? (
                      <>
                        <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        <span>Authorizing Wallet...</span>
                      </>
                    ) : (
                      <span>Pay with Wallet ₹{grandTotal}</span>
                    )}
                  </button>
                </div>
              </form>
            )}

          </div>

        </div>

      </div>

    </div>
  );
};

export default PaymentModal;
