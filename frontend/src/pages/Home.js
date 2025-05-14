// src/pages/Home.js
import React, { useEffect, useState } from 'react';
import UserCard from '../components/UserCard';
import axios from '../api/axios'; // Axios instance

const Home = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem('token'); // Get token from localStorage
        const response = await axios.get('users/', {
          headers: {
            Authorization: `Bearer ${token}`, // Send token in the headers
          },
        });
        setUsers(response.data); // Set the users data
      } catch (err) {
        setError('Failed to fetch users');
      } finally {
        setLoading(false); // Set loading to false after the API call
      }
    };

    fetchUsers();
  }, []);

  if (loading) {
    return <p style={{ padding: '2rem' }}>Loading users...</p>;
  }

  if (error) {
    return <p style={{ padding: '2rem' }}>{error}</p>;
  }

  return (
    <div>
      <div style={styles.userGrid}>
        {users.map((user) => (
          <UserCard
            key={user.email} // Use user email as the unique key
            id={user.email} // Assuming email is unique
            name={`${user.first_name} ${user.last_name}`}
            calories={user.caloriesToday || 0} // Placeholder for caloriesToday
            image={`https://ui-avatars.com/api/?name=${encodeURIComponent(user.first_name)}+${encodeURIComponent(user.last_name)}&background=random&color=fff&size=256`}
          />
        ))}
      </div>
    </div>
  );
};

const styles = {
  userGrid: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    padding: '2rem',
    gap: '1rem',
  },
};

export default Home;
