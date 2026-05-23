import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function AdminDashboard() {
  const [users, setUsers] = useState([]);
  const [workoutCategory, setWorkoutCategory] = useState("");
  const [dietCategory, setDietCategory] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    fetchUsers();
  }, []);

  // Get all users
  const fetchUsers = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/admin/users"
      );
      setUsers(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  // Delete User
  const deleteUser = async (id) => {
    try {
      await axios.delete(
        `http://localhost:5000/admin/delete/${id}`
      );

      alert("User Deleted");
      fetchUsers();
    } catch (error) {
      console.log(error);
    }
  };

  // Block User
  const blockUser = async (id) => {
    try {
      await axios.put(
        `http://localhost:5000/admin/block/${id}`
      );

      alert("User Blocked");
      fetchUsers();
    } catch (error) {
      console.log(error);
    }
  };

  // Add Workout Category
  const addWorkoutCategory = () => {
    alert(`Workout Category Added: ${workoutCategory}`);
    setWorkoutCategory("");
  };

  // Add Diet Category
  const addDietCategory = () => {
    alert(`Diet Category Added: ${dietCategory}`);
    setDietCategory("");
  };

  // Logout
  const logout = () => {
    localStorage.removeItem("adminToken");
    navigate("/");
  };

  return (
    <div style={styles.container}>
      <h1>Admin Dashboard</h1>

      {/* System Usage */}
      <div style={styles.card}>
        <h2>System Usage</h2>
        <p>Total Users: {users.length}</p>
      </div>

      {/* User Management */}
      <div style={styles.card}>
        <h2>Manage Users</h2>

        {users.map((user) => (
          <div key={user._id} style={styles.userCard}>
            <div>
              <h4>{user.name}</h4>
              <p>{user.email}</p>
            </div>

            <div>
              <button
                style={styles.blockBtn}
                onClick={() => blockUser(user._id)}
              >
                Block
              </button>

              <button
                style={styles.deleteBtn}
                onClick={() => deleteUser(user._id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Workout Category */}
      <div style={styles.card}>
        <h2>Manage Workout Categories</h2>

        <input
          type="text"
          placeholder="Add Workout Category"
          value={workoutCategory}
          onChange={(e) =>
            setWorkoutCategory(e.target.value)
          }
          style={styles.input}
        />

        <button
          onClick={addWorkoutCategory}
          style={styles.button}
        >
          Add
        </button>
      </div>

      {/* Diet Category */}
      <div style={styles.card}>
        <h2>Manage Diet Database</h2>

        <input
          type="text"
          placeholder="Add Diet Category"
          value={dietCategory}
          onChange={(e) =>
            setDietCategory(e.target.value)
          }
          style={styles.input}
        />

        <button
          onClick={addDietCategory}
          style={styles.button}
        >
          Add
        </button>
      </div>

      {/* Logout */}
      <button onClick={logout} style={styles.logoutBtn}>
        Logout
      </button>
    </div>
  );
}

const styles = {
  container: {
    padding: "20px",
    background: "#f4f4f4",
    minHeight: "100vh",
  },

  card: {
    background: "Pink",
    padding: "20px",
    marginBottom: "20px",
    borderRadius: "10px",
  },

  userCard: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    border: "1px solid #ddd",
    padding: "10px",
    marginBottom: "10px",
    borderRadius: "8px",
  },

  input: {
    padding: "10px",
    width: "250px",
    marginRight: "10px",
  },

  button: {
    padding: "10px 15px",
    cursor: "pointer",
  },

  blockBtn: {
    background: "orange",
    border: "none",
    padding: "8px 12px",
    marginRight: "10px",
    cursor: "pointer",
  },

  deleteBtn: {
    background: "red",
    color: "white",
    border: "none",
    padding: "8px 12px",
    cursor: "pointer",
  },

  logoutBtn: {
    background: "black",
    color: "white",
    padding: "10px 20px",
    border: "none",
    cursor: "pointer",
  },
};

export default AdminDashboard;