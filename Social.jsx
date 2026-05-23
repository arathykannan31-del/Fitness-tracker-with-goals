import React, { useState, useRef } from 'react';

function Social() {
  const [newPostText, setNewPostText] = useState("");
  const [commentInputs, setCommentInputs] = useState({});
  const [followingCount, setFollowingCount] = useState(1);
  const [attachedPhoto, setAttachedPhoto] = useState(null); // Tracks uploaded photo preview URL

  const fileInputRef = useRef(null);

  // Core Feed Logs Array State
  const [posts, setPosts] = useState([
    {
      id: 1,
      author: "Sona",
      badge: "Marathoner",
      time: "2 hours ago",
      content: "Crushed my morning run! Completed 5km in under 24 minutes today! 🏃‍♀️🔥",
      photoUrl: "https://unsplash.com",
      likes: 12,
      hasLiked: false,
      isFollowing: false,
      comments: [
        { id: 101, user: "Rahul", text: "Insane pace, Sona! Keep it up!", initial: "R" },
        { id: 102, user: "Anjali", text: "Goals! What shoes are you tracking with?", initial: "A" }
      ]
    },
    {
      id: 2,
      author: "Rahul",
      badge: "Powerlifter",
      time: "4 hours ago",
      content: "New personal record! Hit 140kg on the deadlift today! 💪🏋️‍♂️",
      photoUrl: null,
      likes: 8,
      hasLiked: false,
      isFollowing: false,
      comments: []
    }
  ]);

  // Handle local image file upload selection
  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Generate local blob preview path
    const previewUrl = URL.createObjectURL(file);
    setAttachedPhoto(previewUrl);
  };

  // Handle Publishing New Milestones
  const handlePublishPost = (e) => {
    e.preventDefault();
    if (!newPostText.trim() && !attachedPhoto) return;

    const newPostItem = {
      id: Date.now(),
      author: "You",
      badge: "Elite Athlete",
      time: "Just now",
      content: newPostText,
      photoUrl: attachedPhoto, // Links attached preview image asset
      likes: 0,
      hasLiked: false,
      isFollowing: false,
      comments: []
    };

    setPosts([newPostItem, ...posts]);
    setNewPostText("");
    setAttachedPhoto(null);
  };

  // Toggle Like Counts State
  const handleLikeToggle = (postId) => {
    setPosts(prev => prev.map(post => {
      if (post.id === postId) {
        return {
          ...post,
          likes: post.hasLiked ? post.likes - 1 : post.likes + 1,
          hasLiked: !post.hasLiked
        };
      }
      return post;
    }));
  };

  // Toggle Follow System Button Action
  const handleFollowToggle = (postId) => {
    setPosts(prev => prev.map(post => {
      if (post.id === postId) {
        const structuralStateChange = !post.isFollowing;
        setFollowingCount(prevCount => structuralStateChange ? prevCount + 1 : prevCount - 1);
        return { ...post, isFollowing: structuralStateChange };
      }
      return post;
    }));
  };

  const handlePublishComment = (postId) => {
    const text = commentInputs[postId];
    if (!text || !text.trim()) return;

    setPosts(prev => prev.map(post => {
      if (post.id === postId) {
        return {
          ...post,
          comments: [...post.comments, {
            id: Date.now(),
            user: "You",
            text: text,
            initial: "Y"
          }]
        };
      }
      return post;
    }));

    setCommentInputs(prev => ({ ...prev, [postId]: "" }));
  };

  return (
    <div style={styles.fullscreenBackground}>
      <div style={styles.container}>
        
        {/* Main Dashboard Header Row */}
        <header style={styles.hubHeader}>
          <div style={styles.headerLeft}>
            <h1 style={styles.hubTitle}>Fitness Community Hub</h1>
            <p style={styles.hubSubtitle}>Log your milestones, share progress, and elevate your peers</p>
          </div>
          <div style={styles.followingPill}>
            👥 Following {followingCount} Athletes
          </div>
        </header>

        {/* Milestone Post Publisher Composer Card */}
        <div style={styles.composerCard}>
          <div style={styles.composerHeader}>
            <div style={styles.minAvatarCircle}>Y</div>
            <span style={styles.composerTitleText}>Share an athletic milestone...</span>
          </div>
          
          <textarea
            placeholder="Hit a new gym PR? Completed a fasting loop? Share your success with the team..."
            value={newPostText}
            onChange={(e) => setNewPostText(e.target.value)}
            style={styles.composerTextArea}
          />

          {/* Upload Photo Card Preview Tray Window */}
          {attachedPhoto && (
            <div style={styles.previewContainer}>
              <button onClick={() => setAttachedPhoto(null)} style={styles.removePhotoBtn}>✕</button>
              <img src={attachedPhoto} alt="Upload Preview" style={styles.photoPreviewAsset} />
            </div>
          )}

          <div style={styles.composerFooter}>
            {/* Hidden Native Photo Input Core Handler */}
            <input 
              type="file" 
              accept="image/*" 
              ref={fileInputRef} 
              onChange={handlePhotoChange} 
              style={{ display: 'none' }}
            />
            
            <button onClick={() => fileInputRef.current.click()} style={styles.photoAttachBtn}>
              📷 Add Photo
            </button>

            <button onClick={handlePublishPost} style={styles.publishBtn}>
              Publish Post 🚀
            </button>
          </div>
        </div>

        {/* Social Feed Activity Stream Container */}
        <div style={styles.feedWrapper}>
          {posts.map(post => (
            <div key={post.id} style={styles.postCard}>
              
              {/* Post Card Layout Sub-Header */}
              <div style={styles.postCardHeader}>
                <div style={styles.authorMetaLeft}>
                  <div style={styles.postAvatarCircle}>
                    {post.author.charAt(0).toUpperCase()}
                  </div>
                  <div style={styles.authorTextColumn}>
                    <div style={styles.authorRowInline}>
                      <span style={styles.authorName}>{post.author}</span>
                      <span style={styles.authorBadgePill}>{post.badge}</span>
                    </div>
                    <span style={styles.timestampLabel}>{post.time}</span>
                  </div>
                </div>
                
                {post.author !== "You" && (
                  <button 
                    onClick={() => handleFollowToggle(post.id)} 
                    style={post.isFollowing ? styles.followingActiveBtn : styles.followBtn}
                  >
                    {post.isFollowing ? '✓ Following' : '+ Follow'}
                  </button>
                )}
              </div>

              {/* Core Context Post Text Content Body */}
              <p style={styles.postContentBody}>{post.content}</p>

              {/* Feed Content Shared Photo Image Node Layout Layer */}
              {post.photoUrl && (
                <div style={styles.feedPhotoContainer}>
                  <img src={post.photoUrl} alt="Community Shared Workout Snapshot" style={styles.feedPhotoAsset} />
                </div>
              )}

              {/* Feed Card Quick Action Buttons Segment */}
              <div style={styles.actionMetricsBar}>
                <button 
                  onClick={() => handleLikeToggle(post.id)} 
                  style={{...styles.actionMetricBtn, color: post.hasLiked ? '#ef4444' : '#64748b'}}
                >
                  {post.hasLiked ? '❤️' : '🤍'} Like {post.likes}
                </button>
                <span style={styles.commentSummaryText}>
                  💬 {post.comments.length} comments
                </span>
              </div>

              {/* Nested Card Component Comments Threads Area */}
              {post.comments.length > 0 && (
                <div style={styles.commentsThreadBox}>
                  {post.comments.map(cmt => (
                    <div key={cmt.id} style={styles.commentRow}>
                      <div style={styles.commentAvatarMini}>{cmt.initial}</div>
                      <div style={styles.commentContentBubble}>
                        <span style={styles.commentUserName}>{cmt.user}</span>
                        <p style={styles.commentTextBody}>{cmt.text}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Comment Response Input Text Form Subsystem */}
              <div style={styles.commentInputRow}>
                <input
                  type="text"
                  placeholder="Type an encouraging response..."
                  value={commentInputs[post.id] || ""}
                  onChange={(e) => setCommentInputs(prev => ({ ...prev, [post.id]: e.target.value }))}
                  style={styles.commentInputBox}
                  onKeyDown={(e) => e.key === 'Enter' && handlePublishComment(post.id)}
                />
                <button 
                  onClick={() => handlePublishComment(post.id)} 
                  style={styles.replyActionBtn}
                >
                  Reply
                </button>
              </div>

            </div>
          ))}
        </div>

      </div>
    </div>
  );
}

// Unified Responsive CSS Layout System Configuration Sheet
const styles = {
  fullscreenBackground: {
    minHeight: "100vh",
    width: "100%",
    backgroundImage: "linear-gradient(rgba(25, 21, 54, 0.75), rgba(209, 153, 153, 0.75)), url('')",
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
    width: "90%",
    maxWidth: "680px",
    margin: "0 auto",
    fontFamily: '"Segoe UI", Roboto, Helvetica, Arial, sans-serif'
  },
  hubHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "24px",
    flexWrap: "wrap",
    gap: "12px"
  },
  hubTitle: {
    fontSize: "26px",
    fontWeight: "700",
    color: "#ffffff",
    margin: "0 0 4px 0",
    textShadow: "1px 1px 4px rgba(0,0,0,0.6)"
  },
  hubSubtitle: {
    fontSize: "14px",
    color: "#e2e8f0",
    margin: 0
  },
  followingPill: {
    backgroundColor: "rgba(56, 189, 248, 0.15)",
    border: "1px solid rgba(10, 27, 35, 0.3)",
    color: "#a2bdc8",
    padding: "8px 16px",
    borderRadius: "20px",
    fontSize: "13px",
    fontWeight: "600",
    backdropFilter: "blur(4px)"
  },
  composerCard: {
    backgroundColor: "rgba(255, 255, 255, 0.96)",
    borderRadius: "14px",
    padding: "20px",
    boxShadow: "0 10px 25px rgba(0, 0, 0, 0.3)",
    marginBottom: "25px",
    display: "flex",
    flexDirection: "column",
    gap: "12px",
    backdropFilter: "blur(4px)"
  },
  composerHeader: {
    display: "flex",
    alignItems: "center",
    gap: "10px"
  },
  minAvatarCircle: {
    width: "32px",
    height: "32px",
    borderRadius: "50%",
    backgroundColor: "#0f172a",
    color: "#38bdf8",
    display: "flex",
    alignItems: "center",
    justifyContent: 'center',
    fontWeight: "bold",
    fontSize: "14px"
  },
  composerTitleText: {
    fontSize: "14px",
    fontWeight: "600",
    color: "#334155"
  },
  composerTextArea: {
    width: "100%",
    height: "85px",
    border: "1px solid #cbd5e1",
    borderRadius: "10px",
    padding: "14px",
    fontSize: "14px",
    outline: "none",
    resize: "none",
    boxSizing: "border-box",
    fontFamily: "inherit",
    backgroundColor: "#f8fafc",
    color: "#334155"
  },
  previewContainer: {
    position: 'relative',
    width: '100%',
    maxHeight: '220px',
    borderRadius: '10px',
    overflow: 'hidden',
    backgroundColor: '#0f172a',
    border: '1px solid #cbd5e1'
  },
  removePhotoBtn: {
    position: 'absolute',
    top: '10px',
    right: '10px',
    backgroundColor: 'rgba(15, 23, 42, 0.85)',
    color: '#38bdf8',
    border: '1px solid rgba(56, 189, 248, 0.3)',
    borderRadius: '50%',
    width: '28px',
    height: '28px',
    cursor: 'pointer',
    zIndex: 2,
    fontWeight: 'bold',
    fontSize: '12px'
  },
  photoPreviewAsset: {
    width: '100%',
    height: '220px',
    objectFit: 'cover'
  },
  composerFooter: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center"
  },
  photoAttachBtn: {
    padding: "8px 16px",
    backgroundColor: "#f1f5f9",
    color: "#475569",
    border: "1px solid #cbd5e1",
    borderRadius: "6px",
    fontSize: "13px",
    fontWeight: "600",
    cursor: "pointer",
    transition: 'all 0.2s'
  },
  publishBtn: {
    padding: "10px 20px",
    backgroundColor: "#0f172a",
    color: "#ffffff",
    border: "none",
    borderRadius: "8px",
    fontSize: "13px",
    fontWeight: "700",
    cursor: "pointer",
    boxShadow: "0 4px 6px rgba(15,23,42,0.15)"
  },
  feedWrapper: {
    display: "flex",
    flexDirection: "column",
    gap: "20px"
  },
  postCard: {
    backgroundColor: "rgba(255, 255, 255, 0.97)",
    borderRadius: "14px",
    padding: "20px",
    boxShadow: "0 8px 20px rgba(0, 0, 0, 0.2)",
    display: "flex",
    flexDirection: "column"
  },
  postCardHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "14px"
  },
  authorMetaLeft: {
    display: "flex",
    alignItems: "center",
    gap: "12px"
  },
  postAvatarCircle: {
    width: "42px",
    height: "42px",
    borderRadius: "50%",
    backgroundColor: "#005f56",
    color: "#ffffff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: "700",
    fontSize: "18px"
  },
  authorTextColumn: {
    display: "flex",
    flexDirection: "column",
    gap: "2px"
  },
  authorRowInline: {
    display: "flex",
    alignItems: "center",
    gap: "8px"
  },
  authorName: {
    fontSize: "16px",
    fontWeight: "700",
    color: "#0f172a"
  },
  authorBadgePill: {
    fontSize: "11px",
    fontWeight: "600",
    backgroundColor: "#e0f2fe",
    color: "#0369a1",
    padding: "2px 8px",
    borderRadius: "20px"
  },
  timestampLabel: {
    fontSize: "12px",
    color: "#64748b"
  },
  followBtn: {
    padding: "6px 14px",
    backgroundColor: "#ffffff",
    color: "#0f172a",
    border: "1px solid #cbd5e1",
    borderRadius: "20px",
    fontSize: "12px",
    fontWeight: "600",
    cursor: "pointer"
  },
  followingActiveBtn: {
    padding: "6px 14px",
    backgroundColor: "#f1f5f9",
    color: "#475569",
    border: "1px solid #e2e8f0",
    borderRadius: "20px",
    fontSize: "12px",
    fontWeight: "600"
  },
  postContentBody: {
    fontSize: "15px",
    color: "#1e293b",
    lineHeight: "1.5",
    margin: "0 0 14px 0"
  },
  feedPhotoContainer: {
    width: '100%',
    maxHeight: '360px',
    backgroundColor: '#0f172a',
    borderRadius: '10px',
    overflow: 'hidden',
    marginBottom: '16px',
    display: 'flex',
    justifyContent: 'center',
    border: '1px solid #e2e8f0'
  },
  feedPhotoAsset: {
    width: '100%',
    maxHeight: '360px',
    objectFit: 'cover'
  },
  actionMetricsBar: {
    display: "flex",
    justifyContent: "space-between",
    borderTop: "1px solid #f1f5f9",
    borderBottom: "1px solid #f1f5f9",
    padding: "10px 4px",
    marginBottom: "14px"
  },
  actionMetricBtn: {
    background: "none",
    border: "none",
    fontSize: "13px",
    fontWeight: "600",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    gap: "4px"
  },
  commentSummaryText: {
    fontSize: "12px",
    color: "#64748b",
    fontWeight: "500"
  },
  commentsThreadBox: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    backgroundColor: "#f8fafc",
    padding: "12px",
    borderRadius: "10px",
    marginBottom: "14px"
  },
  commentRow: {
    display: "flex",
    gap: "10px",
    alignItems: "flex-start"
  },
  commentAvatarMini: {
    width: "26px",
    height: "26px",
    borderRadius: "50%",
    backgroundColor: "#cbd5e1",
    color: "#334155",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "11px",
    fontWeight: "700",
    marginTop: "2px"
  },
  commentContentBubble: {
    display: "flex",
    flexDirection: "column",
    gap: "2px"
  },
  commentUserName: {
    fontSize: "12px",
    fontWeight: "700",
    color: "#334155"
  },
  commentTextBody: {
    fontSize: "13px",
    color: "#475569",
    margin: 0,
    lineHeight: "1.4"
  },
  commentInputRow: {
    display: "flex",
    gap: "10px",
    alignItems: "center"
  },
  commentInputBox: {
    flex: 1,
    padding: "10px 14px",
    fontSize: "13px",
    border: "1px solid #cbd5e1",
    borderRadius: "8px",
    outline: "none",
    backgroundColor: "#ffffff",
    color: "#334155"
  },
  replyActionBtn: {
    padding: "10px 18px",
    backgroundColor: "#0f172a",
    color: "#ffffff",
    border: "none",
    borderRadius: "8px",
    fontSize: "12px",
    fontWeight: "700",
    cursor: "pointer"
  }
};

export default Social;