export const getData = () => {
  try {
    const data = localStorage.getItem('expenseTrackerData');
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.error('Error loading data from localStorage:', error);
    return null;
  }
};

export const saveData = (data) => {
  try {
    localStorage.setItem('expenseTrackerData', JSON.stringify(data));
  } catch (error) {
    console.error('Error saving data to localStorage:', error);
  }
};