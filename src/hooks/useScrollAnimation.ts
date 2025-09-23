import { useEffect } from 'react';

export const useScrollAnimation = () => {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px',
      }
    );

    // Observe all elements with reveal-up class
    const revealElements = document.querySelectorAll('.reveal-up:not(.revealed)');
    revealElements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);
};