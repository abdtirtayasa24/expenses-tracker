import React from 'react';
import { Bar, Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

// helper: safe parse number
const safeNum = (v) => {
  const n = Number(v);
  return Number.isFinite(n) ? n : 0;
};

// helper: generate palette (returns { background:[], border:[] })
const getColorPalette = (n) => {
  const baseBg = [
    'rgba(255, 99, 132, 0.6)',
    'rgba(54, 162, 235, 0.6)',
    'rgba(255, 206, 86, 0.6)',
    'rgba(75, 192, 192, 0.6)',
    'rgba(153, 102, 255, 0.6)',
    'rgba(255, 159, 64, 0.6)',
  ];
  const baseBorder = baseBg.map(c => c.replace(/0\.6\)$/, '1)'));

  if (n <= baseBg.length) {
    return { background: baseBg.slice(0, n), border: baseBorder.slice(0, n) };
  }

  // generate HSL-based colors when need > base length
  const bg = [];
  const br = [];
  for (let i = 0; i < n; i++) {
    const hue = Math.round((i * 360) / n);
    bg.push(`hsla(${hue}, 72%, 55%, 0.6)`);
    br.push(`hsl(${hue}, 72%, 45%)`);
  }
  return { background: bg, border: br };
};

const Dashboard = ({
  expenses = [],
  incomes = [],
  categories = { expense: [], income: [] }
}) => {
  // totals
  const totalExpenses = expenses.reduce((sum, e) => sum + safeNum(e.amount), 0);
  const totalIncome = incomes.reduce((sum, i) => sum + safeNum(i.amount), 0);
  const balance = totalIncome - totalExpenses;

  // income vs expenses
  const incomeVsExpensesData = {
    labels: ['Income', 'Expenses'],
    datasets: [
      {
        label: 'Amount ($)',
        data: [totalIncome, totalExpenses],
        backgroundColor: [
          'rgba(75, 192, 192, 0.6)',
          'rgba(255, 99, 132, 0.6)',
        ],
        borderColor: [
          'rgba(75, 192, 192, 1)',
          'rgba(255, 99, 132, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  // expenses by category (safe)
  const expenseLabels = Array.isArray(categories.expense) ? categories.expense : [];
  const expenseValues = expenseLabels.map(cat =>
    expenses
      .filter(exp => exp.category === cat)
      .reduce((s, ex) => s + safeNum(ex.amount), 0)
  );
  const expenseColors = getColorPalette(expenseLabels.length);

  const expenseCategoryData = {
    labels: expenseLabels,
    datasets: [
      {
        label: 'Expenses by Category',
        data: expenseValues,
        backgroundColor: expenseColors.background,
        borderColor: expenseColors.border,
        borderWidth: 1,
      },
    ],
  };

  // income by category
  const incomeLabels = Array.isArray(categories.income) ? categories.income : [];
  const incomeValues = incomeLabels.map(cat =>
    incomes
      .filter(inc => inc.category === cat)
      .reduce((s, it) => s + safeNum(it.amount), 0)
  );
  const incomeColors = getColorPalette(incomeLabels.length);

  const incomeCategoryData = {
    labels: incomeLabels,
    datasets: [
      {
        label: 'Income by Category',
        data: incomeValues,
        backgroundColor: incomeColors.background,
        borderColor: incomeColors.border,
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: false,
      }
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Dashboard</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-indigo-100 dark:bg-indigo-900 rounded-lg p-6 shadow">
          <h3 className="text-lg font-semibold text-indigo-800 dark:text-indigo-200">Total Income</h3>
          <p className="text-3xl font-bold text-indigo-600 dark:text-indigo-300">Rp{Number(totalIncome).toLocaleString("id-ID")}</p>
        </div>

        <div className="bg-red-100 dark:bg-red-900 rounded-lg p-6 shadow">
          <h3 className="text-lg font-semibold text-red-800 dark:text-red-200">Total Expenses</h3>
          <p className="text-3xl font-bold text-red-600 dark:text-red-300">Rp{Number(totalExpenses).toLocaleString("id-ID")}</p>
        </div>

        <div className={`rounded-lg p-6 shadow ${balance >= 0 ? 'bg-green-100 dark:bg-green-900' : 'bg-yellow-100 dark:bg-yellow-900'}`}>
          <h3 className={`text-lg font-semibold ${balance >= 0 ? 'text-green-800 dark:text-green-200' : 'text-yellow-800 dark:text-yellow-200'}`}>Balance</h3>
          <p className={`text-3xl font-bold ${balance >= 0 ? 'text-green-600 dark:text-green-300' : 'text-yellow-600 dark:text-yellow-300'}`}>Rp{balance.toFixed(0)}</p>
        </div>
      </div>

      {/* Updated layout: swapped positions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8" style={{ minHeight: 320 }}>
        {/* Income by Category (moved to top left) */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow" style={{ minHeight: 320 }}>
          <h3 className="text-xl font-semibold mb-4">Income by Category</h3>
          <div style={{ height: 250 }}>
            <Doughnut data={incomeCategoryData} options={options} />
          </div>
        </div>

        {/* Expenses by Category (moved to top right) */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow" style={{ minHeight: 320 }}>
          <h3 className="text-xl font-semibold mb-4">Expenses by Category</h3>
          <div style={{ height: 250 }}>
            <Doughnut data={expenseCategoryData} options={options} />
          </div>
        </div>

        {/* Income vs Expenses (moved to bottom full width) */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow lg:col-span-2" style={{ minHeight: 320 }}>
          <h3 className="text-xl font-semibold mb-4">Income vs Expenses</h3>
          <div style={{ height: 300 }}>
            <Bar data={incomeVsExpensesData} options={options} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;