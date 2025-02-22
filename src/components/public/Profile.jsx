import React, { useState, useEffect } from 'react';
import '../../css/Profile.css';

const Profile = () => {
  const [profile, setProfile] = useState({
    name: '',
    contact: '',
    phoneNumber: '',
    password: '',
  });
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await fetch('/api/profile', {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
        });
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setProfile(data);
        setLoading(false);
      } catch (err) {
        setError(err.message || 'Failed to load profile. Please try again later.');
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((prevProfile) => ({
      ...prevProfile,
      [name]: value,
    }));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/profile', {
        method: 'POST', // Or PUT for updates
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(profile),
      });
      if (!response.ok) {
        throw new Error('Failed to save profile');
      }
      setIsEditing(false);
      alert('Profile saved successfully!');
    } catch (err) {
      setError(err.message);
    }
  };

  const handleUpdate = () => {
    setIsEditing(true);
  };

  if (loading) {
    return <div className="loading">Loading profile...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div className="content">
      <h2>Profile</h2>
      <div className="profile-container">
        <form onSubmit={handleSave} className="profile-form">
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={profile.name}
              onChange={handleChange}
              disabled={!isEditing}
              className="profile-input"
              placeholder="Enter your name"
            />
          </div>
          <div className="form-group">
            <label htmlFor="contact">Contact (Email)</label>
            <input
              type="email"
              id="contact"
              name="contact"
              value={profile.contact}
              onChange={handleChange}
              disabled={!isEditing}
              className="profile-input"
              placeholder="Enter your email"
            />
          </div>
          <div className="form-group">
            <label htmlFor="phoneNumber">Phone Number</label>
            <input
              type="tel"
              id="phoneNumber"
              name="phoneNumber"
              value={profile.phoneNumber}
              onChange={handleChange}
              disabled={!isEditing}
              className="profile-input"
              placeholder="Enter your phone number"
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={profile.password}
              onChange={handleChange}
              disabled={!isEditing}
              className="profile-input"
              placeholder="Enter your password"
            />
          </div>
          <div className="button-group">
            {isEditing ? (
              <button type="submit" className="save-button">
                Save
              </button>
            ) : (
              <button type="button" className="update-button" onClick={handleUpdate}>
                Update
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default Profile;