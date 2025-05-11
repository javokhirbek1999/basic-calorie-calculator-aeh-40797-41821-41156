// src/pages/Profile.js
import React from 'react';
import { useParams } from 'react-router-dom';
import { users } from '../data/users';

const Profile = () => {
  const { userId } = useParams();
  const user = users.find((u) => u.id === userId);

  if (!user) return <p style={{ padding: '2rem' }}>User not found</p>;

  return (
    <div style={styles.container}>
      <div style={styles.profileHeader}>
        <img src={user.avatar} alt="Avatar" style={styles.avatar} />
        <div>
          <h2 style={styles.name}>
            {user.firstName} {user.lastName}
          </h2>
          <p style={styles.registered}>📅 Joined: {user.registeredAt}</p>
          <div style={styles.stats}>
            <div style={{ ...styles.statCard, backgroundColor: '#e0f7fa' }}>
              <strong>Today</strong>
              <span>{user.caloriesToday} kcal</span>
            </div>
            <div style={{ ...styles.statCard, backgroundColor: '#fff3e0' }}>
              <strong>This Month</strong>
              <span>{user.caloriesMonth} kcal</span>
            </div>
            <div style={{ ...styles.statCard, backgroundColor: '#e8f5e9' }}>
              <strong>Lifetime</strong>
              <span>{user.caloriesLifetime} kcal</span>
            </div>
          </div>
        </div>
      </div>

      <h3 style={styles.sectionTitle}>🍴 Food Intake History</h3>
      <div style={styles.tableWrapper}>
        <table style={styles.table}>
          <thead>
            <tr>
              <th>Food</th>
              <th>Date</th>
              <th>Time</th>
              <th>Amount</th>
              <th>Calories</th>
            </tr>
          </thead>
          <tbody>
            {user.foods.map((food, index) => (
              <tr key={index}>
                <td>{food.name}</td>
                <td>{food.date}</td>
                <td>{food.time}</td>
                <td>{food.amount}</td>
                <td>{food.calories}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '1000px',
    margin: '2rem auto',
    padding: '1rem',
    fontFamily: 'Segoe UI, sans-serif',
  },
  profileHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '2rem',
    padding: '2rem',
    borderRadius: '16px',
    background: 'linear-gradient(135deg, #f3f4f6, #ffffff)',
    boxShadow: '0 8px 24px rgba(0,0,0,0.05)',
  },
  avatar: {
    width: '160px',
    height: '160px',
    borderRadius: '50%',
    objectFit: 'cover',
    border: '4px solid #ccc',
  },
  name: {
    fontSize: '2rem',
    marginBottom: '0.3rem',
    color: '#333',
  },
  registered: {
    marginBottom: '1rem',
    fontStyle: 'italic',
    color: '#666',
  },
  stats: {
    display: 'flex',
    gap: '1rem',
    flexWrap: 'wrap',
  },
  statCard: {
    padding: '1rem',
    borderRadius: '12px',
    minWidth: '150px',
    textAlign: 'center',
    boxShadow: '0 2px 10px rgba(0,0,0,0.08)',
    display: 'flex',
    flexDirection: 'column',
    gap: '0.25rem',
    fontSize: '0.95rem',
  },
  sectionTitle: {
    marginTop: '3rem',
    marginBottom: '1rem',
    fontSize: '1.4rem',
    color: '#444',
  },
  tableWrapper: {
    overflowX: 'auto',
    borderRadius: '12px',
    boxShadow: '0 2px 12px rgba(0,0,0,0.05)',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    fontSize: '0.95rem',
    backgroundColor: '#fff',
  },
  'table th, table td': {
    padding: '0.85rem 1rem',
    textAlign: 'left',
    borderBottom: '1px solid #eee',
  },
  'table tr:hover': {
    backgroundColor: '#f9f9f9',
  },
};

export default Profile;
