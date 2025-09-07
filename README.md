# Expense Tracker

A fully functional interactive expense tracker built with **React**, **TailwindCSS**, and **Chart.js**.

## ✨ Features

- Track expenses and income with amount, category, note, and date
- Manage categories for both expenses and income
- View dashboard with interactive charts showing:
  - Income vs Expenses comparison
  - Expense breakdown by category
  - Income breakdown by category
- Light/Dark mode toggle
- Data persistence using localStorage

## 🛠 Tech Stack

- **Frontend**: React + TailwindCSS  
- **Charts**: Chart.js with react-chartjs-2  
- **State Management**: React useState and Context API  
- **Persistence**: localStorage  
- **Date Handling**: date-fns  

## 📋 Prerequisites

- Node.js (version 14 or higher)  
- npm or yarn  

## 🚀 Getting Started

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd expenses-tracker
   ```

2. Install dependencies:
   ```bash
   npm install
   ```
   or if using yarn:
   ```bash
   yarn install
   ```

### Running the Application

Start the development server:
```bash
npm start
```
or with yarn:
```bash
yarn start
```

Open your browser and navigate to:  
👉 [http://localhost:3000](http://localhost:3000)

### Building for Production

To create a production build:
```bash
npm run build
```
or with yarn:
```bash
yarn build
```

## 📂 Project Structure

```
src/
├── components/
│   ├── Header.js
│   ├── Dashboard.js
│   ├── ExpenseForm.js
│   ├── IncomeForm.js
│   └── CategoryManager.js
├── utils/
│   └── localStorage.js
├── public/
│   └── index.html
│   └── manifest.json
│   └── robots.txt
│   └── site.webmanifest
│   └── favicon.ico
├── App.js
└── index.js
└── index.css
```

## 💡 How to Use

### Adding Expenses/Income
1. Navigate to the **Expenses** or **Income** tab  
2. Fill in the form with amount, category, date, and optional note  
3. Click **Add Expense** or **Add Income**  

### Managing Categories
- Go to the **Categories** tab  
- Add new categories using the input fields  
- Delete categories by clicking the **×** button next to each category  

### Viewing Dashboard
- Navigate to the **Dashboard** tab  
- View summary cards for total income, expenses, and balance  
- See interactive charts for income vs expenses and category breakdowns  

### Dark Mode
- Toggle dark mode using the button in the header  

## 💾 Data Persistence

All data is automatically saved to your browser's **localStorage**, so it will persist between sessions.

## 🧪 Testing

### Running Tests
This project uses the default testing setup from Create React App.

Run tests:
```bash
npm test
```
or with yarn:
```bash
yarn test
```

### Testing Approach
Manually tested scenarios:

- **Form Validation**
  - Ensuring amount and category are required fields
  - Proper handling of decimal amounts
- **Data Persistence**
  - Data is saved to localStorage
  - Data loads correctly on page refresh
- **UI Functionality**
  - Dark/light mode toggle works
  - Navigation tabs work correctly
  - Responsive design verified on different screen sizes
- **Chart Visualization**
  - Charts update when new data is added
  - Category breakdowns display correctly
- **Category Management**
  - Adding new categories
  - Deleting categories works
  - Related transactions are removed when a category is deleted

## ⚙️ Development

### Available Scripts
- `npm start` → Runs the app in development mode  
- `npm test` → Launches the test runner  
- `npm run build` → Builds the app for production  
- `npm run eject` → Ejects the Create React App configuration  

### Customizing Tailwind
Modify the `tailwind.config.js` file to change the theme.

### Adding New Features
- Create new components in `src/components/`  
- Add utilities in `src/utils/`  
- Update `App.js` for new functionality  

## 🌍 Browser Support

This application works in all modern browsers that support **localStorage** and **ES6** JavaScript features.

## 🤝 Contributing

1. Fork the repository  
2. Create a new branch for your feature  
3. Make your changes  
4. Submit a pull request  

## 📜 License

This project is open source and available under the **MIT License**.

## 🛠 Troubleshooting

- **Charts not displaying**  
  Ensure dependencies are installed correctly. Check browser console for errors.  

- **Data not saving**  
  Verify localStorage is enabled in your browser. Check browser console.  

- **Dark mode not working**  
  Ensure Tailwind CSS is configured correctly. Check CSS conflicts in dev tools.  

- **Build errors**  
  Make sure Node.js version is 14 or higher. Try deleting `node_modules` and reinstall dependencies.  

---

## ✅ MVP Complete

The Expense Tracker app now includes all MVP features:
1. Input expenses and income with amount, category, note, and date  
2. Manage categories for both income and expenses  
3. Dashboard with interactive charts (income vs expenses, category breakdowns)  
4. Light/Dark mode toggle with persistent theme preference  
5. Data persistence using localStorage  

Users can:
- Add and track expenses/income  
- Manage categories  
- View visual representations of financial data  
- Switch between themes  
- Keep data persistent between sessions  

👉 To run the app:  
1. Install dependencies with `npm install`  
2. Start dev server with `npm start`  
3. Open [http://localhost:3000](http://localhost:3000)  

The app is responsive for desktop & mobile, with proper error handling and user feedback.
