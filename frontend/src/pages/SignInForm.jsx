// src/components/SignInForm.jsx

import React, { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth'; // Import the specific sign-in function
import { auth } from '../firebase'; // Import the initialized auth instance
import { useNavigate } from 'react-router-dom';
import Taskbar from '../components/Taskbar';
function SignInForm({ onSuccess, onShowRegister }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const handleSignIn = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      console.log('User signed in successfully:', userCredential.user);
      alert("Welcome back!"); // Customize message
      setEmail('');
      setPassword('');

      // If sign-in is successful and onSuccess function was passed, call it
      if (onSuccess) {
        onSuccess();
      }
    } catch (firebaseError) {
      const errorMessageText = firebaseError.message;
      console.error('Sign-in failed:', firebaseError);
      setError(`Error: ${errorMessageText}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Taskbar></Taskbar>
    <div style={{ padding: '20px', border: '1px solid #ccc', borderRadius: '8px', maxWidth: '400px', margin: '50px auto' }}>
      <h2>Sign In</h2>
      <form onSubmit={handleSignIn}>
        <div style={{ marginBottom: '10px' }}>
          <label htmlFor="signInEmail">Email:</label>
          <input
            type="email"
            id="signInEmail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{ width: '100%', padding: '8px', boxSizing: 'border-box', border: '1px solid black' }}
          />
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label htmlFor="signInPassword">Password:</label>
          <input
            type="password"
            id="signInPassword"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{ width: '100%', padding: '8px', boxSizing: 'border-box', border: '1px solid black'}}
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
          {loading ? 'Signing In...' : 'Sign In'}
        </button>
      </form>

      {/* Link to Register Page */}
      <p style={{ marginTop: '15px', textAlign: 'center', fontSize: '0.9em' }}>
        Don't have an account?{' '}
        <button
            onClick={() => navigate('/register')}          
            style={{
            background: 'none',
            border: 'none',
            color: '#007bff',
            textDecoration: 'underline',
            cursor: 'pointer',
            padding: '0',
            font: 'inherit'
          }}
        >
          Register here.
        </button>
        </p>
    </div>
    </div>
  );
}

export default SignInForm;
