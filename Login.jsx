import React,{ useState } from "react";
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import API from "../services/api";


const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const [loginData, setLoginData] =
    useState({
      email: "",
      password: ""
    });

  const handleChange = (e) => {
    setLoginData({
      ...loginData,
      [e.target.name]:
      e.target.value
    });
  };
const handleLogin =
async (e) => {

e.preventDefault();

try {

const res =
await API.post(
"/auth/login",
loginData
);

localStorage.setItem(
"token",
res.data.token
);

alert(
"Login Success"
);

if (
res.data.role ===
"admin"
) {
navigate(
"/admin"
);
}
else {
navigate(
"/home"
);
}

}
catch (error) {

alert(
"Invalid Login"
);
}
};

  return (
    <div style={styles.container}>
      
      {/* Left Section */}
      <div style={styles.left}>
        <h1 style={styles.heading}>Get moving.</h1>
        <p style={styles.subtext}>Track your fitness, your way.</p>
      
      </div>

      {/* Right Section */}
      <div style={styles.right}>
        <div style={styles.loginBox}>
          <h2 style={styles.title}>Log in</h2>

          <div style={styles.inputGroup}>
            <label>Email Address</label>
            <input type="email" placeholder="Enter your email" style={styles.input} />
          </div>

          <div style={styles.inputGroup}>
            <label>Password</label>
            <input type="password" placeholder="Enter your password" style={styles.input} />
          </div>

          <div style={styles.options}>
            <label>
              <input type="checkbox" /> Remember me
            </label>
            <a href="#" style={styles.link}>Forgot password?</a>
          </div>

          <button style={styles.button}><Link to ="/home">Login</Link></button> 

          <div style={styles.signup}>
            New here?<Link to = "/register">Sign up</Link>
          </div>
        </div>
      </div>
      </div>
   );
};



const styles = {
  container: {
    display: "flex",
    height: "100vh",
    fontFamily: "Arial, sans-serif",
  },

left: {
    flex: 1,
    backgroundImage:
      "url('https://i.pinimg.com/736x/76/0f/a8/760fa8024ccc13e15b595c8c084ab919.jpg')",
    backgroundSize: "cover",
    backgroundPosition: "center",
    color: "#fff",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    padding: "60px",
  },

  heading: {
    fontSize: "42px",
    marginBottom: "10px",
  },

  subtext: {
    fontSize: "18px",
  },

  right: {
    flex: 1,
    backgroundColor: "#100b0b",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },

  loginBox: {
    width: "350px",
  },

  title: {
    marginBottom: "20px",
    fontSize: "28px",
  },

  inputGroup: {
    marginBottom: "15px",
    display: "flex",
    flexDirection: "column",
  },

  input: {
    padding: "10px",
    border: "1px solid #ccc",
    borderRadius: "5px",
    marginTop: "5px",
  },

  options: {
    display: "flex",
    justifyContent: "space-between",
    fontSize: "14px",
    marginBottom: "15px",
  },

  button: {
    width: "100%",
    padding: "12px",
    backgroundColor: "#00bfa5",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    marginBottom: "15px",
  },

  divider: {
    textAlign: "center",
    margin: "15px 0",
    color: "#888",
  },

  socialBtn: {
    width: "100%",
    padding: "10px",
    marginBottom: "10px",
    border: "1px solid #ccc",
    borderRadius: "5px",
    cursor: "pointer",
    backgroundColor: "#fff",
  },

  signup: {
    textAlign: "center",
    fontSize: "14px",
    marginTop: "10px",
  },

  link: {
    color: "#00bfa5",
    textDecoration: "none",
  },
};

export default Login;

