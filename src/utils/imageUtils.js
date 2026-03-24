/**
 * Profile Image Utilities
 * Functions for handling profile image storage and management
 */

// You can set this to an internet URL for your profile picture
export const PROFILE_IMAGE_URL = 'https://github.com/AshenRuvinda/ProjectImages/blob/master/profile.jpg?raw=true'; // Replace with your internet image URL

// Fallback image (gradient with initials)
export const FALLBACK_AVATAR = {
  background: 'bg-gradient-to-br from-violet-600 via-blue-500 to-cyan-400',
  initials: 'AR',
  textColor: 'text-white',
  textSize: 'text-7xl'
};

/**
 * Get the profile image URL
 * @returns {string} The profile image URL
 */
export const getProfileImageUrl = () => {
  return PROFILE_IMAGE_URL;
};

/**
 * Check if profile image exists
 * @param {string} imageUrl - The image URL to check
 * @returns {Promise<boolean>} Promise that resolves to true if image exists
 */
export const checkImageExists = (imageUrl) => {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => resolve(true);
    img.onerror = () => resolve(false);
    img.src = imageUrl;
  });
};

/**
 * Handle profile image loading with fallback
 * @param {Function} onSuccess - Callback when image loads successfully
 * @param {Function} onError - Callback when image fails to load
 */
export const handleProfileImageLoad = async (onSuccess, onError) => {
  const imageUrl = getProfileImageUrl();
  const exists = await checkImageExists(imageUrl);

  if (exists) {
    onSuccess(imageUrl);
  } else {
    onError();
  }
};

/**
 * Validate image file type
 * @param {File} file - The file to validate
 * @returns {boolean} True if file is a valid image
 */
export const validateImageFile = (file) => {
  const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
  return validTypes.includes(file.type);
};

/**
 * Validate image file size
 * @param {File} file - The file to validate
 * @param {number} maxSizeMB - Maximum size in MB (default: 5MB)
 * @returns {boolean} True if file size is valid
 */
export const validateImageSize = (file, maxSizeMB = 5) => {
  const maxSizeBytes = maxSizeMB * 1024 * 1024;
  return file.size <= maxSizeBytes;
};

/**
 * Generate optimized image URL for different sizes
 * @param {string} baseUrl - Base image URL
 * @param {string} size - Size variant (thumbnail, medium, large)
 * @returns {string} Optimized image URL
 */
export const getOptimizedImageUrl = (baseUrl, size = 'medium') => {
  // This could be extended to use image optimization services
  return baseUrl;
};