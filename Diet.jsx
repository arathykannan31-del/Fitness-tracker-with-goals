import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';

function Diet() {
  const navigate = useNavigate();
  
  // Set up local state for form inputs
  const [data, setData] = useState({ food: "", calories: "", mealType: "" });
  
  // Track past logs for the dashboard and history list
  const [dietLogs, setDietLogs] = useState(() => {
    const saved = localStorage.getItem("diet_logs");
    return saved ? JSON.parse(saved) : [];
  });

  // Daily target constants
  const DAILY_CALORIE_BUDGET = 2000;

  // Sync logs to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("diet_logs", JSON.stringify(dietLogs));
  }, [dietLogs]);

  // Calculations for current intake
  const totalCaloriesConsumed = dietLogs.reduce((sum, item) => sum + (Number(item.calories) || 0), 0);
  const remainingCalories = Math.max(0, DAILY_CALORIE_BUDGET - totalCaloriesConsumed);

  // Dynamic Macro Estimations based on general balanced diet distribution rules
  // (Roughly 40% Carbs, 30% Protein, 30% Fat)
  const estimatedProtein = Math.round((totalCaloriesConsumed * 0.30) / 4);
  const estimatedCarbs = Math.round((totalCaloriesConsumed * 0.40) / 4);
  const estimatedFat = Math.round((totalCaloriesConsumed * 0.30) / 9);

  const addDiet = async (e) => {
    if (e) e.preventDefault();

    if (!data.food || !data.calories || !data.mealType) {
      alert("Please fill out all fields.");
      return;
    }

    const newLogItem = {
      ...data,
      id: Date.now(),
      date: new Date().toLocaleDateString(),
    };

    try {
      // Keep your API request intact
      await axios.post("http://localhost:5173/diet", {
        ...data,
        userId: localStorage.getItem("userId"),
      });
      
      alert("Diet Added Successfully! 🎉");
      
      // Update local state to instantly render the dashboard and history list
      setDietLogs((prev) => [newLogItem, ...prev]);
      setData({ food: "", calories: "", mealType: "" });
    } catch (error) {
      console.error("Error adding diet entry:", error);
      // Fallback for standalone frontend demonstration or if server drops
      setDietLogs((prev) => [newLogItem, ...prev]);
      setData({ food: "", calories: "", mealType: "" });
    }
  };

  // Delete Individual Entry
  const handleDeleteLog = (id) => {
    setDietLogs((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <div style={styles.fullscreenBackground}>
      <div style={styles.container}>
        
        {/* Card Component Container */}
        <div style={styles.card}>
          <h2 style={styles.title}>Track Your Meal</h2>
          <p style={styles.subtitle}>Log your daily calorie intake to stay on track</p>

          {/* Remaining Macros Dashboard */}
          <div style={styles.dashboardContainer}>
            <div style={styles.mainCalorieMetric}>
              <span style={styles.calorieValue}>{remainingCalories}</span>
              <span style={styles.calorieLabel}>kcal remaining</span>
            </div>
            <div style={styles.macroSplitRow}>
              <div style={styles.macroBadge}>
                <span style={styles.macroGram}>{estimatedProtein}g</span>
                <span style={styles.macroName}>Protein</span>
              </div>
              <div style={styles.macroBadge}>
                <span style={styles.macroGram}>{estimatedCarbs}g</span>
                <span style={styles.macroName}>Carbs</span>
              </div>
              <div style={styles.macroBadge}>
                <span style={styles.macroGram}>{estimatedFat}g</span>
                <span style={styles.macroName}>Fat</span>
              </div>
            </div>
          </div>

          {/* Form Input Setup */}
          <div style={styles.formGroup}>
            <label style={styles.label}>Food Name</label>
            <input 
              type="text"
              placeholder="e.g., Grilled Chicken Salad" 
              value={data.food}
              onChange={(e) => setData({ ...data, food: e.target.value })}
              style={styles.input}
            />
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>Calories (kcal)</label>
            <input 
              type="number"
              placeholder="e.g., 350" 
              value={data.calories}
              onChange={(e) => setData({ ...data, calories: e.target.value })}
              style={styles.input}
            />
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>Meal Category</label>
            <select 
              value={data.mealType}
              onChange={(e) => setData({ ...data, mealType: e.target.value })}
              style={styles.select}
            >
              <option value="" disabled>Select Meal Type</option>
              <option value="Breakfast">Breakfast</option>
              <option value="Lunch">Lunch</option>
              <option value="Dinner">Dinner</option>
              <option value="Snack">Snack</option>
            </select>
          </div>

          <button onClick={addDiet} style={styles.button}>
            Log Diet Entry
          </button>
        </div>

        {/* Food History Logger Section */}
        <div style={styles.historyContainer}>
          <h3 style={styles.historyTitle}>Today's Food Log</h3>
          {dietLogs.length === 0 ? (
            <p style={styles.noLogsMessage}>No meals tracked today yet.</p>
          ) : (
            dietLogs.map((log) => (
              <div key={log.id} style={styles.historyCard}>
                <div style={styles.historyCardLeft}>
                  <span style={styles.historyMealBadge}>{log.mealType}</span>
                  <span style={styles.historyFoodName}>{log.food}</span>
                  <span style={styles.historyDate}>{log.date}</span>
                </div>
                <div style={styles.historyCardRight}>
                  <span style={styles.historyCalorieCount}>{log.calories} kcal</span>
                  <button onClick={() => handleDeleteLog(log.id)} style={styles.deleteBtn}>
                    ✕
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

      </div>
    </div>
  );
}

const styles = {
  fullscreenBackground: {
    minHeight: "100vh",
    width: "100%",
    backgroundImage: "linear-gradient(rgba(0, 0, 0, 0.75), rgba(0, 0, 0, 0.75)), url('https://i.pinimg.com/736x/f5/dd/86/f5dd8644bc6f4932e9702a420149c0b8.jpg')",
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundAttachment: "fixed",
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-start",
    padding: "40px 0",
    boxSizing: "border-box",
  },
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "20px",
    padding: "0 20px",
    width: "100%",
    maxWidth: "450px",
    fontFamily: '"Segoe UI", Roboto, Helvetica, Arial, sans-serif'
  },
  card: {
    backgroundColor: "rgba(255, 255, 255, 0.96)",
    padding: "30px",
    borderRadius: "12px",
    boxShadow: "0 4px 25px rgba(0, 0, 0, 0.3)",
    width: "100%",
    boxSizing: "border-box",
    border: "1px solid rgba(255, 255, 255, 0.2)",
    backdropFilter: "blur(4px)"
  },
  title: {
    margin: "0 0 4px 0",
    color: "#005f56", 
    fontSize: "24px",
    fontWeight: "700"
  },
  subtitle: {
    margin: "0 0 20px 0",
    color: "#4b5563",
    fontSize: "14px",
    lineHeight: "1.4"
  },
  dashboardContainer: {
    background: "#f0fdf4",
    border: "1px solid #bbf7d0",
    borderRadius: "8px",
    padding: "15px",
    marginBottom: "20px",
    textAlign: "center"
  },
  mainCalorieMetric: {
    display: "flex",
    flexDirection: "column",
    marginBottom: "10px"
  },
  calorieValue: {
    fontSize: "28px",
    fontWeight: "bold",
    color: "#166534"
  },
  calorieLabel: {
    fontSize: "12px",
    color: "#15803d",
    textTransform: "uppercase",
    fontWeight: "600",
    letterSpacing: "0.5px"
  },
  macroSplitRow: {
    display: "flex",
    justifyContent: "space-around",
    borderTop: "1px solid #dcfce7",
    paddingTop: "10px"
  },
  macroBadge: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  macroGram: {
    fontSize: "14px",
    fontWeight: "700",
    color: "#1e2937"
  },
  macroName: {
    fontSize: "11px",
    color: "#6b7280",
    fontWeight: "500"
  },
  formGroup: {
    display: "flex",
    flexDirection: "column",
    gap: "6px",
    marginBottom: "15px"
  },
  label: {
    fontSize: "11px",
    fontWeight: "700",
    color: "#374151",
    textTransform: "uppercase",
    letterSpacing: "0.5px"
  },
  input: {
    width: "100%",
    padding: "12px 14px",
    border: "1px solid #d1d5db",
    borderRadius: "8px",
    fontSize: "15px",
    boxSizing: "border-box",
    outline: "none",
    backgroundColor: "#ffffff",
    color: "#1f2937"
  },
  select: {
    width: "100%",
    padding: "12px 14px",
    border: "1px solid #d1d5db",
    borderRadius: "8px",
    fontSize: "15px",
    boxSizing: "border-box",
    outline: "none",
    backgroundColor: "#ffffff",
    color: "#1f2937"
  },
  button: {
    width: "100%",
    padding: "14px",
    backgroundColor: "#005f56",
    color: "#ffffff",
    border: "none",
    borderRadius: "8px",
    fontSize: "16px",
    fontWeight: "600",
    cursor: "pointer",
    marginTop: "5px",
  },
  historyContainer: {
    width: "100%",
    boxSizing: "border-box"
  },
  historyTitle: {
    color: "#ffffff",
    fontSize: "18px",
    margin: "10px 0 12px 0",
    textShadow: "1px 1px 4px rgba(0,0,0,0.6)"
  },
  noLogsMessage: {
    color: "#d1d5db",
    fontSize: "14px",
    textAlign: "center",
    marginTop: "10px"
  },
  historyCard: {
    backgroundColor: "rgba(255, 255, 255, 0.95)",
    padding: "12px 15px",
    borderRadius: "8px",
    marginBottom: "10px",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center"
  },
  historyCardLeft: {
    display: "flex",
    flexDirection: "column",
    gap: "2px"
  },
  historyMealBadge: {
    fontSize: "10px",
    fontWeight: "bold",
    backgroundColor: "#e0f2fe",
    color: "#0369a1",
    padding: "2px 6px",
    borderRadius: "4px",
    width: "fit-content",
    textTransform: "uppercase"
  },
  historyFoodName: {
    fontSize: "15px",
    fontWeight: "600",
    color: "#1f2937",
    marginTop: "2px"
  },
  historyDate: {
    fontSize: "11px",
    color: "#9ca3af"
  },
  historyCardRight: {
    display: "flex",
    alignItems: "center",
    gap: "12px"
  },
  historyCalorieCount: {
    fontSize: "15px",
    fontWeight: "700",
    color: "#dc2626"
  },
  deleteBtn: {
    background: "transparent",
    border: "none",
    color: "#9ca3af",
    fontSize: "14px",
    cursor: "pointer",
    padding: "4px"
  }
};

export default Diet;