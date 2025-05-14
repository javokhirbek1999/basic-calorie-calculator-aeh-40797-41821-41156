// src/pages/Home.js
import React, { useEffect, useState } from 'react';
import UserCard from '../components/UserCard';
import axios from '../api/axios'; // Axios instance

const Home = () => {
  const [users, setUsers] = useState([]);
  const [userCalories, setUserCalories] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsersAndCalories = async () => {
      try {
        const token = localStorage.getItem('token');
        const userRes = await axios.get('users/', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const usersData = userRes.data;
        setUsers(usersData);

        const today = new Date().toISOString().slice(0, 10); // Format: 'YYYY-MM-DD'
        const caloriesMap = {};

        await Promise.all(
          usersData.map(async (user) => {
            try {
              const intakeRes = await axios.get(`calories/intakes/${user.email}`, {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              });

              const intakes = intakeRes.data;
              const todayKcal = intakes
                .filter((entry) => entry.date_taken.startsWith(today))
                .reduce((sum, entry) => sum + entry.total_kcal_taken, 0);

              caloriesMap[user.email] = todayKcal;
            } catch (err) {
              console.error(`Failed to fetch intake for ${user.email}`, err);
              caloriesMap[user.email] = 0;
            }
          })
        );

        setUserCalories(caloriesMap);
      } catch (err) {
        console.error('Failed to fetch users', err);
        setError('Failed to load user data');
      } finally {
        setLoading(false);
      }
    };

    fetchUsersAndCalories();
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
            key={user.email}
            id={user.email}
            name={`${user.first_name} ${user.last_name}`}
            calories={userCalories[user.email] || 0}
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
