
export type CategoryId = 'food' | 'shopping' | 'transport' | 'health' | 'gaming' | 'bills' | 'income' | 'other';

export interface Transaction {
  id: string;
  title: string;
  category: CategoryId;
  amount: number;
  date: string;
  type: 'expense' | 'income';
}

export interface Asset {
  id: string;
  name: string;
  provider: string;
  amount: number;
  type: 'cash' | 'bank' | 'credit' | 'wallet';
  lastSynced?: string;
  available?: number;
  trend?: string;
  gradientClass: string;
}

export enum View {
  Home = 'home',
  Stats = 'stats',
  Add = 'add',
  Assets = 'assets',
  Settings = 'settings'
}
