# Profile Images

This folder contains profile images for the portfolio.

## How to Add Your Profile Picture

1. **Replace the placeholder image:**
   - Replace `profile.jpg` with your actual profile image
   - Supported formats: JPG, PNG, GIF, WebP
   - Recommended size: 260x260px or larger (square images work best)
   - Maximum file size: 5MB

2. **File naming:**
   - The image should be named `profile.jpg` (or update the path in `profile.js`)
   - The system will automatically detect and use your image

3. **Fallback behavior:**
   - If no image is found, the profile card will show initials (AR) on a gradient background
   - This ensures the portfolio always looks professional

## Image Requirements

- **Format:** JPG, PNG, GIF, or WebP
- **Size:** Minimum 260x260px (will be cropped to square)
- **Aspect Ratio:** Square preferred, but rectangular images will be centered and cropped
- **Quality:** High quality for best display on retina screens

## Utility Functions

The `src/utils/imageUtils.js` file contains helper functions for:
- Image validation
- Size checking
- Fallback handling
- Optimization utilities

## Troubleshooting

- **Image not showing:** Check that the file is named correctly and is in the right folder
- **Image too large:** Compress your image or resize it to recommended dimensions
- **Wrong format:** Convert to JPG, PNG, GIF, or WebP format