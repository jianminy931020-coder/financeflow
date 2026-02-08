
import React from 'react';
import { View } from '../types';

interface NavigationBarProps {
  currentView: View;
  onViewChange: (view: View) => void;
  onAddClick: () => void;
}

const NavigationBar: React.FC<NavigationBarProps> = ({ currentView, onViewChange, onAddClick }) => {
  const tabs = [
    { view: View.Home, label: 'Home', icon: 'home' },
    { view: View.Stats, label: 'Stats', icon: 'bar_chart' },
    { view: View.Assets, label: 'Assets', icon: 'account_balance_wallet' },
    { view: View.Settings, label: 'Settings', icon: 'settings' }
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 mx-auto max-w-md bg-white/90 dark:bg-background-dark/90 ios-blur border-t border-slate-200 dark:border-slate-800 px-6 py-3 z-40">
      <div className="flex items-center justify-between">
        {tabs.slice(0, 2).map(tab => (
          <button 
            key={tab.view}
            onClick={() => onViewChange(tab.view)}
            className={`flex flex-col items-center gap-1 transition-colors ${currentView === tab.view ? 'text-primary' : 'text-slate-400 dark:text-slate-500'}`}
          >
            <span className={`material-symbols-outlined text-[26px] ${currentView === tab.view ? '[font-variation-settings:\'FILL\'_1]' : ''}`}>
              {tab.icon}
            </span>
            <span className={`text-[10px] ${currentView === tab.view ? 'font-bold' : 'font-medium'}`}>{tab.label}</span>
          </button>
        ))}

        <button 
          onClick={onAddClick}
          className="size-14 rounded-full bg-primary text-white shadow-lg shadow-primary/40 flex items-center justify-center -mt-10 active:scale-95 transition-transform"
        >
          <span className="material-symbols-outlined text-3xl">add</span>
        </button>

        {tabs.slice(2).map(tab => (
          <button 
            key={tab.view}
            onClick={() => onViewChange(tab.view)}
            className={`flex flex-col items-center gap-1 transition-colors ${currentView === tab.view ? 'text-primary' : 'text-slate-400 dark:text-slate-500'}`}
          >
            <span className={`material-symbols-outlined text-[26px] ${currentView === tab.view ? '[font-variation-settings:\'FILL\'_1]' : ''}`}>
              {tab.icon}
            </span>
            <span className={`text-[10px] ${currentView === tab.view ? 'font-bold' : 'font-medium'}`}>{tab.label}</span>
          </button>
        ))}
      </div>
      <div className="mt-4 mx-auto w-32 h-1 bg-slate-300 dark:bg-slate-700 rounded-full"></div>
    </nav>
  );
};

export default NavigationBar;
