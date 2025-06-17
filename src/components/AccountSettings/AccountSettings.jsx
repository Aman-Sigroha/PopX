import React, { useState, useEffect } from 'react';
import { API_ENDPOINTS } from '../../utils/api';
import './AccountSettings.css';

const AccountSettings = () => {
  const [profileImage, setProfileImage] = useState(null);
  // For demonstration, let's assume a fixed userId. In a real app, this would come from your authentication context.
  const userId = 1; 

  // Fetch profile image on component mount
  useEffect(() => {
    const fetchProfileImage = async () => {
      try {
        const response = await fetch(API_ENDPOINTS.PROFILE_PICTURE(userId));
        if (response.ok) {
          const blob = await response.blob();
          const imageUrl = URL.createObjectURL(blob);
          setProfileImage(imageUrl);
        } else if (response.status === 404) {
          // No profile picture found, set to null (default icon)
          setProfileImage(null);
        } else {
          console.error('Failed to fetch profile picture', await response.json());
        }
      } catch (error) {
        console.error('Error fetching profile picture:', error);
      }
    };
    fetchProfileImage();

    // Cleanup function to revoke the object URL
    return () => {
      if (profileImage) {
        URL.revokeObjectURL(profileImage);
      }
    };
  }, [userId]); // Dependency array includes userId

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append('profile_picture', file); 
      formData.append('userId', userId);

      try {
        const response = await fetch(API_ENDPOINTS.UPLOAD_PROFILE_PICTURE, {
          method: 'POST',
          body: formData,
        });

        if (response.ok) {
          const imageResponse = await fetch(API_ENDPOINTS.PROFILE_PICTURE(userId));
          if (imageResponse.ok) {
            const blob = await imageResponse.blob();
            const imageUrl = URL.createObjectURL(blob);
            setProfileImage(imageUrl);
            console.log('Profile picture uploaded successfully.');
          } else {
            console.error('Failed to re-fetch profile picture after upload.', await imageResponse.json());
          }
        } else {
          const errorData = await response.json();
          console.error('Profile picture upload failed:', errorData.message);
          alert(`Upload failed: ${errorData.message}`);
        }
      } catch (error) {
        console.error('Error uploading profile picture:', error);
        alert('An error occurred during upload.');
      }
    }
  };

  const handleCameraIconClick = () => {
    document.getElementById('profilePictureInput').click();
  };

  return (
    <div className="account-settings-container">
      <h1 className="settings-header">Account Settings</h1>
      <div className="profile-section">
        <div style={{ position: 'relative' }}> {/* Wrapper for profile image and camera icon */}
          <div className="profile-image-wrapper">
            {profileImage ? (
              <img src={profileImage} alt="Profile" className="profile-image" />
            ) : (
              // Default user icon SVG
              <svg className="default-profile-icon" width="100" height="100" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 5C13.66 5 15 6.34 15 8C15 9.66 13.66 11 12 11C10.34 11 9 9.66 9 8C9 6.34 10.34 5 12 5ZM12 19.2C9.5 19.2 7.29 17.92 6 15.98C6.03 13.99 10 12.9 12 12.9C13.99 12.9 17.97 13.99 18 15.98C16.71 17.92 14.5 19.2 12 19.2Z" fill="#B0B0B0"/>
              </svg>
            )}
          </div>
          <div className="camera-icon-overlay" onClick={handleCameraIconClick}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="white" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 7.5C10.51 7.5 9.15 8.1 8.11 9.11C7.07 10.15 6.5 11.51 6.5 13C6.5 14.49 7.07 15.85 8.11 16.89C9.15 17.9 10.51 18.5 12 18.5C13.49 18.5 14.85 17.9 15.89 16.89C16.93 15.85 17.5 14.49 17.5 13C17.5 11.51 16.93 10.15 15.89 9.11C14.85 8.1 13.49 7.5 12 7.5ZM12 9.5C12.83 9.5 13.5 10.17 13.5 11C13.5 11.83 12.83 12.5 12 12.5C11.17 12.5 10.5 11.83 10.5 11C10.5 10.17 11.17 9.5 12 9.5ZM12 14.5C12.83 14.5 13.5 15.17 13.5 16C13.5 16.83 12.83 17.5 12 17.5C11.17 17.5 10.5 16.83 10.5 16C10.5 15.17 11.17 14.5 12 14.5Z" fill="white"/><path d="M20 5H18.5L16.5 3H7.5L5.5 5H4C2.9 5 2 5.9 2 7V19C2 20.1 2.9 21 4 21H20C21.1 21 22 20.1 22 19V7C22 5.9 21.1 5 20 5ZM20 19H4V7H8.05L9.05 6H14.95L15.95 7H20V19Z" fill="white"/>
            </svg>
          </div>
        </div>
        <div className="user-info">
          <p className="user-name">Marry Doe</p>
          <p className="user-email">Marry@Gmail.com</p>
        </div>
      </div>
      <p className="description-text">
        Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam
      </p>
      {/* Hidden file input */}
      <input
        type="file"
        id="profilePictureInput"
        style={{ display: 'none' }}
        accept="image/*"
        onChange={handleFileChange}
      />
    </div>
  );
};

export default AccountSettings;