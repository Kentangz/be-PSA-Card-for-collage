"use client";

import { useTheme } from "next-themes"
import { useEffect, useState } from "react";
import { BiMoon, BiSun } from "react-icons/bi";

export default function ToggleTheme() {
  const { theme, setTheme } = useTheme()
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    if (theme == "dark") {
      setIsDark(true);
    }
  }, [theme]);

  const toggleDarkMode = () => {
    setTheme(theme == "dark" ? "light" : "dark")
    setIsDark(!isDark)
  }

  return <button
    onClick={toggleDarkMode}
    className="text-xl cursor-pointer"
  >
    {
      isDark ? <BiSun /> : <BiMoon />
    }
  </button>
}
