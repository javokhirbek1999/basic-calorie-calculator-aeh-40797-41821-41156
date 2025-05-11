// src/pages/Home.js
import React from 'react';
import UserCard from '../components/UserCard';
import { users } from '../data/users';

const Home = () => {
  return (
    <div>
      <div style={styles.userGrid}>
        {users.map((user) => (
          <UserCard
            key={user.id}
            id={user.id}
            name={`${user.firstName} ${user.lastName}`}
            calories={user.caloriesToday}
            image={user.avatar}
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
