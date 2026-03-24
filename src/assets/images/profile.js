/**
 * Profile Image Configuration
 *
 * This file manages the profile image for the portfolio.
 *
 * To use your profile image:
 * 1. Go to src/utils/imageUtils.js
 * 2. Replace the PROFILE_IMAGE_URL with your internet image URL
 * 3. Make sure the URL is publicly accessible and allows cross-origin requests
 * 4. Supported formats: JPG, PNG, GIF, WebP
 * 5. Recommended size: 260x260px or larger (square aspect ratio)
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