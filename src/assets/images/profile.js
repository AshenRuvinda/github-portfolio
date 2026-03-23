/**
 * Profile Image Configuration
 *
 * This file manages the profile image for the portfolio.
 *
 * To use your own profile image:
 * 1. Replace the 'profile.jpg' file in this folder with your image
 * 2. Supported formats: JPG, PNG, GIF, WebP
 * 3. Recommended size: 260x260px or larger (square aspect ratio)
 * 4. Maximum file size: 5MB
 *
 * If no image is found, the component will fallback to initials on a gradient background.
 */

import { getProfileImageUrl } from '../../utils/imageUtils';

// Export the profile image URL
export const profileImage = getProfileImageUrl();

// Export fallback configuration
export const fallbackConfig = {
  background: 'bg-gradient-to-br from-violet-600 via-blue-500 to-cyan-400',
  initials: 'AR',
  textColor: 'text-white',
  textSize: 'text-7xl'
};