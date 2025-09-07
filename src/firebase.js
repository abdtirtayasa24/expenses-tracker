import { initializeApp } from 'firebase/app';
import { 
  getDatabase, 
  ref, 
  set, 
  onValue, 
  push, 
  remove 
} from 'firebase/database';
import { 
  getAuth, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup
} from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyDxN-2heZQraygcY9n_XUT6SZDRIfMWegg",
  authDomain: "expensestracker-64214.firebaseapp.com",
  databaseURL: "https://expensestracker-64214-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "expensestracker-64214",
  storageBucket: "expensestracker-64214.firebasestorage.app",
  messagingSenderId: "510716287940",
  appId: "1:510716287940:web:d8a202e6c7507a6ce32291"
};

const app = initializeApp(firebaseConfig);

const database = getDatabase(app);

const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

export { 
  database, 
  ref, 
  set, 
  onValue, 
  push, 
  remove,
  auth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  googleProvider,
  signInWithPopup
};