import React, { useState } from 'react';
import axios from '../api/axios';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [formData, setFormData] = useState({
    email: '',
    first_name: '',
    last_name: '',
    password: '',
    confirm_password: '',
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      const response = await axios.post('users/create/', formData);
      setSuccess('User registered successfully!');
      setFormData({
        email: '',
        first_name: '',
        last_name: '',
        password: '',
        confirm_password: '',
      });
      // Optionally redirect to login after success
      setTimeout(() => navigate('/login'), 1500);
    } catch (err) {
      console.error(err);
      setError(
        err.response?.data?.error ||
        'Registration failed. Please check your input.'
      );
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Register</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        {['email', 'first_name', 'last_name', 'password', 'confirm_password'].map((field) => (
          <input
            key={field}
            type={field.includes('password') ? 'password' : 'text'}
            name={field}
            placeholder={field.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
            value={formData[field]}
            onChange={handleChange}
            required
            style={styles.input}
          />
        ))}

        <button type="submit" style={styles.button}>Register</button>

        {error && <p style={styles.error}>{error}</p>}
        {success && <p style={styles.success}>{success}</p>}
      </form>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '400px',
    margin: '3rem auto',
    padding: '2rem',
    border: '1px solid #ddd',
    borderRadius: '10px',
    boxShadow: '0 4px 10px rgba(0,0,0,0.05)',
    backgroundColor: '#fff',
  },
  title: {
    textAlign: 'center',
    marginBottom: '1.5rem',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
  },
  input: {
    padding: '0.75rem',
    fontSize: '1rem',
    borderRadius: '6px',
    border: '1px solid #ccc',
  },
  button: {
    padding: '0.75rem',
    backgroundColor: '#4CAF50',
    color: '#fff',
    border: 'none',
    fontSize: '1rem',
    cursor: 'pointer',
    borderRadius: '6px',
  },
  error: {
    color: 'red',
    textAlign: 'center',
  },
  success: {
    color: 'green',
    textAlign: 'center',
  },
};

export default Register;
