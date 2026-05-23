import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from "../services/api";

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '', age: '', gender: '', email: '', phone: '', fitnessGoal: '', password: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit =
async (e) => {

e.preventDefault();

try {

await API.post("/auth/signup",formData);

alert(
"Signup Successful"
);

navigate("/home");

}
catch (error) {

alert(
"Signup Failed"
);
}
};

const handleSignup = async () => {
  try {

    const response = await fetch("http://localhost:5000/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        password,
      }),
    });

    const data = await response.json();

    alert(data.message);

  } catch (error) {
    console.log(error);
    alert("Signup Failed");
  }
};

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>Create Account</h2>
        <p style={styles.subtitle}>Join FitLife Tracker today</p>
        
        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.row}>
            <input type="text" name="name" placeholder="Full Name" onChange={handleChange} style={styles.input} required />
            <input type="number" name="age" placeholder="Age" onChange={handleChange} style={{ ...styles.input, width: '30%' }} required />
          </div>

          <select name="gender" onChange={handleChange} style={styles.select} required>
            <option value="" disabled selected>Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>

          <input type="email" name="email" placeholder="Email Address" onChange={handleChange} style={styles.input} required />
          <input type="tel" name="phone" placeholder="Phone Number" onChange={handleChange} style={styles.input} required />

          <select name="fitnessGoal" onChange={handleChange} style={styles.select} required>
            <option value="" disabled selected>Select Fitness Goal</option>
            <option value="weight-loss">Weight Loss</option>
            <option value="muscle-gain">Muscle Gain</option>
            <option value="endurance">Endurance & Cardio</option>
            <option value="flexibility">Flexibility & Yoga</option>
          </select>

          <input type="password" name="password" placeholder="Password" onChange={handleChange} style={styles.input} required />

          <button onClick={() => navigate('/home')} type="submit" style={styles.button}>Reigster</button>

        </form>

        <p style={styles.footerText}>
          Already have an account? <span onClick={() => navigate('/')} style={styles.link}>Login</span>
        </p>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    backgroundImage: "url('https://i.pinimg.com/736x/6f/e1/7e/6fe17e8e109b26476458c4424df5a7ed.jpg')",
    fontFamily: '"Segoe UI", Roboto, Helvetica, Arial, sans-serif',
    padding: '20px'
  },
  card: {
    backgroundColor: '#edeaea',
    padding: '40px',
    borderRadius: '12px',
    boxShadow: '0 8px 24px rgba(0, 0, 0, 0.08)',
    width: '100%',
    maxWidth: '450px',
    boxSizing: 'border-box'
  },
  title: {
    margin: '0 0 8px 0',
    textAlign: 'center',
    color: '#005f56',
    fontSize: '28px',
    fontWeight: '700'
  },
  subtitle: {
    margin: '0 0 24px 0',
    textAlign: 'center',
    color: '#6b7280',
    fontSize: '14px'
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px'
  },
  row: {
    display: 'flex',
    gap: '12px'
  },
  input: {
    width: '100%',
    padding: '12px 16px',
    border: '1px solid #d1d5db',
    borderRadius: '8px',
    fontSize: '15px',
    boxSizing: 'border-box',
    outline: 'none',
    backgroundColor: '#3976b4',
    transition: 'border-color 0.2s',
  },
  select: {
    width: '100%',
    padding: '12px 16px',
    border: '1px solid #d1d5db',
    borderRadius: '8px',
    fontSize: '15px',
    boxSizing: 'border-box',
    outline: 'none',
    backgroundColor: '#f9fafb',
    color: '#374151'
  },
  button: {
    width: '100%',
    padding: '14px',
    backgroundColor: '#005f56',
    color: '#ffffff',
    border: 'none',
    borderRadius: '8px',
    fontSize: '16px',
    fontWeight: '600',
    cursor: 'pointer',
    marginTop: '8px',
    transition: 'background-color 0.2s'
  },
  footerText: {
    textAlign: 'center',
    marginTop: '24px',
    fontSize: '14px',
    color: '#4b5563'
  },
  link: {
    color: '#005f56',
    fontWeight: '600',
    cursor: 'pointer',
    textDecoration: 'underline'
  }
};

export default Register;