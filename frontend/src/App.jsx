import { useState } from 'react'; // CORRECT: Standard React hook import
import { Routes, Route, useNavigate } from 'react-router-dom';
// THIS IS INCORRECT: Modular Firebase imports specific services from sub-paths.
// Also, App.jsx likely doesn't need createUserWithEmailAndPassword directly.
// The `auth` object is typically imported from your `firebase.js` file into components that need it.

// THIS IS INCORRECT: Relative path needed for local components.
// Also, you'll likely be importing AuthDropdown, not RegisterForm directly, if following our last pattern.
import RegisterForm from './pages/RegisterForm.jsx';
import EquipmentManager  from './pages/EquipmentManager.jsx';
import SignInForm from './pages/SignInForm.jsx';
import './index.css'; // CORRECT: Standard relative import for CSS


const initialEquipment = {
  racquets: [],
  shoes: [],
  bags: [],
};

export default function App() {
  const navigate = useNavigate();
  return(
  <Routes>
    <Route path="/" element={<EquipmentManager />} />
    <Route path="/register" element={<RegisterForm />} /> 
    <Route path="/signin" element={<SignInForm />} />
    <Route path="*" element={<div>404 Not Found</div>} />
  </Routes> 
  )
}
