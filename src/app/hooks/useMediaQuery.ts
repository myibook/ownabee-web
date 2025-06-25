"use client";

import { useState, useEffect } from 'react';

/**
 * Custom hook for responsive design that detects if a media query is matched
 * @param {string} query - CSS media query string to match against
 * @returns {boolean} Whether the media query matches
 * @example
 * // Usage
 * const isMobile = useMediaQuery('(max-width: 768px)');
 */
const useMediaQuery = (query: string): boolean => {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(query);
    
    // Update the state initially
    setMatches(media.matches);
    
    // Define listener function
    const listener = (event: MediaQueryListEvent) => {
      setMatches(event.matches);
    };
    
    // Add the listener
    media.addEventListener('change', listener);
    
    // Clean up
    return () => {
      media.removeEventListener('change', listener);
    };
  }, [query]);

  return matches;
};

export default useMediaQuery;
