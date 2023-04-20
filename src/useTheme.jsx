import React, { useEffect } from 'react';

// to define 'theme' and 'toggleTheme' and export
const useTheme = () => {
  const prevTheme = localStorage.getItem('theme');

  const [theme, setTheme] = React.useState(() => {
    if (prevTheme) return prevTheme;
    return window.matchMedia('prefers-color-scheme: dark').matches
      ? 'dark'
      : 'light';
  });
  //   console.log(`theme in useTheme is ${theme}`);

  useEffect(() => {
    // decide 'dark' or 'light' from root element
    const root = window.document.documentElement;
    if (theme === 'dark') {
      root.classList.remove('light');
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
      root.classList.add('light');
    }
    // also save theme to localstorage
    localStorage.setItem('theme', theme);
  }, [theme]);

  // toggle method
  const toggleTheme = () => {
    setTheme((pre) => (pre === 'dark' ? 'light' : 'dark'));
    // console.log('in toggle');
  };

  return { theme, toggleTheme };
};

export default useTheme;
