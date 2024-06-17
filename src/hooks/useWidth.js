/* eslint-disable no-undef */
import { useEffect, useState } from 'react';

export const useWidth = () => {
  // Initialize width with undefined or a fallback value
  const [width, setWidth] = useState(
    typeof window !== 'undefined' ? window.innerWidth : 0,
  );

  useEffect(() => {
    // Ensure window is defined before attaching event listener
    if (typeof window !== 'undefined') {
      const handleResize = () => setWidth(window.innerWidth);
      window.addEventListener('resize', handleResize);

      // Cleanup listener on component unmount
      return () => window.removeEventListener('resize', handleResize);
    }
  }, []);

  return width;
};
