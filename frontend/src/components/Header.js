// src/components/Header.js
import React from 'react';

const Header = () => {
  return (
    <header style={styles.header}>
      <div style={styles.logo}>Calorie Tracker</div>
      <div style={styles.authButtons}>
        <button style={{ ...styles.button, ...styles.register }}>Register</button>
        <button style={{ ...styles.button, ...styles.login }}>Login</button>
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
