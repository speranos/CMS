"use client";
import React, { useState } from 'react';
import { useRouter } from '../../../node_modules/next/navigation';
import { useUser } from '../context/UserContext'
import styles from './auth.module.css';

export default function AuthPage() {
  const { setUser } = useUser();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);
  const router = useRouter();

  
  const handleSubmit = async (event) => {
      event.preventDefault();

      interface UserDto{
        UserName: string;
        Pass: string;
      }

    if (!username || !password) {
      setMessage('Fields cannot be empty.');
      return;
    }

    try {
        if(isSignUp){
            let UserDto = { UserName: username, Pass: password }
            const response = await fetch('http://localhost:4000/Signup', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(UserDto),
            });
            console.log(response);
            const data = await response.json();
            if (response.ok) {
                setMessage(data.message);
              } else {
                setMessage(data.message || 'Failed to authenticate.');
              }
        }
        else{
            let UserDto = { UserName: username, Pass: password }
            const response = await fetch('http://localhost:4000/Signin', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(UserDto),
            });
            console.log(response);
            const data = await response.json();
            if (response.ok) {
                setUser({ userId: data.userId, Jwt: data.Jwt });
                setMessage('Success');
                router.push('/');
              } else {
                setMessage(data.message || 'Failed to authenticate.');
              }
        }

    } catch (error) {
      setMessage('An error occurred. Please try again.');
      console.error('Error:', error);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.authBox}>
        <h1 className={styles.isSi}>{isSignUp ? 'Sign Up' : 'Sign In'}</h1>

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.inputGroup}>
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className={styles.inputField}
              placeholder="Enter your username"
            />
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={styles.inputField}
              placeholder="Enter your password"
            />
          </div>

          {message && <div className={styles.message}>{message}</div>}

          <button type="submit" className={styles.submitButton}>
            {isSignUp ? 'Sign Up' : 'Sign In'}
          </button>
        </form>

        <p className={styles.toggleText}>
          {isSignUp ? 'Already have an account?' : "Don't have an account?"}
          <button onClick={() => setIsSignUp(!isSignUp)} className={styles.toggleButton}>
            {isSignUp ? 'Sign In' : 'Sign Up'}
          </button>
        </p>
      </div>
    </div>
  );
}
