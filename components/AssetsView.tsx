
import React from 'react';
import { Asset } from '../types';

interface AssetsViewProps {
  assets: Asset[];
  totalNetWorth: number;
}

const AssetsView: React.FC<AssetsViewProps> = ({ assets, totalNetWorth }) => {
  return (
    <div className="flex flex-col animate-in slide-in-from-bottom duration-500">
      <header className="sticky top-0 z-50 bg-background-light/80 dark:bg-background-dark/80 ios-blur px-4 py-3 flex items-center justify-between border-b border-slate-200 dark:border-slate-800">
        <div className="flex items-center gap-3">
          <div className="size-9 rounded-full bg-primary/20 flex items-center justify-center overflow-hidden">
             <div className="w-full h-full bg-cover bg-center" style={{ backgroundImage: 'url("https://picsum.photos/seed/alex2/100/100")' }}></div>
          </div>
          <h1 className="text-xl font-bold tracking-tight">My Assets</h1>
        </div>
        <div className="flex items-center gap-2">
          <button className="p-2 rounded-full hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors">
            <span className="material-symbols-outlined text-primary">visibility</span>
          </button>
          <button className="p-2 rounded-full hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors">
            <span className="material-symbols-outlined">add_circle</span>
          </button>
        </div>
      </header>

      <main className="p-4 space-y-4">
        {assets.map(asset => (
          <div 
            key={asset.id} 
            className={`bg-gradient-to-br ${asset.gradientClass} p-5 rounded-xl border border-slate-800 shadow-lg relative overflow-hidden group`}
          >
            <div className="flex justify-between items-start mb-6">
              <div className="flex items-center gap-3">
                <div className={`size-10 rounded-lg bg-white/10 flex items-center justify-center text-white`}>
                  <span className="material-symbols-outlined">{
                    asset.type === 'cash' ? 'payments' : 
                    asset.type === 'bank' ? 'account_balance' :
                    asset.type === 'credit' ? 'credit_card' : 'account_balance_wallet'
                  }</span>
                </div>
                <div>
                  <h3 className="font-semibold text-white">{asset.name}</h3>
                  <p className="text-xs text-slate-400">{asset.provider}</p>
                </div>
              </div>
              {asset.type === 'credit' ? (
                <button className="bg-primary px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider text-white">Pay Bill</button>
              ) : (
                <span className="material-symbols-outlined text-slate-500 group-hover:text-primary transition-colors cursor-pointer">more_horiz</span>
              )}
            </div>
            <div className="space-y-1">
              <p className="text-3xl font-bold tracking-tighter text-white">
                {asset.amount < 0 ? '-' : ''}${Math.abs(asset.amount).toLocaleString(undefined, { minimumFractionDigits: 2 })}
              </p>
              {asset.trend && (
                <div className="flex items-center gap-1 text-green-400 text-xs font-medium">
                  <span className="material-symbols-outlined text-xs">trending_up</span>
                  <span>{asset.trend}</span>
                </div>
              )}
              {asset.lastSynced && <p className="text-xs text-slate-400">Last synced {asset.lastSynced}</p>}
              {asset.available !== undefined && <p className="text-xs text-slate-400">Available: ${asset.available.toLocaleString()}</p>}
            </div>
          </div>
        ))}

        <div className="bg-slate-100 dark:bg-slate-800/50 p-4 rounded-xl flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="material-symbols-outlined text-primary">info</span>
            <span className="text-sm font-medium">Monthly spending is down 12%</span>
          </div>
          <span className="material-symbols-outlined text-slate-400 text-sm">chevron_right</span>
        </div>

        {/* Floating Summary Info for Assets View */}
        <div className="space-y-0.5 mt-8 p-4 border-t border-slate-200 dark:border-slate-800">
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-widest">Total Net Worth</p>
          <div className="flex items-baseline gap-2">
            <p className="text-4xl font-extrabold tracking-tighter text-primary">
              ${totalNetWorth.toLocaleString(undefined, { minimumFractionDigits: 2 })}
            </p>
            <span className="text-green-500 text-sm font-bold">+2.4%</span>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AssetsView;
