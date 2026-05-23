import React, { useState } from 'react';

function Profile() {
  const [activeTab, setActiveTab] = useState('overview');
  const [isEditing, setIsEditing] = useState(false);
  const [user, setUser] = useState({
    name: 'Arathy',
    email: 'arathykannan31@gmail.com',
    phone: '983809320',
    goal: 'Muscle Gain & Endurance',
    joined: 'January 2026',
    weight: '64 kg',
    height: '168 cm',
    level: 'Intermediate',
    streak: '12 Days'
  });

  const handleUpdate = (e) => {
    e.preventDefault();
    setIsEditing(false);
    alert("Profile configurations updated securely! 🎉");
  };

  return (
  
    <div style={styles.dashboardContainer}>
      {/* LEFT COLUMN: Hero Profile Card */}
      <div style={styles.leftColumn}>
        <div style={styles.heroCard}>
          <div style={styles.avatarWrapper}>
            <img 
              src="https://unsplash.com" 
              alt="Profile Avatar" 
              style={styles.avatarImage} 
            />
            <div style={styles.onlineBadge}></div>
          </div>
          <h2 style={styles.profileName}>{user.name}</h2>
          <p style={styles.profileRole}>{user.level} Athlete</p>
          <span style={styles.streakBadge}>🔥 {user.streak} Streak</span>
          
          <div style={styles.divider}></div>
          
          <div style={styles.miniMeta}>
            <div>
              <p style={styles.metaVal}>{user.weight}</p>
              <p style={styles.metaLbl}>Weight</p>
            </div>
            <div style={styles.verticalDivider}></div>
            <div>
              <p style={styles.metaVal}>{user.height}</p>
              <p style={styles.metaLbl}>Height</p>
            </div>
          </div>
        </div>
      </div>

      {/* RIGHT COLUMN: Interactive Control Hub */}
      <div style={styles.rightColumn}>
        {/* Navigation Tabs */}
        <div style={styles.tabBar}>
          <button 
            onClick={() => setActiveTab('overview')} 
            style={activeTab === 'overview' ? styles.activeTabBtn : styles.tabBtn}
          >
            Overview
          </button>
          <button 
            onClick={() => setActiveTab('biometrics')} 
            style={activeTab === 'biometrics' ? styles.activeTabBtn : styles.tabBtn}
          >
            Biometrics
          </button>
          <button 
            onClick={() => setActiveTab('settings')} 
            style={activeTab === 'settings' ? styles.activeTabBtn : styles.tabBtn}
          >
            Account Settings
          </button>
        </div>

        {/* TAB CONTENT: OVERVIEW */}
        {activeTab === 'overview' && (
          <div style={styles.tabContentAnim}>
            <h3 style={styles.sectionHeader}>Activity Analytics Dashboard</h3>
            <div style={styles.statsGrid}>
              <div style={styles.metricCard}>
                <span style={styles.iconCircle}>🏆</span>
                <div>
                  <h4 style={styles.metricTitle}>Workouts Logged</h4>
                  <p style={styles.metricValue}>24 Completed</p>
                </div>
              </div>
              <div style={styles.metricCard}>
                <span style={styles.iconCircle}>⚡</span>
                <div>
                  <h4 style={styles.metricTitle}>Active Target Goal</h4>
                  <p style={styles.metricValuePrimary}>{user.goal}</p>
                </div>
              </div>
            </div>

            {/* Visual Progress Insight Box */}
            <div style={styles.progressBanner}>
              <div style={styles.progressTextSide}>
                <h4>Monthly Goal Progress</h4>
                <p>You are completing 82% more training sessions compared to last month.</p>
              </div>
              <div style={styles.circularProgressBox}>
                <span style={styles.progressPercent}>82%</span>
              </div>
            </div>
          </div>
        )}

        {/* TAB CONTENT: BIOMETRICS */}
        {activeTab === 'biometrics' && (
          <div style={styles.tabContentAnim}>
            <h3 style={styles.sectionHeader}>Body Composition Analysis</h3>
            <div style={styles.infoBlockList}>
              <div style={styles.infoPill}><strong>Current Weight:</strong> <span>{user.weight}</span></div>
              <div style={styles.infoPill}><strong>Body Height:</strong> <span>{user.height}</span></div>
              <div style={styles.infoPill}><strong>Target Track Mode:</strong> <span>Lean Bulk</span></div>
              <div style={styles.infoPill}><strong>Daily Calorie Ceiling:</strong> <span>2,450 kcal</span></div>
            </div>
          </div>
        )}

        {/* TAB CONTENT: SETTINGS (EDIT FORM) */}
        {activeTab === 'settings' && (
          <div style={styles.tabContentAnim}>
            <h3 style={styles.sectionHeader}>Modify Profile Settings</h3>
            <form onSubmit={handleUpdate} style={styles.editForm}>
              <div style={styles.inputWrapper}>
                <label style={styles.inputLabel}>Full Username</label>
                <input 
                  type="text" 
                  value={user.name} 
                  onChange={(e) => setUser({...user, name: e.target.value})} 
                  style={styles.formInput}
                />
              </div>
              <div style={styles.inputWrapper}>
                <label style={styles.inputLabel}>Email Address</label>
                <input 
                  type="email" 
                  value={user.email} 
                  onChange={(e) => setUser({...user, email: e.target.value})} 
                  style={styles.formInput}
                />
              </div>
              <button type="submit" style={styles.submitBtn}>Save Global Settings</button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}

// Complete Premium CSS UI Design Config Sheet
const styles = {
  dashboardContainer: {
    display: 'flex',
    gap: '30px',
    maxWidth: '1100px',
    margin: '0 auto',
    padding: '20px',
    fontFamily: '"Segoe UI", Roboto, Helvetica, sans-serif',
    flexWrap: 'wrap'
  },
  leftColumn: {
    flex: '1',
    minWidth: '280px'
  },
  rightColumn: {
    flex: '2.5',
    minWidth: '320px'
  },
  heroCard: {
    backgroundColor: '#ffffff',
    borderRadius: '20px',
    padding: '35px 25px',
    textAlign: 'center',
    boxShadow: '0 10px 30px rgba(0,0,0,0.04)',
    border: '1px solid #f1f5f9',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  avatarWrapper: {
    position: 'relative',
    marginBottom: '15px'
  },
  avatarImage: {
    width: '110px',
    height: '110px',
    borderRadius: '50%',
    objectFit: 'cover',
    border: '3px solid #005f56'
  },
  onlineBadge: {
    position: 'absolute',
    bottom: '6px',
    right: '6px',
    width: '14px',
    height: '14px',
    backgroundColor: '#22c55e',
    borderRadius: '50%',
    border: '2.5px solid #ffffff'
  },
  profileName: {
    fontSize: '22px',
    fontWeight: '700',
    color: '#0f172a',
    margin: '0 0 4px 0'
  },
  profileRole: {
    fontSize: '14px',
    color: '#64748b',
    margin: '0 0 15px 0',
    fontWeight: '500'
  },
  streakBadge: {
    backgroundColor: '#fef2f2',
    color: '#ef4444',
    padding: '6px 14px',
    borderRadius: '30px',
    fontSize: '13px',
    fontWeight: '600'
  },
  divider: {
    width: '100%',
    height: '1px',
    backgroundColor: '#f1f5f9',
    margin: '25px 0'
  },
  miniMeta: {
    display: 'flex',
    justifyContent: 'space-around',
    width: '100%'
  },
  metaVal: {
    fontSize: '18px',
    fontWeight: '700',
    color: '#0f172a',
    margin: '0'
  },
  metaLbl: {
    fontSize: '12px',
    color: '#94a3b8',
    margin: '2px 0 0 0',
    textTransform: 'uppercase',
    fontWeight: '600'
  },
  verticalDivider: {
    width: '1px',
    backgroundColor: '#f1f5f9'
  },
  tabBar: {
    display: 'flex',
    gap: '10px',
    borderBottom: '2px solid #f1f5f9',
    marginBottom: '25px',
    paddingBottom: '2px'
  },
  tabBtn: {
    padding: '10px 20px',
    backgroundColor: 'transparent',
    border: 'none',
    color: '#64748b',
    fontSize: '15px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.2s'
  },
  activeTabBtn: {
    padding: '10px 20px',
    backgroundColor: 'transparent',
    border: 'none',
    color: '#005f56',
    fontSize: '15px',
    fontWeight: '700',
    cursor: 'pointer',
    borderBottom: '3px solid #005f56',
    marginBottom: '-5px'
  },
  tabContentAnim: {
    backgroundColor: '#ffffff',
    borderRadius: '20px',
    padding: '30px',
    boxShadow: '0 10px 30px rgba(0,0,0,0.04)',
    border: '1px solid #f1f5f9'
  },
  sectionHeader: {
    fontSize: '18px',
    fontWeight: '700',
    color: '#0f172a',
    margin: '0 0 20px 0'
  },
  statsGrid: {
    display: 'flex',
    gap: '20px',
    flexWrap: 'wrap',
    marginBottom: '25px'
  },
  metricCard: {
    flex: '1',
    minWidth: '220px',
    backgroundColor: '#f8fafc',
    border: '1px solid #f1f5f9',
    borderRadius: '14px',
    padding: '20px',
    display: 'flex',
    alignItems: 'center',
    gap: '15px'
  },
  iconCircle: {
    width: '45px',
    height: '45px',
    borderRadius: '12px',
    backgroundColor: '#ffffff',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: '20px',
    boxShadow: '0 4px 10px rgba(0,0,0,0.02)'
  },
  metricTitle: {
    margin: '0 0 4px 0',
    fontSize: '12px',
    color: '#64748b',
    textTransform: 'uppercase',
    fontWeight: '600'
  },
  metricValue: {
    margin: '0',
    fontSize: '16px',
    fontWeight: '700',
    color: '#0f172a'
  },
  metricValuePrimary: {
    margin: '0',
    fontSize: '16px',
    fontWeight: '700',
    color: '#005f56'
  },
  progressBanner: {
    display: 'flex',
    backgroundColor: '#f0fdf4',
    border: '1px solid #dcfce7',
    borderRadius: '14px',
    padding: '22px',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: '15px'
  },
  progressTextSide: {
    display: 'flex',
    flexDirection: 'column',
    gap: '4px',
    color: '#166534',
    maxWidth: '70%'
  },
  circularProgressBox: {
    width: '65px',
    height: '65px',
    borderRadius: '50%',
    background: 'conic-gradient(#005f56 82%, #e2e8f0 0)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  progressPercent: {
    width: '53px',
    height: '53px',
    backgroundColor: '#f0fdf4',
    borderRadius: '50%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: '14px',
    fontWeight: '700',
    color: '#005f56'
  },
  infoBlockList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px'
  },
  infoPill: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '14px 20px',
    backgroundColor: '#f8fafc',
    borderRadius: '10px',
    fontSize: '15px',
    color: '#334155'
  },
  editForm: {
    display: 'flex',
    flexDirection: 'column',
    gap: '18px'
  },
  inputWrapper: {
    display: 'flex',
    flexDirection: 'column',
    gap: '6px'
  },
  inputLabel: {
    fontSize: '13px',
    fontWeight: '600',
    color: '#475569'
  },
  formInput: {
    padding: '12px 14px',
    border: '1px solid #cbd5e1',
    borderRadius: '8px',
    fontSize: '15px',
    outline: 'none',
    backgroundColor: '#f8fafc'
  },
  submitBtn: {
    padding: '14px',
    backgroundColor: '#005f56',
    color: '#ffffff',
    border: 'none',
    borderRadius: '8px',
    fontSize: '16px',
    fontWeight: '600',
    cursor: 'pointer',
    marginTop: '10px'
  }
};

export default Profile;