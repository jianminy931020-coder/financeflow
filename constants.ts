import { Transaction, Asset, CategoryId } from './types';

export const CATEGORIES: Record<CategoryId, { name: string; icon: string; color: string; bgColor: string }> = {
  food: { name: 'Food & Drink', icon: 'restaurant', color: 'text-rose-600', bgColor: 'bg-rose-100 dark:bg-rose-900/30' },
  shopping: { name: 'Shopping', icon: 'shopping_bag', color: 'text-amber-600', bgColor: 'bg-amber-100 dark:bg-amber-900/30' },
  transport: { name: 'Transportation', icon: 'directions_car', color: 'text-blue-600', bgColor: 'bg-blue-100 dark:bg-blue-900/30' },
  health: { name: 'Health', icon: 'health_and_safety', color: 'text-emerald-600', bgColor: 'bg-emerald-100 dark:bg-emerald-900/30' },
  gaming: { name: 'Gaming', icon: 'sports_esports', color: 'text-purple-600', bgColor: 'bg-purple-100 dark:bg-purple-900/30' },
  bills: { name: 'Bills', icon: 'lightbulb', color: 'text-yellow-600', bgColor: 'bg-yellow-100 dark:bg-yellow-900/30' },
  income: { name: 'Income', icon: 'work', color: 'text-emerald-600', bgColor: 'bg-emerald-100 dark:bg-emerald-900/30' },
  other: { name: 'More', icon: 'more_horiz', color: 'text-slate-600', bgColor: 'bg-slate-100 dark:bg-slate-900/30' }
};

export const INITIAL_TRANSACTIONS: Transaction[] = [
  { id: '1', title: 'Starbucks', category: 'food', amount: 5.50, date: 'Today', type: 'expense' },
  { id: '2', title: 'Uber', category: 'transport', amount: 15.00, date: 'Yesterday', type: 'expense' },
  { id: '3', title: 'Amazon', category: 'shopping', amount: 42.00, date: 'Oct 24', type: 'expense' },
  { id: '4', title: 'Salary Deposit', category: 'income', amount: 2800.00, date: 'Oct 23', type: 'income' },
  { id: '5', title: 'Dinner at Nobu', category: 'food', amount: 120.00, date: 'Oct 22', type: 'expense' },
];

export const INITIAL_ASSETS: Asset[] = [
  { 
    id: 'a1', 
    name: 'Cash', 
    provider: 'Liquid Assets', 
    amount: 1240.00, 
    type: 'cash', 
    trend: '+$40.00 this week',
    gradientClass: 'from-[#1c2227] to-[#202b26]' 
  },
  { 
    id: 'a2', 
    name: 'Bank Card', 
    provider: 'Chase •••• 4291', 
    amount: 15820.50, 
    type: 'bank', 
    lastSynced: '2m ago',
    gradientClass: 'from-[#1c2227] to-[#1a2e3a]' 
  },
  { 
    id: 'a3', 
    name: 'Credit Card', 
    provider: 'Apple Card •••• 1002', 
    amount: -2400.00, 
    type: 'credit', 
    available: 10000,
    gradientClass: 'from-[#1c2227] to-[#2d2222]' 
  },
  { 
    id: 'a4', 
    name: 'Digital Wallet', 
    provider: 'Alipay / WeChat', 
    amount: 3150.25, 
    type: 'wallet',
    gradientClass: 'from-[#1c2227] to-[#252433]' 
  }
];