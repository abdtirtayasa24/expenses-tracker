import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import ExpenseForm from './components/ExpenseForm';
import IncomeForm from './components/IncomeForm';
import CategoryManager from './components/CategoryManager';
import { getData, saveData } from './utils/localStorage';
import googleDriveService from './services/googleDrive';

const defaultCategories = {
  expense: ['Food', 'Transport', 'Entertainment', 'Utilities', 'Other'],
  income: ['Salary', 'Freelance', 'Investment', 'Other']
};

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [expenses, setExpenses] = useState([]);
  const [incomes, setIncomes] = useState([]);
  const [categories, setCategories] = useState(defaultCategories);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);
  const [lastSync, setLastSync] = useState(null);

  // Load data from localStorage on initial render
  useEffect(() => {
    const savedData = getData();
    if (savedData) {
      setExpenses(savedData.expenses || []);
      setIncomes(savedData.incomes || []);
      setCategories(savedData.categories || defaultCategories);
    }
    
    // Initialize Google Drive service
    const initGoogleDrive = async () => {
      try {
        await googleDriveService.initClient();
        setIsAuthenticated(googleDriveService.isAuthenticated);
      } catch (error) {
        console.error('Failed to initialize Google Drive:', error);
      }
    };
    
    initGoogleDrive();
  }, []);

  // Save data to localStorage whenever it changes
  useEffect(() => {
    saveData({ expenses, incomes, categories });
  }, [expenses, incomes, categories]);

  // Sync with Google Drive when authenticated
  useEffect(() => {
    if (isAuthenticated) {
      autoSync();
    }
  }, [isAuthenticated]);

  const autoSync = async () => {
    try {
      setIsSyncing(true);
      // Load data from Google Drive
      const cloudData = await googleDriveService.loadData();
      if (cloudData) {
        setExpenses(cloudData.expenses || []);
        setIncomes(cloudData.incomes || []);
        setCategories(cloudData.categories || defaultCategories);
      }
      setLastSync(new Date());
    } catch (error) {
      console.error('Auto sync failed:', error);
    } finally {
      setIsSyncing(false);
    }
  };

  // Toggle dark mode
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  // Add expense
  const addExpense = (expense) => {
    const newExpense = { ...expense, id: Date.now() };
    setExpenses(prev => [...prev, newExpense]);
  };

  // Add income
  const addIncome = (income) => {
    const newIncome = { ...income, id: Date.now() };
    setIncomes(prev => [...prev, newIncome]);
  };

  // Delete expense
  const deleteExpense = (id) => {
    setExpenses(prev => prev.filter(expense => expense.id !== id));
  };

  // Delete income
  const deleteIncome = (id) => {
    setIncomes(prev => prev.filter(income => income.id !== id));
  };

  // Add category
  const addCategory = (type, category) => {
    if (!categories[type].includes(category)) {
      setCategories(prev => ({
        ...prev,
        [type]: [...prev[type], category]
      }));
    }
  };

  // Delete category
  const deleteCategory = (type, category) => {
    setCategories(prev => ({
      ...prev,
      [type]: prev[type].filter(cat => cat !== category)
    }));
    
    // Remove all expenses/incomes with this category
    if (type === 'expense') {
      setExpenses(prev => prev.filter(expense => expense.category !== category));
    } else {
      setIncomes(prev => prev.filter(income => income.category !== category));
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      const result = await googleDriveService.signIn();
      setIsAuthenticated(result);
      
      if (result) {
        // After sign in, sync data
        await autoSync();
      }
    } catch (error) {
      console.error('Google Sign In failed:', error);
    }
  };

  const handleGoogleSignOut = () => {
    googleDriveService.signOut();
    setIsAuthenticated(false);
  };

  const handleSync = async () => {
    if (!isAuthenticated) return;
    
    try {
      setIsSyncing(true);
      
      // Save current data to Google Drive
      await googleDriveService.saveData({ expenses, incomes, categories });
      
      // Load any changes from Google Drive
      const cloudData = await googleDriveService.loadData();
      if (cloudData) {
        setExpenses(cloudData.expenses || []);
        setIncomes(cloudData.incomes || []);
        setCategories(cloudData.categories || defaultCategories);
      }
      
      setLastSync(new Date());
    } catch (error) {
      console.error('Sync failed:', error);
    } finally {
      setIsSyncing(false);
    }
  };

  return (
    <div className={`min-h-screen ${darkMode ? 'dark bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
      <Header 
        darkMode={darkMode} 
        toggleDarkMode={toggleDarkMode} 
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        isAuthenticated={isAuthenticated}
        isSyncing={isSyncing}
        lastSync={lastSync}
        onGoogleSignIn={handleGoogleSignIn}
        onGoogleSignOut={handleGoogleSignOut}
        onSync={handleSync}
      />
      
      <main className="container mx-auto px-4 py-8">
        {activeTab === 'dashboard' && (
          <Dashboard 
            expenses={expenses} 
            incomes={incomes} 
            categories={categories}
          />
        )}
        
        {activeTab === 'expenses' && (
          <ExpenseForm 
            categories={categories.expense} 
            onAddExpense={addExpense}
            expenses={expenses}
            onDeleteExpense={deleteExpense}
          />
        )}
        
        {activeTab === 'income' && (
          <IncomeForm 
            categories={categories.income} 
            onAddIncome={addIncome}
            incomes={incomes}
            onDeleteIncome={deleteIncome}
          />
        )}
        
        {activeTab === 'categories' && (
          <CategoryManager 
            categories={categories} 
            onAddCategory={addCategory}
            onDeleteCategory={deleteCategory}
          />
        )}
      </main>
    </div>
  );
}

export default App;