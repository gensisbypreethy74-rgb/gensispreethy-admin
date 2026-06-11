/**
 * Image URL Utilities for Admin Panel
 * Handles image URL construction with proper backend path resolution
 */

/**
 * Get full image URL from backend path or remote URL
 * @param imagePath - Image path or URL from API (e.g., "/uploads/image.jpg" or "https://...")
 * @returns Full image URL ready for img src
 */
export const getImageUrl = (imagePath: string | undefined | null): string => {
  // Handle missing/null/empty paths
  if (!imagePath || imagePath.trim() === '') {
    return getPlaceholderUrl('No image available');
  }

  // Already a full URL (http/https)
  if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) {
    return imagePath;
  }

  // Backend uploads path
  if (imagePath.startsWith('/uploads/')) {
    const baseUrl = 
      process.env.NEXT_PUBLIC_BACKEND_URL?.replace(/\/api.*$/, '') || 
      'http://localhost:5000';
    return `${baseUrl}${imagePath}`;
  }

  // Data URL (base64)
  if (imagePath.startsWith('data:')) {
    return imagePath;
  }

  // Fallback to placeholder for unrecognized formats
  return getPlaceholderUrl('Invalid image');
};

/**
 * Get placeholder URL with optional message
 * @param message - Optional message to display
 * @returns Placeholder image URL
 */
export const getPlaceholderUrl = (message: string = 'Image not available'): string => {
  const encodedMessage = encodeURIComponent(message);
  return `https://via.placeholder.com/300?text=${encodedMessage}`;
};

/**
 * Handle image error with fallback
 * @param event - Image element event
 * @param fallbackUrl - URL to use on error
 */
export const handleImageError = (
  event: React.SyntheticEvent<HTMLImageElement, Event>,
  fallbackUrl?: string
): void => {
  const img = event.currentTarget;
  
  if (fallbackUrl) {
    img.src = fallbackUrl;
  } else {
    img.src = getPlaceholderUrl('Image failed to load');
  }
  
  // Add visual indication of error
  img.classList.add('opacity-75', 'grayscale');
};

/**
 * Get safe image URL with fallback
 * @param primaryPath - Primary image path
 * @param fallbackPath - Fallback image path if primary fails
 * @returns Primary URL or fallback URL
 */
export const getSafeImageUrl = (
  primaryPath: string | undefined,
  fallbackPath?: string | undefined
): string => {
  const primary = getImageUrl(primaryPath);
  
  // If primary looks like an error placeholder, try fallback
  if (primary.includes('placeholder') && fallbackPath) {
    const fallback = getImageUrl(fallbackPath);
    if (!fallback.includes('placeholder')) {
      return fallback;
    }
  }
  
  return primary;
};

// Export all utilities
export default {
  getImageUrl,
  getPlaceholderUrl,
  handleImageError,
  getSafeImageUrl,
};