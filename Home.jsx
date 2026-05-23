import React from "react";
import { useState, useEffect } from 'react';


const Home = () => {
  const tips = [
    "Drink at least 2 liters of water daily 💧",
    "Consistency is more important than perfection 🏋️",
    "Take 7-8 hours of sleep 😴",
    "Walk 10,000 steps every day 🚶",
  ];

  const recentWorkouts = [
    "Morning Cardio - 30 mins",
    "Chest Workout - 45 mins",
    "Yoga Session - 20 mins",
  ];

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Fitness Dashboard</h1>
      
      {/* Summary Cards */}
      <div style={styles.cardContainer}>

        <div style={styles.card}>
          <h2 style={{color:"blue"}}>🔥 Calories Burned</h2>
          <p style={styles.value}>560 kcal</p>
        </div>

        <div style={styles.card}>
          <h2 style={{color:"blue"}}>👣 Steps Taken</h2>
          <p style={styles.value}>8,420</p>
        </div>

        <div style={styles.card}>
          <h2 style={{color:"blue"}}>🏃 Daily Activity</h2>
          <p style={styles.value}>1 hr 20 mins</p>
        </div>

      </div>

      {/* Recent Workouts */}
      <div style={styles.section}>
        <h2  style={{color:"blue"}}>Recent Workouts</h2>

        <ul style={styles.list}>
          {recentWorkouts.map((workout, index) => (
            <li key={index} style={styles.listItem}>
              {workout}
            </li>
          ))}
        </ul>
      </div>

      {/* Motivational Tips */}
      <div style={styles.section}>
        <h2  style={{color:"blue"}}>Motivational Tips</h2>

        <ul style={styles.list}>
          {tips.map((tip, index) => (
            <li key={index} style={styles.listItem}>
              {tip}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

const styles = {
  container: {
    padding: "30px",
    fontFamily: "Arial, sans-serif",
    backgroundColor: "#edf2ef",
    minHeight: "100vh",
  },

  heading: {
    textAlign: "center",
    marginBottom: "30px",
    color: "#00bfa5",
  },

  cardContainer: {
    display: "flex",
    gap: "20px",
    justifyContent: "center",
    flexWrap: "wrap",
    marginBottom: "30px",
  },

  card: {
    backgroundColor: "#fff",
    padding: "20px",
    width: "250px",
    borderRadius: "10px",
    boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
    textAlign: "center",
  },

  value: {
    fontSize: "28px",
    fontWeight: "bold",
    color: "#00bfa5",
  },

  section: {
    backgroundColor: "#f7e6f1",
    padding: "20px",
    borderRadius: "10px",
    marginBottom: "20px",
    boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
  },

  list: {
    listStyle: "none",
    padding: 0,
  },

  listItem: {
    padding: "10px 0",
    borderBottom: "1px solid #76ba17",
  },
};

export default Home;