
import React, { useState } from 'react';
import { Transaction, CategoryId } from '../types';
import { CATEGORIES } from '../constants';

interface AddTransactionViewProps {
  onSave: (tx: Transaction) => void;
  onClose: () => void;
}

const AddTransactionView: React.FC<AddTransactionViewProps> = ({ onSave, onClose }) => {
  const [amount, setAmount] = useState('0');
  const [selectedCategory, setSelectedCategory] = useState<CategoryId>('food');
  const [type, setType] = useState<'expense' | 'income'>('expense');

  const handleKeyPress = (key: string) => {
    if (key === 'backspace') {
      setAmount(prev => prev.length > 1 ? prev.slice(0, -1) : '0');
    } else if (key === '.') {
      if (!amount.includes('.')) {
        setAmount(prev => prev + '.');
      }
    } else {
      setAmount(prev => prev === '0' ? key : prev + key);
    }
  };

  const handleSave = () => {
    const numericAmount = parseFloat(amount);
    if (isNaN(numericAmount) || numericAmount === 0) return;

    onSave({
      id: Date.now().toString(),
      title: CATEGORIES[selectedCategory].name,
      category: selectedCategory,
      amount: numericAmount,
      date: 'Today',
      type: type
    });
  };

  return (
    <div className="flex flex-col h-screen bg-background-light dark:bg-background-dark animate-in slide-in-from-bottom duration-300">
      <div className="flex items-center p-4 justify-between shrink-0">
        <button onClick={onClose} className="text-slate-600 dark:text-slate-400 hover:text-primary transition-colors">
          <span className="material-symbols-outlined">close</span>
        </button>
        <h2 className="text-lg font-semibold leading-tight tracking-tight flex-1 text-center pr-2">Add {type === 'expense' ? 'Expense' : 'Income'}</h2>
        <button onClick={() => setAmount('0')} className="text-primary font-semibold text-sm">Reset</button>
      </div>

      <div className="flex-1 overflow-y-auto no-scrollbar pb-80">
        <div className="px-4 py-8 text-center">
          <p className="text-slate-500 dark:text-slate-400 text-sm font-medium mb-1">Enter Amount</p>
          <div className="flex items-center justify-center gap-1">
            <span className="text-primary text-4xl font-bold leading-tight">$</span>
            <h1 className="tracking-tight text-5xl font-bold leading-tight">{amount}</h1>
            <span className="w-[3px] h-10 bg-primary animate-pulse ml-1"></span>
          </div>
        </div>

        <div className="px-6 flex justify-center gap-4 mb-6">
          <div className="flex items-center gap-2 bg-slate-200 dark:bg-slate-800/50 px-3 py-1.5 rounded-full border border-slate-300 dark:border-slate-700">
            <span className="material-symbols-outlined text-[18px]">calendar_today</span>
            <span className="text-xs font-medium">Today</span>
          </div>
          <button 
            onClick={() => setType(type === 'expense' ? 'income' : 'expense')}
            className="flex items-center gap-2 bg-slate-200 dark:bg-slate-800/50 px-3 py-1.5 rounded-full border border-slate-300 dark:border-slate-700"
          >
            <span className="material-symbols-outlined text-[18px]">{type === 'expense' ? 'arrow_upward' : 'arrow_downward'}</span>
            <span className="text-xs font-medium uppercase">{type}</span>
          </button>
        </div>

        <div className="px-4">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 px-2 mb-3">Select Category</h3>
          <div className="grid grid-cols-4 gap-3">
            {Object.entries(CATEGORIES).map(([id, config]) => (
              <div 
                key={id} 
                onClick={() => setSelectedCategory(id as CategoryId)}
                className={`flex flex-col items-center gap-2 p-3 rounded-xl border-2 transition-all cursor-pointer ${
                  selectedCategory === id 
                    ? 'border-primary bg-primary/10 text-primary' 
                    : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/50 text-slate-600 dark:text-slate-400'
                }`}
              >
                <span className="material-symbols-outlined text-2xl">{config.icon}</span>
                <span className={`text-[11px] ${selectedCategory === id ? 'font-bold' : 'font-medium'}`}>{config.name.split(' ')[0]}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 w-full bg-white dark:bg-[#15202b] border-t border-slate-200 dark:border-slate-800 px-2 pb-8 pt-4 z-50">
        <div className="grid grid-cols-3 gap-1 mb-4">
          {[1,2,3,4,5,6,7,8,9,'.',0,'backspace'].map(key => (
            <button 
              key={key} 
              onClick={() => handleKeyPress(key.toString())}
              className="h-14 flex items-center justify-center text-xl font-semibold rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 active:scale-95 transition-transform"
            >
              {key === 'backspace' ? <span className="material-symbols-outlined text-slate-400">backspace</span> : key}
            </button>
          ))}
        </div>
        <div className="px-2">
          <button 
            onClick={handleSave}
            className="w-full bg-primary hover:bg-primary/90 text-white font-bold py-4 rounded-xl shadow-lg shadow-primary/20 flex items-center justify-center gap-2 active:scale-[0.98] transition-all"
          >
            <span className="material-symbols-outlined">check_circle</span>
            Save Transaction
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddTransactionView;
