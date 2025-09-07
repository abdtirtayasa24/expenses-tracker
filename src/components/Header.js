import React from 'react';
import { format } from 'date-fns';

const Header = ({ 
  darkMode, 
  toggleDarkMode, 
  activeTab, 
  setActiveTab,
  isAuthenticated,
  isSyncing,
  lastSync,
  onGoogleSignIn,
  onGoogleSignOut,
  onSync
}) => {
  return (
    <header className="bg-indigo-600 text-white shadow-lg">
      <div className="container mx-auto px-4 py-4">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <h1 className="text-2xl font-bold">Expense Tracker</h1>
          
          <nav className="mt-4 md:mt-0">
            <ul className="flex flex-wrap space-x-1">
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
          
          <div className="mt-4 md:mt-0 flex items-center space-x-2">
            {/* Google Drive Sync Controls */}
            <div className="flex items-center space-x-2">
              {isAuthenticated ? (
                <>
                  <button
                    onClick={onSync}
                    disabled={isSyncing}
                    className={`px-3 py-2 rounded-lg text-sm font-medium flex items-center ${
                      isSyncing 
                        ? 'bg-gray-500' 
                        : 'bg-green-500 hover:bg-green-600'
                    } text-white transition-colors`}
                  >
                    {isSyncing ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Syncing...
                      </>
                    ) : (
                      <>
                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
                        </svg>
                        Sync
                      </>
                    )}
                  </button>
                  <button
                    onClick={onGoogleSignOut}
                    className="px-3 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg text-sm font-medium transition-colors"
                  >
                    Sign Out
                  </button>
                </>
              ) : (
                <button
                  onClick={onGoogleSignIn}
                  className="px-3 py-2 bg-white text-indigo-600 rounded-lg font-medium hover:bg-gray-100 transition-colors flex items-center"
                >
                  <svg className="w-4 h-4 mr-1" viewBox="0 0 24 24">
                    <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"></path>
                    <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"></path>
                    <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"></path>
                    <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"></path>
                  </svg>
                  Sign In
                </button>
              )}
            </div>
            
            <button
              onClick={toggleDarkMode}
              className="px-3 py-2 bg-white text-indigo-600 rounded-lg font-medium hover:bg-gray-100 transition-colors flex items-center"
            >
              {darkMode ? (
                <>
                  <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"></path>
                  </svg>
                  Light
                </>
              ) : (
                <>
                  <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"></path>
                  </svg>
                  Dark
                </>
              )}
            </button>
          </div>
        </div>
        
        {/* Sync Status */}
        {isAuthenticated && lastSync && (
          <div className="mt-2 text-sm text-indigo-200">
            Last synced: {format(lastSync, 'MMM d, yyyy h:mm a')}
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;