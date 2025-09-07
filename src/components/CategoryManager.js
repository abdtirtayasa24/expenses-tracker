import React, { useState } from 'react';

const CategoryManager = ({ categories, onAddCategory, onDeleteCategory }) => {
  const [newExpenseCategory, setNewExpenseCategory] = useState('');
  const [newIncomeCategory, setNewIncomeCategory] = useState('');

  const handleAddExpenseCategory = (e) => {
    e.preventDefault();
    if (newExpenseCategory.trim()) {
      onAddCategory('expense', newExpenseCategory.trim());
      setNewExpenseCategory('');
    }
  };

  const handleAddIncomeCategory = (e) => {
    e.preventDefault();
    if (newIncomeCategory.trim()) {
      onAddCategory('income', newIncomeCategory.trim());
      setNewIncomeCategory('');
    }
  };

  const handleDeleteCategory = (type, category) => {
    if (window.confirm(`Are you sure you want to delete the "${category}" category? This will also delete all related transactions.`)) {
      onDeleteCategory(type, category);
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Manage Categories</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Expense Categories */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
          <h3 className="text-xl font-semibold mb-4">Expense Categories</h3>
          
          <form onSubmit={handleAddExpenseCategory} className="mb-6">
            <div className="flex">
              <input
                type="text"
                value={newExpenseCategory}
                onChange={(e) => setNewExpenseCategory(e.target.value)}
                placeholder="Add new expense category"
                className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-l-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-indigo-600 text-white rounded-r-lg hover:bg-indigo-700"
              >
                Add
              </button>
            </div>
          </form>
          
          <div className="flex flex-wrap gap-2">
            {categories.expense.map((category) => (
              <div key={category} className="flex items-center bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-100 px-3 py-1 rounded-full">
                <span>{category}</span>
                <button
                  onClick={() => handleDeleteCategory('expense', category)}
                  className="ml-2 text-red-600 hover:text-red-900 dark:text-red-300 dark:hover:text-red-100"
                >
                  &times;
                </button>
              </div>
            ))}
          </div>
        </div>
        
        {/* Income Categories */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
          <h3 className="text-xl font-semibold mb-4">Income Categories</h3>
          
          <form onSubmit={handleAddIncomeCategory} className="mb-6">
            <div className="flex">
              <input
                type="text"
                value={newIncomeCategory}
                onChange={(e) => setNewIncomeCategory(e.target.value)}
                placeholder="Add new income category"
                className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-l-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-indigo-600 text-white rounded-r-lg hover:bg-indigo-700"
              >
                Add
              </button>
            </div>
          </form>
          
          <div className="flex flex-wrap gap-2">
            {categories.income.map((category) => (
              <div key={category} className="flex items-center bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-100 px-3 py-1 rounded-full">
                <span>{category}</span>
                <button
                  onClick={() => handleDeleteCategory('income', category)}
                  className="ml-2 text-green-600 hover:text-green-900 dark:text-green-300 dark:hover:text-green-100"
                >
                  &times;
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryManager;