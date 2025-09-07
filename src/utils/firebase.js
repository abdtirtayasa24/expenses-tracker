import { 
  database, 
  ref, 
  set, 
  onValue, 
  push, 
  remove 
} from '../firebase';

// Save data to Firebase for a specific user
export const saveExpenses = (userId, expenses) => {
  const expensesRef = ref(database, `users/${userId}/expenses`);
  return set(expensesRef, expenses);
};

export const saveIncomes = (userId, incomes) => {
  const incomesRef = ref(database, `users/${userId}/incomes`);
  return set(incomesRef, incomes);
};

export const saveCategories = (userId, categories) => {
  const categoriesRef = ref(database, `users/${userId}/categories`);
  return set(categoriesRef, categories);
};

// Listen for data changes for a specific user
export const listenForExpenses = (userId, callback) => {
  const expensesRef = ref(database, `users/${userId}/expenses`);
  return onValue(expensesRef, (snapshot) => {
    const data = snapshot.val();
    callback(data || {});
  });
};

export const listenForIncomes = (userId, callback) => {
  const incomesRef = ref(database, `users/${userId}/incomes`);
  return onValue(incomesRef, (snapshot) => {
    const data = snapshot.val();
    callback(data || {});
  });
};

export const listenForCategories = (userId, callback) => {
  const categoriesRef = ref(database, `users/${userId}/categories`);
  return onValue(categoriesRef, (snapshot) => {
    const data = snapshot.val();
    const defaultCategories = {
      expense: ['Food', 'Transport', 'Entertainment', 'Utilities', 'Other'],
      income: ['Salary', 'Freelance', 'Investment', 'Other']
    };
    callback(data || defaultCategories);
  });
};

// Add new expense for a specific user
export const addExpense = (userId, expense) => {
  const expensesRef = ref(database, `users/${userId}/expenses`);
  return push(expensesRef, expense);
};

// Add new income for a specific user
export const addIncome = (userId, income) => {
  const incomesRef = ref(database, `users/${userId}/incomes`);
  return push(incomesRef, income);
};

// Delete expense for a specific user
export const deleteExpense = (userId, expenseId) => {
  const expenseRef = ref(database, `users/${userId}/expenses/${expenseId}`);
  return remove(expenseRef);
};

// Delete income for a specific user
export const deleteIncome = (userId, incomeId) => {
  const incomeRef = ref(database, `users/${userId}/incomes/${incomeId}`);
  return remove(incomeRef);
};

// Update categories for a specific user
export const updateCategories = (userId, categories) => {
  const categoriesRef = ref(database, `users/${userId}/categories`);
  return set(categoriesRef, categories);
};