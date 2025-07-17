import { useState, useEffect } from "react";
import { FaMoon, FaSun } from "react-icons/fa";

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
      {darkMode ? <FaSun className="text-yellow-400 hover:text-yellow-300 text-2xl" /> : <FaMoon className="text-gray-800 hover:text-gray-600 text-2xl" />}
    </button>
  );

};

export default DayNightMode;
