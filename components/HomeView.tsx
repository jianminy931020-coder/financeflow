import React from 'react';
import { Transaction } from '../types';
import { CATEGORIES as CAT_CONFIG } from '../constants';

interface HomeViewProps {
  transactions: Transaction[];
  totalBalance: number;
  monthlyStats: { income: number; expenses: number };
}

const HomeView: React.FC<HomeViewProps> = ({ transactions, totalBalance, monthlyStats }) => {
  return (
    <div className="flex flex-col animate-in fade-in duration-500">
      {/* Header */}
      <header className="sticky top-0 z-20 flex items-center justify-between p-4 bg-background-light/80 dark:bg-background-dark/80 ios-blur">
        <div className="flex items-center gap-3">
          <div className="size-10 rounded-full bg-cover bg-center border border-slate-200 dark:border-slate-700" style={{ backgroundImage: 'url("https://picsum.photos/seed/alex/100/100")' }}></div>
          <div>
            <p className="text-xs text-slate-500 dark:text-slate-400">Good Morning,</p>
            <h1 className="text-base font-bold leading-none">Alex Rivera</h1>
          </div>
        </div>
        <div className="flex gap-2">
          <button className="flex items-center justify-center size-10 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
            <span className="material-symbols-outlined text-[22px]">search</span>
          </button>
          <button className="flex items-center justify-center size-10 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 relative">
            <span className="material-symbols-outlined text-[22px]">notifications</span>
            <span className="absolute top-2 right-2 size-2 bg-primary rounded-full ring-2 ring-background-light dark:ring-background-dark"></span>
          </button>
        </div>
      </header>

      {/* Summary Hero Card */}
      <section className="p-4">
        <div className="relative overflow-hidden rounded-xl bg-primary p-6 text-white shadow-lg shadow-primary/20">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-10 -mt-10 blur-2xl"></div>
          <p className="text-sm font-medium text-white/80">Total Balance</p>
          <h2 className="mt-1 text-3xl font-bold tracking-tight">${totalBalance.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</h2>
          <div className="mt-6 flex gap-4">
            <div className="flex-1 rounded-lg bg-white/10 p-3 backdrop-blur-sm border border-white/5">
              <div className="flex items-center gap-1 text-xs text-white/70 mb-1">
                <span className="material-symbols-outlined text-sm text-green-300">arrow_downward</span>
                Income
              </div>
              <p className="text-base font-bold">+${monthlyStats.income.toLocaleString()}</p>
            </div>
            <div className="flex-1 rounded-lg bg-white/10 p-3 backdrop-blur-sm border border-white/5">
              <div className="flex items-center gap-1 text-xs text-white/70 mb-1">
                <span className="material-symbols-outlined text-sm text-red-300">arrow_upward</span>
                Expenses
              </div>
              <p className="text-base font-bold">-${monthlyStats.expenses.toLocaleString()}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Monthly Budget */}
      <section className="px-4 py-2">
        <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/50 p-4">
          <div className="flex justify-between items-end mb-3">
            <div>
              <h3 className="text-sm font-bold">Monthly Budget</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">70% remaining ($2,100 left)</p>
            </div>
            <span className="text-xs font-semibold text-primary uppercase tracking-wider">Active</span>
          </div>
          <div className="h-2 w-full rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
            <div className="h-full rounded-full bg-primary" style={{ width: '70%' }}></div>
          </div>
          <div className="mt-3 flex justify-between text-[10px] font-medium text-slate-400 uppercase tracking-tighter">
            <span>Spent: $900</span>
            <span>Goal: $3,000</span>
          </div>
        </div>
      </section>

      {/* Quick Stats Slider */}
      <section className="flex gap-4 p-4 overflow-x-auto no-scrollbar">
        <div className="min-w-[140px] flex-1 rounded-xl bg-orange-100 dark:bg-orange-900/20 p-4 border border-orange-200 dark:border-orange-900/30">
          <span className="material-symbols-outlined text-orange-600 dark:text-orange-400 mb-2">savings</span>
          <p className="text-xs font-medium text-orange-800 dark:text-orange-300">Savings</p>
          <p className="text-lg font-bold text-orange-900 dark:text-orange-100">$2,400</p>
        </div>
        <div className="min-w-[140px] flex-1 rounded-xl bg-purple-100 dark:bg-purple-900/20 p-4 border border-purple-200 dark:border-purple-900/30">
          <span className="material-symbols-outlined text-purple-600 dark:text-purple-400 mb-2">payments</span>
          <p className="text-xs font-medium text-purple-800 dark:text-orange-300">Upcoming</p>
          <p className="text-lg font-bold text-purple-900 dark:text-purple-100">$450</p>
        </div>
      </section>

      {/* Recent Transactions */}
      <section className="px-4 py-2">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold">Recent Transactions</h3>
          <button className="text-primary text-sm font-semibold">See All</button>
        </div>
        <div className="flex flex-col gap-3">
          {transactions.map(tx => {
            const config = CAT_CONFIG[tx.category];
            return (
              <div key={tx.id} className="flex items-center justify-between p-3 rounded-xl bg-white dark:bg-slate-900/30 border border-slate-100 dark:border-slate-800/50">
                <div className="flex items-center gap-4">
                  <div className={`size-11 flex items-center justify-center rounded-xl ${config.bgColor} ${config.color}`}>
                    <span className="material-symbols-outlined">{config.icon}</span>
                  </div>
                  <div>
                    <p className="text-sm font-bold">{tx.title}</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">{config.name} • {tx.date}</p>
                  </div>
                </div>
                <p className={`text-sm font-bold ${tx.type === 'income' ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600 dark:text-rose-400'}`}>
                  {tx.type === 'income' ? '+' : '-'}${tx.amount.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                </p>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
};

export default HomeView;