
import React from 'react';
import { Transaction } from '../types';
import { CATEGORIES } from '../constants';
import { AreaChart, Area, XAxis, YAxis, ResponsiveContainer, Tooltip } from 'recharts';

interface StatsViewProps {
  transactions: Transaction[];
}

const mockChartData = [
  { name: 'Oct 1', value: 120 },
  { name: 'Oct 5', value: 300 },
  { name: 'Oct 10', value: 150 },
  { name: 'Oct 15', value: 450 },
  { name: 'Oct 20', value: 200 },
  { name: 'Oct 25', value: 600 },
  { name: 'Oct 31', value: 380 },
];

const StatsView: React.FC<StatsViewProps> = ({ transactions }) => {
  const totalSpent = transactions.filter(t => t.type === 'expense').reduce((sum, t) => sum + t.amount, 0);

  return (
    <div className="flex flex-col animate-in slide-in-from-right duration-500">
      <header className="sticky top-0 z-20 flex items-center justify-between p-4 bg-background-light/80 dark:bg-background-dark/80 ios-blur">
        <div className="w-10">
          <span className="material-symbols-outlined cursor-pointer">arrow_back_ios</span>
        </div>
        <h1 className="text-lg font-bold">Spending Statistics</h1>
        <div className="w-10 flex justify-end">
          <span className="material-symbols-outlined cursor-pointer">share</span>
        </div>
      </header>

      <main className="p-4 space-y-6">
        {/* Period Selector */}
        <div className="bg-slate-200 dark:bg-slate-800 p-1 rounded-xl flex items-center">
          <button className="flex-1 py-2 text-sm font-semibold rounded-lg text-slate-500 dark:text-slate-400">Weekly</button>
          <button className="flex-1 py-2 text-sm font-semibold rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm">Monthly</button>
          <button className="flex-1 py-2 text-sm font-semibold rounded-lg text-slate-500 dark:text-slate-400">Yearly</button>
        </div>

        {/* Donut Chart Mockup */}
        <div className="flex flex-col items-center justify-center py-6">
          <div className="relative size-[200px] rounded-full flex items-center justify-center shadow-xl overflow-hidden" 
               style={{ background: 'conic-gradient(#138aec 0% 35%, #facc15 35% 60%, #f87171 60% 75%, #4ade80 75% 90%, #a78bfa 90% 100%)' }}>
            <div className="absolute size-[140px] bg-background-light dark:bg-background-dark rounded-full flex flex-col items-center justify-center">
              <span className="text-slate-400 text-xs font-medium">Total Spent</span>
              <span className="text-2xl font-bold">${totalSpent.toLocaleString()}</span>
              <span className="text-red-500 text-xs font-bold">+5.2%</span>
            </div>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white dark:bg-slate-800/50 p-4 rounded-2xl border border-slate-100 dark:border-slate-800">
            <p className="text-slate-400 text-xs mb-1">Daily Average</p>
            <p className="text-xl font-bold">$137.10</p>
          </div>
          <div className="bg-white dark:bg-slate-800/50 p-4 rounded-2xl border border-slate-100 dark:border-slate-800">
            <p className="text-slate-400 text-xs mb-1">Budget Left</p>
            <p className="text-xl font-bold text-primary">$750.00</p>
          </div>
        </div>

        {/* Category Breakdown */}
        <div className="space-y-4">
          <div className="flex justify-between items-end">
            <h3 className="text-lg font-bold">Top Categories</h3>
            <span className="text-primary text-sm font-semibold cursor-pointer">View All</span>
          </div>
          <div className="space-y-5">
            {[
              { id: 'food', pct: 35, val: 1487.50 },
              { id: 'shopping', pct: 25, val: 1062.50 },
              { id: 'transport', pct: 15, val: 637.50 }
            ].map(cat => {
              const config = CATEGORIES[cat.id as keyof typeof CATEGORIES];
              return (
                <div key={cat.id} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`size-10 rounded-full ${config.bgColor} flex items-center justify-center ${config.color}`}>
                        <span className="material-symbols-outlined">{config.icon}</span>
                      </div>
                      <div>
                        <p className="font-semibold">{config.name}</p>
                        <p className="text-xs text-slate-400">{cat.pct}% of total spending</p>
                      </div>
                    </div>
                    <p className="font-bold">${cat.val.toLocaleString()}</p>
                  </div>
                  <div className="h-2 w-full bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
                    <div className={`h-full ${config.color.replace('text-', 'bg-')} rounded-full`} style={{ width: `${cat.pct}%` }}></div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Spending Trend */}
        <div className="bg-white dark:bg-slate-800/50 p-5 rounded-3xl border border-slate-100 dark:border-slate-800">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-bold">Spending Trend</h3>
            <span className="text-xs text-slate-400">Last 30 Days</span>
          </div>
          <div className="h-32 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={mockChartData}>
                <defs>
                  <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="100%">
                    <stop offset="5%" stopColor="#138aec" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#138aec" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <Area type="monotone" dataKey="value" stroke="#138aec" fillOpacity={1} fill="url(#colorValue)" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          <div className="flex justify-between mt-2 text-[10px] text-slate-400 font-medium">
            <span>Oct 1</span>
            <span>Oct 10</span>
            <span>Oct 20</span>
            <span>Oct 31</span>
          </div>
        </div>

        <button className="w-full bg-primary text-white py-4 rounded-2xl font-bold shadow-lg shadow-primary/30 flex items-center justify-center gap-2">
          <span className="material-symbols-outlined text-xl">description</span>
          Generate Full Report
        </button>
      </main>
    </div>
  );
};

export default StatsView;
