import React from 'react';

const Header = ({ darkMode, toggleDarkMode, activeTab, setActiveTab, user, onLogout }) => {
  return (
    <header className="bg-indigo-600 text-white shadow-lg">
      <div className="container mx-auto px-4 py-4">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div className="flex items-center">
            <h1 className="text-2xl font-bold">Expense Tracker</h1>
            {user && (
              <span className="ml-4 text-sm bg-indigo-700 px-3 py-1 rounded-full hidden md:inline">
                {user.email}
              </span>
            )}
          </div>
          
          <nav className="mt-4 md:mt-0">
            <ul className="flex space-x-1">
              <li>
                <button
                  onClick={() => setActiveTab('dashboard')}
                  className={`px-4 py-2 rounded-lg transition-colors ${
                    activeTab === 'dashboard'
                      ? 'bg-white text-indigo-600 font-medium'
                      : 'hover:bg-indigo-700'
                  }`}
                >
                  Dashboard
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab('expenses')}
                  className={`px-4 py-2 rounded-lg transition-colors ${
                    activeTab === 'expenses'
                      ? 'bg-white text-indigo-600 font-medium'
                      : 'hover:bg-indigo-700'
                  }`}
                >
                  Expenses
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab('income')}
                  className={`px-4 py-2 rounded-lg transition-colors ${
                    activeTab === 'income'
                      ? 'bg-white text-indigo-600 font-medium'
                      : 'hover:bg-indigo-700'
                  }`}
                >
                  Income
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab('categories')}
                  className={`px-4 py-2 rounded-lg transition-colors ${
                    activeTab === 'categories'
                      ? 'bg-white text-indigo-600 font-medium'
                      : 'hover:bg-indigo-700'
                  }`}
                >
                  Categories
                </button>
              </li>
            </ul>
          </nav>
          
          <div className="mt-4 md:mt-0 flex items-center space-x-3">
            {user && (
              <button
                onClick={onLogout}
                className="px-4 py-2 bg-red-500 text-white rounded-lg font-medium hover:bg-red-600 transition-colors"
              >
                Logout
              </button>
            )}
            <button
              onClick={toggleDarkMode}
              className="px-4 py-2 bg-white text-indigo-600 rounded-lg font-medium hover:bg-gray-100 transition-colors"
            >
              {darkMode ? 'Light Mode' : 'Dark Mode'}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;