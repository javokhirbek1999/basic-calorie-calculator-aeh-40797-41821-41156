// src/components/UserCard.js
import React from 'react';
import { Link } from 'react-router-dom';

const UserCard = ({ id, name, calories, image }) => {
  return (
    <Link to={`/profile/${id}`} style={styles.link}>
      <div style={styles.card}>
        <img src={image} alt={name} style={styles.image} />
        <div style={styles.details}>
          <h3 style={styles.name}>{name}</h3>
          <p style={styles.calories}>🍽️ {calories} kcal</p>
        </div>
      </div>
    </Link>
  );
};

const styles = {
  link: {
    textDecoration: 'none',
    color: 'inherit',
  },
  card: {
    border: '1px solid #e0e0e0',
    borderRadius: '12px',
    padding: '1rem',
    margin: '1rem 0',
    width: '220px',
    backgroundColor: '#fff',
    boxShadow: '0 4px 10px rgba(0,0,0,0.05)',
    transition: 'transform 0.2s ease, box-shadow 0.2s ease',
    cursor: 'pointer',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  image: {
    width: '130px',
    height: '130px',
    objectFit: 'cover',
    borderRadius: '50%',
    marginBottom: '0.75rem',
    border: '2px solid #ddd',
  },
  details: {
    textAlign: 'center',
  },
  name: {
    fontSize: '1.1rem',
    fontWeight: '600',
    marginBottom: '0.25rem',
    color: '#333',
  },
  calories: {
    fontSize: '0.95rem',
    color: '#666',
  },
};

export default UserCard;
