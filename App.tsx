
import React, { useState, useMemo, useEffect } from 'react';
import { View, Transaction, Asset, CategoryId } from './types';
import { INITIAL_TRANSACTIONS, INITIAL_ASSETS, CATEGORIES } from './constants';
import HomeView from './components/HomeView';
import StatsView from './components/StatsView';
import AddTransactionView from './components/AddTransactionView';
import AssetsView from './components/AssetsView';
import NavigationBar from './components/NavigationBar';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<View>(View.Home);
  const [transactions, setTransactions] = useState<Transaction[]>(INITIAL_TRANSACTIONS);
  const [assets, setAssets] = useState<Asset[]>(INITIAL_ASSETS);

  const totalBalance = useMemo(() => {
    return assets.reduce((sum, asset) => sum + asset.amount, 0);
  }, [assets]);

  const monthlyStats = useMemo(() => {
    const income = transactions
      .filter(t => t.type === 'income')
      .reduce((sum, t) => sum + t.amount, 0);
    const expenses = transactions
      .filter(t => t.type === 'expense')
      .reduce((sum, t) => sum + t.amount, 0);
    return { income, expenses };
  }, [transactions]);

  const handleAddTransaction = (newTx: Transaction) => {
    setTransactions(prev => [newTx, ...prev]);
    // Simplistic asset update: update cash for now
    setAssets(prev => prev.map(asset => {
      if (asset.type === 'cash' || asset.type === 'wallet') {
         return { ...asset, amount: asset.amount + (newTx.type === 'income' ? newTx.amount : -newTx.amount) };
      }
      return asset;
    }));
    setCurrentView(View.Home);
  };

  const renderView = () => {
    switch (currentView) {
      case View.Home:
        return (
          <HomeView 
            transactions={transactions} 
            totalBalance={totalBalance} 
            monthlyStats={monthlyStats} 
          />
        );
      case View.Stats:
        return <StatsView transactions={transactions} />;
      case View.Add:
        return <AddTransactionView onSave={handleAddTransaction} onClose={() => setCurrentView(View.Home)} />;
      case View.Assets:
        return <AssetsView assets={assets} totalNetWorth={totalBalance} />;
      case View.Settings:
        return (
          <div className="flex flex-col items-center justify-center min-h-[80vh] p-8 text-center">
            <span className="material-symbols-outlined text-6xl text-primary mb-4">settings</span>
            <h2 className="text-2xl font-bold mb-2">Settings</h2>
            <p className="text-slate-500">Profile management and application preferences.</p>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="relative mx-auto min-h-screen max-w-md bg-background-light dark:bg-background-dark flex flex-col shadow-2xl border-x border-slate-200 dark:border-slate-800">
      <main className={`flex-1 overflow-y-auto ${currentView !== View.Add ? 'pb-24' : ''}`}>
        {renderView()}
      </main>
      
      {currentView !== View.Add && (
        <NavigationBar 
          currentView={currentView} 
          onViewChange={setCurrentView} 
          onAddClick={() => setCurrentView(View.Add)}
        />
      )}
    </div>
  );
};

export default App;
