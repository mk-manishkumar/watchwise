import React, { useState, useEffect } from "react";

const DayNightMode = () => {
  const [isDarkMode, setIsDarkMode] = useState(true);

  // Effect to apply the theme to the body
  useEffect(() => {
    document.body.className = isDarkMode ? "dark-mode" : "light-mode";
  }, [isDarkMode]);

  // Toggle handler
  const toggleMode = () => {
    setIsDarkMode((prevMode) => !prevMode);
  };

  return (
    <button onClick={toggleMode} className="theme-toggle" aria-label="Toggle theme mode">
      {isDarkMode ? <i className="fa-solid fa-sun" aria-hidden="true"></i> : <i className="fa-solid fa-moon" aria-hidden="true"></i>}
    </button>
  );
};

export default DayNightMode;
