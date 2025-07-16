import { useState, useEffect } from "react";

const DayNightMode = ({ isDarkMode, setIsDarkMode }) => {
  // Fallback to internal state if not provided (optional support)
  const [internalDarkMode, setInternalDarkMode] = useState(true);

  const darkMode = isDarkMode ?? internalDarkMode;
  const toggleMode = setIsDarkMode ?? setInternalDarkMode;

  useEffect(() => {
    if (isDarkMode === undefined) {
      document.body.className = darkMode ? "dark-mode" : "light-mode";
    }
  }, [darkMode, isDarkMode]);

  return (
    <button onClick={() => toggleMode((prev) => !prev)} className="bg-transparent border-none cursor-pointer text-2xl p-2 transition-colors duration-300" aria-label="Toggle theme mode">
      {darkMode ? <i className="fa-solid fa-sun text-yellow-400" aria-hidden="true"></i> : <i className="fa-solid fa-moon text-red-500" aria-hidden="true"></i>}
    </button>
  );
};

export default DayNightMode;
