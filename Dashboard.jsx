import React, { useState } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { useFitness } from './FitnessContext'; // Connect global metrics data engine

const Dashboard = () => {
  const navigate = useNavigate();
  const location = useLocation(); // Hook to track active route changes dynamically
  const { workouts, dietLogs, netCalories } = useFitness(); // Destructure live statistics metrics
  const [isOpen, setIsOpen] = useState(false);

  // Helper utility to apply dynamic conditional styling to the active navigation tab
  const getNavItemStyle = (path) => {
    return location.pathname === path ? styles.navItemActive : styles.navItem;
  };

  // Helper utility to format the active header view title label area automatically
  const getHeaderTitle = () => {
    switch (location.pathname) {
      case '/goals': return ' 🎯 Fitness Goals';
      case '/workout': return '💪 Workout Management Logs';
      case '/diet': return '🥗 Diet & Nutritional Logs';
      case '/progress': return '📈 Performance Progress Analytics';
      case '/social': return '👥 Social Sharing Network';
      case '/profile': return '⚙️ Profile Settings Configuration';
      default: return '📊 Activity Control Center Dashboard';
      
    }
  };

  return (
    <div style={styles.container}>
      {/* 1. Left Fixed Structural Sidebar Navigation Menu */}
      <aside style={styles.sidebar}>
        <h2 style={styles.logo}>Fitness Engine</h2>

        <ul style={styles.navList}>
          <li onClick={() => navigate('/dash')} style={getNavItemStyle('/dash')}>📊 Dashboard</li>
           <li onClick={() => navigate('/goals')} style={getNavItemStyle('/workout')}>🎯 Goals</li>
          <li onClick={() => navigate('/workout')} style={getNavItemStyle('/workout')}>💪 Workouts</li>
          <li onClick={() => navigate('/diet')} style={getNavItemStyle('/diet')}>🥗 Diet</li>
          <li onClick={() => navigate('/progress')} style={getNavItemStyle('/progress')}>📈 Progress</li>
          <li onClick={() => navigate('/social')} style={getNavItemStyle('/social')}>👥 Social Sharing</li>
          <li onClick={() => navigate('/profile')} style={getNavItemStyle('/profile')}>⚙️ Profile Settings</li>
        </ul>

        {/* Logout Trigger Action Footer Button */}
        <button 
          onClick={() => {
            localStorage.clear();
            navigate('/');
          }} 
          style={styles.logoutButton}
        >
          Logout
        </button>
      </aside>

      {/* 2. Right Side Main Focus Layout Wrapper Content Window */}
      <div style={styles.mainWrapper}>
        <header style={styles.topHeader}>
          <span>{getHeaderTitle()}</span>
        </header>
        
        <main style={styles.contentArea}>
          {/* Conditional Layout Injection: Display activities list summary if on baseline root path */}
          {location.pathname === '/dash' && (
            <div style={styles.dashboardSummarySection}>
              <h3 style={styles.sectionHeading}>Live Health Analytics Snapshot</h3>
              
              <div style={styles.activitiesGrid}>
                <div style={styles.activityCard}>
                  <div style={styles.iconCircle}>💪</div>
                  <div>
                    <h4 style={styles.activityCardTitle}>Logged Exercises</h4>
                    <p style={styles.activityCardValue}>{workouts.length} Activities</p>
                  </div>
                </div>

                <div style={styles.activityCard}>
                  <div style={styles.iconCircle}>🥗</div>
                  <div>
                    <h4 style={styles.activityCardTitle}>Tracked Meals</h4>
                    <p style={styles.activityCardValue}>{dietLogs.length} Logged Items</p>
                  </div>
                </div>

                <div style={styles.activityCard}>
                  <div style={styles.iconCircle}>⚖️</div>
                  <div>
                    <h4 style={styles.activityCardTitle}>Net Status Balance</h4>
                    <p style={{
                      ...styles.activityCardValue, 
                      color: netCalories <= 0 ? '#10b981' : '#f43f5e'
                    }}>
                      {netCalories} kcal
                    </p>
                  </div>
                </div>
              </div>

              {/* Feed of Recent Logging Operations History Tracking Grid */}
              <div style={styles.historyLogTableBox}>
                <h4 style={styles.subHeadingTitle}>Recent Entries Stream</h4>
                {workouts.length === 0 && dietLogs.length === 0 ? (
                  <p style={styles.emptyFeedText}>No real-time activities found. Open tabs to log values.</p>
                ) : (
                  <div style={styles.feedStreamList}>
                    {workouts.slice(0, 2).map(w => (
                      <div key={w.id} style={styles.feedItem}>
                        <span>🏃 Workout added: <strong>{w.exercise}</strong> ({w.duration} mins)</span>
                        <span style={styles.feedItemTimestamp}>Active</span>
                      </div>
                    ))}
                    {dietLogs.slice(0, 2).map(d => (
                      <div key={d.id} style={styles.feedItem}>
                        <span>🍏 Diet log updated: <strong>{d.food}</strong> ({d.calories} kcal)</span>
                        <span style={styles.feedItemTimestamp}>Active</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* This is where the children nested route pages load dynamic views */}
          <Outlet /> 
        </main>
      </div>
    </div>
  );
};

// Layout Sheet CSS Style Configuration Objects
const styles = {
  container: {
    display: 'flex',
    minHeight: '100vh',
    fontFamily: '"Segoe UI", Roboto, sans-serif',
    backgroundColor: '#f1f5f9'
  },
  sidebar: {
    width: '260px',
    backgroundColor: '#0f172a', 
    color: '#ffffff',
    padding: '25px 15px',
    boxSizing: 'border-box',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between'
  },
  logo: {
    fontSize: '22px',
    margin: '0 0 30px 0',
    textAlign: 'center',
    color: '#38bdf8',
    fontWeight: '700',
    letterSpacing: '0.5px'
  },
  navList: {
    listStyle: 'none',
    padding: 0,
    margin: 0,
    display: 'flex',
    flexDirection: 'column',
    gap: '6px',
    flex: 1
  },
  navItem: {
    padding: '12px 15px',
    borderRadius: '8px',
    cursor: 'pointer',
    color: '#94a3b8',
    fontSize: '14px',
    fontWeight: '500',
    transition: 'all 0.2s ease',
  },
  navItemActive: {
    padding: '12px 15px',
    borderRadius: '8px',
    cursor: 'pointer',
    color: '#ffffff',
    backgroundColor: '#1e293b', 
    fontSize: '14px',
    fontWeight: '600'
  },
  mainWrapper: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column'
  },
  topHeader: {
    height: '60px',
    backgroundColor: '#ffffff',
    display: 'flex',
    alignItems: 'center',
    padding: '0 30px',
    borderBottom: '1px solid #e2e8f0',
    fontWeight: '600',
    fontSize: '16px',
    color: '#1e293b'
  },
  contentArea: {
    padding: '30px',
    flex: 1,
    boxSizing: 'border-box'
  },
  logoutButton: {
    width: '100%',
    padding: '12px',
    backgroundColor: '#ef4444', 
    color: '#ffffff',
    border: 'none',
    borderRadius: '8px',
    fontSize: '14px',
    fontWeight: '600',
    cursor: 'pointer',
    marginTop: 'auto'
  },
  dashboardSummarySection: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
    marginBottom: '25px'
  },
  sectionHeading: {
    margin: '0',
    fontSize: '18px',
    fontWeight: '700',
    color: '#0f172a'
  },
  subHeadingTitle: {
    margin: '0 0 12px 0',
    fontSize: '14px',
    color: '#475569',
    fontWeight: '600'
  },
  activitiesGrid: {
    display: 'flex',
    gap: '16px',
    width: '100%',
    flexWrap: 'wrap'
  },
  activityCard: {
    flex: 1,
    minWidth: '180px',
    backgroundColor: '#ffffff',
    borderRadius: '12px',
    padding: '20px',
    boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
    border: '1px solid #e2e8f0',
    display: 'flex',
    alignItems: 'center',
    gap: '15px'
  },
  iconCircle: {
    width: '45px',
    height: '45px',
    borderRadius: '50%',
    backgroundColor: '#f8fafc',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '20px',
    border: '1px solid #e2e8f0'
  },
  activityCardTitle: {
    margin: '0 0 4px 0',
    fontSize: '12px',
    color: '#64748b',
    fontWeight: '600',
    textTransform: 'uppercase'
  },
  activityCardValue: {
    margin: '0',
    fontSize: '18px',
    fontWeight: '700',
    color: '#0f172a'
  },
  historyLogTableBox: {
    backgroundColor: '#ffffff',
    borderRadius: '12px',
    padding: '20px',
    border: '1px solid #e2e8f0',
    boxShadow: '0 1px 3px rgba(0,0,0,0.05)'
  },
  emptyFeedText: {
    margin: '0',
    fontSize: '13px',
    color: '#94a3b8',
    textAlign: 'center',
    padding: '10px 0'
  },
  feedStreamList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px'
  },
  feedItem: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '10px 12px',
    backgroundColor: '#f8fafc',
    borderRadius: '6px',
    fontSize: '13px',
    color: '#334155',
    borderLeft: '4px solid #38bdf8'
  },
  feedItemTimestamp: {
    fontSize: '11px',
    color: '#10b981',
    fontWeight: '700',
    textTransform: 'uppercase'
  }
};

export default Dashboard;