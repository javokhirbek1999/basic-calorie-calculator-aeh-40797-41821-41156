// src/components/Header.js
import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header style={styles.header}>
      <Link to="/" style={styles.logo}>
        Calorie Tracker
      </Link>
      <div style={styles.authButtons}>
        <Link to="/register" style={{ ...styles.button, ...styles.register }}>
          Register
        </Link>
        <Link to="/login" style={{ ...styles.button, ...styles.login }}>
          Login
        </Link>
      </div>
    </header>
  );
};

const styles = {
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '1rem 2rem',
    backgroundColor: '#ffffff',
    borderBottom: '1px solid #e0e0e0',
    boxShadow: '0 2px 5px rgba(0, 0, 0, 0.05)',
    position: 'sticky',
    top: 0,
    zIndex: 1000,
  },
  logo: {
    fontSize: '1.8rem',
    fontWeight: '600',
    color: '#333',
    textDecoration: 'none',
  },
  authButtons: {
    display: 'flex',
    gap: '1rem',
  },
  button: {
    padding: '0.5rem 1.2rem',
    borderRadius: '6px',
    fontWeight: '500',
    fontSize: '0.95rem',
    cursor: 'pointer',
    border: 'none',
    textDecoration: 'none',
    display: 'inline-block',
    transition: 'all 0.2s ease-in-out',
  },
  register: {
    backgroundColor: '#4CAF50',
    color: '#fff',
  },
  login: {
    backgroundColor: '#2196F3',
    color: '#fff',
  },
};

export default Header;
