import React, { useState } from 'react';
import { Transaction, StudentProfile } from '../types';

interface FinanceViewProps {
  profile: StudentProfile;
  transactions: Transaction[];
  onUpdateWallet: (newBalance: number, newTx: Transaction) => void;
}

export const FinanceView: React.FC<FinanceViewProps> = ({
  profile,
  transactions,
  onUpdateWallet,
}) => {
  const [showTopUpModal, setShowTopUpModal] = useState<boolean>(false);
  const [topUpAmount, setTopUpAmount] = useState<string>('20000');
  const [paymentMethod, setPaymentMethod] = useState<'remita' | 'card' | 'bank'>('remita');
  const [selectedReceiptTx, setSelectedReceiptTx] = useState<Transaction | null>(null);

  const handleFundWallet = (e: React.FormEvent) => {
    e.preventDefault();
    const amountNum = parseFloat(topUpAmount);
    if (isNaN(amountNum) || amountNum <= 0) {
      alert('Please enter a valid amount to fund your e-Wallet.');
      return;
    }

    const refNo = `NOUN/2023_2/WAL/${Math.floor(10000 + Math.random() * 90000)}`;
    const now = new Date();
    const formattedDate = `${now.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}, ${now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}`;

    const newTx: Transaction = {
      id: `tx-${Date.now()}`,
      reference: refNo,
      date: formattedDate,
      description: `Wallet Top-Up via ${paymentMethod.toUpperCase()} Payment Gateway`,
      type: 'credit',
      amount: amountNum,
      status: 'Successful',
      category: 'Wallet Funding',
    };

    onUpdateWallet(profile.walletBalance + amountNum, newTx);
    setShowTopUpModal(false);
    alert(`Wallet Top-Up Successful! ₦${amountNum.toLocaleString('en-NG')} added to your NOUN e-Wallet.`);
  };

  return (
    <div className="flex-1 md:ml-80 pb-24 md:pb-8 pt-6 md:pt-8 px-margin-mobile md:px-margin-desktop w-full max-w-[1200px] mx-auto flex flex-col gap-6">
      {/* Title */}
      <div>
        <h1 className="font-display-lg text-display-lg text-primary font-bold">
          Wallet & Fees Portal
        </h1>
        <p className="font-body-lg text-body-lg text-on-surface-variant mt-1">
          Manage your NOUN e-Wallet balance, school fees, and payment receipts.
        </p>
      </div>

      {/* Wallet Balance Hero Card */}
      <div className="bg-primary text-on-primary rounded-2xl p-6 shadow-md relative overflow-hidden flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
        <div className="z-10">
          <span className="text-xs font-semibold text-primary-fixed-dim uppercase tracking-wider block">
            Official NOUN Student e-Wallet Balance
          </span>
          <div className="text-3xl sm:text-4xl font-extrabold text-white mt-2 font-mono">
            ₦{profile.walletBalance.toLocaleString('en-NG', { minimumFractionDigits: 2 })}
          </div>
          <p className="text-xs text-primary-fixed-dim mt-2">
            Matriculation Number: <strong className="text-white">{profile.matricNumber}</strong>
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto z-10">
          <button
            type="button"
            onClick={() => setShowTopUpModal(true)}
            className="bg-secondary-container hover:bg-secondary text-on-secondary-container hover:text-white px-5 py-3 rounded-xl font-bold text-xs transition-all flex items-center justify-center gap-2 cursor-pointer shadow-sm active:scale-95"
          >
            <span className="material-symbols-outlined text-base">add_circle</span>
            <span>Fund e-Wallet</span>
          </button>

          <button
            type="button"
            onClick={() => alert('Course and Exam registration for 2023_2 Semester is currently ACTIVE.')}
            className="bg-primary-container text-white border border-primary-fixed-dim/30 hover:bg-primary-container/80 px-5 py-3 rounded-xl font-bold text-xs transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-95"
          >
            <span className="material-symbols-outlined text-base">receipt_long</span>
            <span>Fee Breakdown</span>
          </button>
        </div>

        {/* Decorative background circle */}
        <div className="absolute -right-12 -bottom-12 w-56 h-56 rounded-full bg-white/5 pointer-events-none"></div>
      </div>

      {/* 2023_2 Semester Mandatory Fees Summary */}
      <div className="bg-surface rounded-xl p-6 border border-outline-variant shadow-xs">
        <h3 className="font-title-md text-base font-bold text-primary mb-4 flex items-center gap-2">
          <span className="material-symbols-outlined text-primary">account_balance</span>
          <span>Approved NOUN Semester Schedule of Fees (2023_2)</span>
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="bg-surface-container border-b border-outline-variant text-primary font-bold">
                <th className="p-3">Fee Item Description</th>
                <th className="p-3">Category</th>
                <th className="p-3">Amount (₦)</th>
                <th className="p-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/40 text-on-surface">
              <tr>
                <td className="p-3 font-semibold">Semester Portal Registration Fee</td>
                <td className="p-3 text-on-surface-variant">Mandatory Portal Fee</td>
                <td className="p-3 font-mono font-bold">₦18,000.00</td>
                <td className="p-3">
                  <span className="px-2.5 py-0.5 rounded-full bg-green-100 text-green-800 font-bold text-[10px]">
                    Paid
                  </span>
                </td>
              </tr>
              <tr>
                <td className="p-3 font-semibold">Course Registration (4 Undergraduate Courses)</td>
                <td className="p-3 text-on-surface-variant">Academic Fee</td>
                <td className="p-3 font-mono font-bold">₦12,500.00</td>
                <td className="p-3">
                  <span className="px-2.5 py-0.5 rounded-full bg-green-100 text-green-800 font-bold text-[10px]">
                    Paid
                  </span>
                </td>
              </tr>
              <tr>
                <td className="p-3 font-semibold">End-of-Semester E-Exam Registration (4 Courses)</td>
                <td className="p-3 text-on-surface-variant">Exam Fee</td>
                <td className="p-3 font-mono font-bold">₦4,000.00</td>
                <td className="p-3">
                  <span className="px-2.5 py-0.5 rounded-full bg-green-100 text-green-800 font-bold text-[10px]">
                    Paid
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Transaction History Log */}
      <div className="bg-surface rounded-xl p-6 border border-outline-variant shadow-xs">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-title-md text-base font-bold text-primary">
            Recent Wallet Transactions & Receipts
          </h3>
          <span className="text-xs text-on-surface-variant font-medium">
            Showing {transactions.length} records
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="bg-surface-container border-b border-outline-variant text-primary font-bold">
                <th className="p-3">Reference / RRR</th>
                <th className="p-3">Date & Time</th>
                <th className="p-3">Description</th>
                <th className="p-3">Type</th>
                <th className="p-3">Amount (₦)</th>
                <th className="p-3 text-right">Receipt</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/40 text-on-surface font-medium">
              {transactions.map((tx) => (
                <tr key={tx.id} className="hover:bg-surface-container-low transition-colors">
                  <td className="p-3 font-mono text-[11px] font-bold text-primary">
                    {tx.reference}
                  </td>
                  <td className="p-3 text-on-surface-variant">{tx.date}</td>
                  <td className="p-3">{tx.description}</td>
                  <td className="p-3">
                    <span
                      className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        tx.type === 'credit'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-blue-100 text-blue-800'
                      }`}
                    >
                      {tx.type.toUpperCase()}
                    </span>
                  </td>
                  <td className={`p-3 font-mono font-bold ${tx.type === 'credit' ? 'text-green-700' : 'text-primary'}`}>
                    {tx.type === 'credit' ? '+' : '-'}₦{tx.amount.toLocaleString('en-NG', { minimumFractionDigits: 2 })}
                  </td>
                  <td className="p-3 text-right">
                    <button
                      type="button"
                      onClick={() => setSelectedReceiptTx(tx)}
                      className="text-primary hover:bg-surface-container px-2.5 py-1 rounded-md text-[11px] font-bold cursor-pointer transition-colors border border-outline-variant"
                    >
                      Print Receipt
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Top-Up Wallet Modal */}
      {showTopUpModal && (
        <div className="fixed inset-0 bg-primary/70 backdrop-blur-xs z-[100] flex items-center justify-center p-4">
          <div className="bg-surface w-full max-w-md rounded-2xl p-6 shadow-2xl border border-outline-variant">
            <div className="flex justify-between items-center pb-3 border-b border-outline-variant">
              <h3 className="font-title-md text-base font-bold text-primary">
                Fund NOUN e-Wallet
              </h3>
              <button
                type="button"
                onClick={() => setShowTopUpModal(false)}
                className="text-on-surface-variant hover:text-primary font-bold p-1 cursor-pointer"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleFundWallet} className="py-4 space-y-4">
              <div>
                <label className="block text-xs font-bold text-primary mb-1">
                  Amount to Deposit (₦):
                </label>
                <input
                  type="number"
                  required
                  min="1000"
                  step="500"
                  value={topUpAmount}
                  onChange={(e) => setTopUpAmount(e.target.value)}
                  className="w-full bg-surface-container-lowest border border-outline-variant rounded-xl p-3 text-sm font-mono font-bold text-primary focus:ring-2 focus:ring-primary/40 focus:outline-hidden"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-primary mb-2">
                  Payment Method:
                </label>
                <div className="space-y-2">
                  <label className="flex items-center gap-3 p-3 bg-surface-container-lowest rounded-xl border border-outline-variant cursor-pointer hover:border-primary">
                    <input
                      type="radio"
                      name="method"
                      checked={paymentMethod === 'remita'}
                      onChange={() => setPaymentMethod('remita')}
                      className="accent-primary"
                    />
                    <div>
                      <span className="font-bold text-xs text-primary block">Remita RRR Gateway</span>
                      <span className="text-[11px] text-on-surface-variant">Instant bank transfer or card</span>
                    </div>
                  </label>

                  <label className="flex items-center gap-3 p-3 bg-surface-container-lowest rounded-xl border border-outline-variant cursor-pointer hover:border-primary">
                    <input
                      type="radio"
                      name="method"
                      checked={paymentMethod === 'card'}
                      onChange={() => setPaymentMethod('card')}
                      className="accent-primary"
                    />
                    <div>
                      <span className="font-bold text-xs text-primary block">Debit Card (MasterCard / Visa / Verve)</span>
                      <span className="text-[11px] text-on-surface-variant">Direct online card charge</span>
                    </div>
                  </label>
                </div>
              </div>

              <div className="pt-3 border-t border-outline-variant flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowTopUpModal(false)}
                  className="px-4 py-2.5 rounded-lg border border-outline text-xs font-bold text-on-surface hover:bg-surface-container cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-lg bg-primary hover:bg-primary-container text-white text-xs font-bold transition-all cursor-pointer shadow-sm active:scale-95"
                >
                  Proceed to Payment
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Official Receipt Modal */}
      {selectedReceiptTx && (
        <div className="fixed inset-0 bg-primary/70 backdrop-blur-xs z-[100] flex items-center justify-center p-4">
          <div className="bg-surface w-full max-w-lg rounded-2xl p-6 shadow-2xl border border-outline-variant space-y-4">
            <div className="border-b-2 border-primary pb-3 text-center">
              <h2 className="text-lg font-bold text-primary tracking-wide">
                NATIONAL OPEN UNIVERSITY OF NIGERIA
              </h2>
              <p className="text-xs font-semibold text-on-surface-variant">
                OFFICIAL PAYMENT RECEIPT
              </p>
            </div>

            <div className="space-y-2 text-xs text-on-surface py-2 font-mono">
              <div className="flex justify-between">
                <span className="text-on-surface-variant">Matriculation No:</span>
                <span className="font-bold text-primary">{profile.matricNumber}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-on-surface-variant">Student Name:</span>
                <span className="font-bold">{profile.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-on-surface-variant">Transaction Ref:</span>
                <span className="font-bold">{selectedReceiptTx.reference}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-on-surface-variant">Date & Time:</span>
                <span>{selectedReceiptTx.date}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-on-surface-variant">Purpose:</span>
                <span className="font-bold">{selectedReceiptTx.description}</span>
              </div>
              <div className="flex justify-between pt-2 border-t border-dashed border-outline-variant text-sm font-bold text-primary">
                <span>Amount Paid:</span>
                <span>₦{selectedReceiptTx.amount.toLocaleString('en-NG', { minimumFractionDigits: 2 })}</span>
              </div>
            </div>

            <div className="pt-4 border-t border-outline-variant flex justify-between items-center">
              <button
                type="button"
                onClick={() => window.print()}
                className="bg-primary text-white px-4 py-2 rounded-lg text-xs font-bold hover:bg-primary-container cursor-pointer flex items-center gap-1"
              >
                <span className="material-symbols-outlined text-sm">print</span>
                <span>Print Copy</span>
              </button>
              <button
                type="button"
                onClick={() => setSelectedReceiptTx(null)}
                className="bg-surface-container text-on-surface px-4 py-2 rounded-lg text-xs font-bold hover:bg-surface-container-high cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
