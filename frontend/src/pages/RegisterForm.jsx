// src/components/RegisterForm.jsx (or wherever you prefer to put your components)

import React, { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth'; // Import specific function
import Taskbar from '../components/Taskbar';
import { auth } from '../firebase'; // Import the exported auth instance from your firebase.js

function RegisterForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false); // To show loading state

  const handleRegister = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    setLoading(true);
    setError(''); // Clear previous errors

    try {
      // Call the Firebase Auth function with the auth instance and user credentials
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      console.log('User registered successfully:', user);
      alert(`Welcome, ${user.email}! Registration successful.`);
      // You can redirect the user or update UI state here (e.g., set user as logged in)
      setEmail('');
      setPassword('');
    } catch (firebaseError) {
      // Firebase errors have a 'code' and 'message' property
      console.error('Registration failed:', firebaseError);
      setError(`Error: ${firebaseError.message}`); // Display user-friendly error
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
    <Taskbar></Taskbar>
    <div style={{ padding: '20px', border: '1px solid #ccc', borderRadius: '8px', maxWidth: '400px', margin: '50px auto' }}>
      <h2>Register Account</h2>
      <form onSubmit={handleRegister}>
        <div style={{ marginBottom: '10px' }}>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{ width: '100%', padding: '8px', boxSizing: 'border-box', border: '1px solid black'}}
          />
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{ width: '100%', padding: '8px', boxSizing: 'border-box' , border: '1px solid black'}}
          />
        </div>
        {error && <p style={{ color: 'red', marginBottom: '10px' }}>{error}</p>}
        <button
          type="submit"
          disabled={loading}
          style={{
            backgroundColor: '#007bff',
            color: 'white',
            padding: '10px 15px',
            border: 'none',
            borderRadius: '5px',
            cursor: loading ? 'not-allowed' : 'pointer'
          }}
        >
          {loading ? 'Registering...' : 'Register'}
        </button>
      </form>
    </div>
    </div>
  );
}

export default RegisterForm;