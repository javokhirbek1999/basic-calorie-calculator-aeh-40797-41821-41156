// src/pages/Home.js
import React from 'react';
import Header from '../components/Header';
import UserCard from '../components/UserCard';

const dummyUsers = [
  {
    name: 'Alice',
    calories: 1800,
    image: 'https://randomuser.me/api/portraits/women/68.jpg',
  },
  {
    name: 'Bob',
    calories: 2200,
    image: 'https://randomuser.me/api/portraits/men/65.jpg',
  },
  {
    name: 'Charlie',
    calories: 2000,
    image: 'https://randomuser.me/api/portraits/men/75.jpg',
  },
];

const Home = () => {
  return (
    <div>
      <Header />
      <div style={styles.userGrid}>
        {dummyUsers.map((user, index) => (
          <UserCard
            key={index}
            name={user.name}
            calories={user.calories}
            image={user.image}
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
