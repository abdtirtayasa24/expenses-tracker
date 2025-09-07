import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import ExpenseForm from './components/ExpenseForm';
import IncomeForm from './components/IncomeForm';
import CategoryManager from './components/CategoryManager';
import Auth from './components/Auth';
import { 
  onAuthStateChanged, 
  signOut as firebaseSignOut 
} from './firebase';
import { 
  listenForExpenses, 
  listenForIncomes, 
  listenForCategories,
  addExpense,
  addIncome,
  deleteExpense,
  deleteIncome,
  updateCategories
} from './utils/firebase';

const defaultCategories = {
  expense: ['Food', 'Transport', 'Entertainment', 'Utilities', 'Other'],
  income: ['Salary', 'Freelance', 'Investment', 'Other']
};

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [expenses, setExpenses] = useState({});
  const [incomes, setIncomes] = useState({});
  const [categories, setCategories] = useState(defaultCategories);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);

  // Handle authentication state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
        setExpenses({});
        setIncomes({});
        setCategories(defaultCategories);
      }
      setAuthLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // Load user data when authenticated
  useEffect(() => {
    if (!user) {
      setLoading(false);
      return;
    }

    setLoading(true);
    
    // Listen for expenses
    const unsubscribeExpenses = listenForExpenses(user.uid, (data) => {
      setExpenses(data);
    });

    // Listen for incomes
    const unsubscribeIncomes = listenForIncomes(user.uid, (data) => {
      setIncomes(data);
    });

    // Listen for categories
    const unsubscribeCategories = listenForCategories(user.uid, (data) => {
      setCategories(data);
      setLoading(false);
    });

    // Cleanup subscriptions
    return () => {
      unsubscribeExpenses();
      unsubscribeIncomes();
      unsubscribeCategories();
    };
  }, [user]);

  const handleLogin = () => {
    // Login handled by auth state listener
  };

  const handleLogout = async () => {
    try {
      await firebaseSignOut(auth);
      setExpenses({});
      setIncomes({});
      setCategories(defaultCategories);
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  // Toggle dark mode
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  // Add expense
  const handleAddExpense = async (expense) => {
    if (!user) return;
    
    try {
      await addExpense(user.uid, { ...expense, id: Date.now() });
    } catch (error) {
      console.error('Error adding expense:', error);
    }
  };

  // Add income
  const handleAddIncome = async (income) => {
    if (!user) return;
    
    try {
      await addIncome(user.uid, { ...income, id: Date.now() });
    } catch (error) {
      console.error('Error adding income:', error);
    }
  };

  // Delete expense
  const handleDeleteExpense = async (id) => {
    if (!user) return;
    
    try {
      // Find the expense key in Firebase
      const expenseKey = Object.keys(expenses).find(key => expenses[key].id === id);
      if (expenseKey) {
        await deleteExpense(user.uid, expenseKey);
      }
    } catch (error) {
      console.error('Error deleting expense:', error);
    }
  };

  // Delete income
  const handleDeleteIncome = async (id) => {
    if (!user) return;
    
    try {
      // Find the income key in Firebase
      const incomeKey = Object.keys(incomes).find(key => incomes[key].id === id);
      if (incomeKey) {
        await deleteIncome(user.uid, incomeKey);
      }
    } catch (error) {
      console.error('Error deleting income:', error);
    }
  };

  // Add category
  const handleAddCategory = async (type, category) => {
    if (!user) return;
    
    if (!categories[type].includes(category)) {
      try {
        const updatedCategories = {
          ...categories,
          [type]: [...categories[type], category]
        };
        setCategories(updatedCategories);
        await updateCategories(user.uid, updatedCategories);
      } catch (error) {
        console.error('Error adding category:', error);
      }
    }
  };

  // Delete category
  const handleDeleteCategory = async (type, category) => {
    if (!user) return;
    
    try {
      const updatedCategories = {
        ...categories,
        [type]: categories[type].filter(cat => cat !== category)
      };
      setCategories(updatedCategories);
      await updateCategories(user.uid, updatedCategories);
    } catch (error) {
      console.error('Error deleting category:', error);
    }
  };

  // Show loading screen while checking auth state
  if (authLoading) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${darkMode ? 'dark bg-gray-900' : 'bg-gray-50'}`}>
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
          <p className="mt-4 text-lg">Initializing app...</p>
        </div>
      </div>
    );
  }

  // Show login screen if not authenticated
  if (!user) {
    return <Auth onLogin={handleLogin} />;
  }

  // Show loading screen while loading user data
  if (loading) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${darkMode ? 'dark bg-gray-900' : 'bg-gray-50'}`}>
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
          <p className="mt-4 text-lg">Loading your financial data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen ${darkMode ? 'dark bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
      <Header 
        darkMode={darkMode} 
        toggleDarkMode={toggleDarkMode} 
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        user={user}
        onLogout={handleLogout}
      />
      
      <main className="container mx-auto px-4 py-8">
        {activeTab === 'dashboard' && (
          <Dashboard 
            expenses={Object.values(expenses)} 
            incomes={Object.values(incomes)} 
            categories={categories}
          />
        )}
        
        {activeTab === 'expenses' && (
          <ExpenseForm 
            categories={categories.expense} 
            onAddExpense={handleAddExpense}
            expenses={Object.values(expenses)}
            onDeleteExpense={handleDeleteExpense}
          />
        )}
        
        {activeTab === 'income' && (
          <IncomeForm 
            categories={categories.income} 
            onAddIncome={handleAddIncome}
            incomes={Object.values(incomes)}
            onDeleteIncome={handleDeleteIncome}
          />
        )}
        
        {activeTab === 'categories' && (
          <CategoryManager 
            categories={categories} 
            onAddCategory={handleAddCategory}
            onDeleteCategory={handleDeleteCategory}
          />
        )}
      </main>
    </div>
  );
}

export default App;