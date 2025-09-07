import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import ExpenseForm from './components/ExpenseForm';
import IncomeForm from './components/IncomeForm';
import CategoryManager from './components/CategoryManager';
import { getData, saveData } from './utils/localStorage';

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

  // Load data from localStorage on initial render
  useEffect(() => {
    const savedData = getData();
    if (savedData) {
      setExpenses(savedData.expenses || []);
      setIncomes(savedData.incomes || []);
      setCategories(savedData.categories || defaultCategories);
    }
  }, []);

  // Save data to localStorage whenever it changes
  useEffect(() => {
    saveData({ expenses, incomes, categories });
  }, [expenses, incomes, categories]);

  // Toggle dark mode
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  // Add expense
  const addExpense = (expense) => {
    setExpenses([...expenses, { ...expense, id: Date.now() }]);
  };

  // Add income
  const addIncome = (income) => {
    setIncomes([...incomes, { ...income, id: Date.now() }]);
  };

  // Delete expense
  const deleteExpense = (id) => {
    setExpenses(expenses.filter(expense => expense.id !== id));
  };

  // Delete income
  const deleteIncome = (id) => {
    setIncomes(incomes.filter(income => income.id !== id));
  };

  // Add category
  const addCategory = (type, category) => {
    if (!categories[type].includes(category)) {
      setCategories({
        ...categories,
        [type]: [...categories[type], category]
      });
    }
  };

  // Delete category
  const deleteCategory = (type, category) => {
    setCategories({
      ...categories,
      [type]: categories[type].filter(cat => cat !== category)
    });
    
    // Remove all expenses/incomes with this category
    if (type === 'expense') {
      setExpenses(expenses.filter(expense => expense.category !== category));
    } else {
      setIncomes(incomes.filter(income => income.category !== category));
    }
  };

  return (
    <div className={`min-h-screen ${darkMode ? 'dark bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
      <Header 
        darkMode={darkMode} 
        toggleDarkMode={toggleDarkMode} 
        activeTab={activeTab}
        setActiveTab={setActiveTab}
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