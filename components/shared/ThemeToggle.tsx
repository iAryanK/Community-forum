"use client";

import React, { useEffect, useState } from "react";
import { Toggle } from "@/components/ui/toggle";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

const ThemeToggle = () => {
  const [isLight, setIsLight] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    if (theme === "light") {
      setIsLight(true);
      setTheme("light");
    }
  }, [setTheme, theme]);

  const enableLightMode = () => {
    setTheme("light");
    setIsLight(true);
  };

  const enableDarkMode = () => {
    setTheme("dark");
    setIsLight(false);
  };

  return (
    <Toggle className="rounded-full">
      {!isLight ? (
        <>
          <Sun
            onClick={enableLightMode}
            className="transition ease-in-out p-[1px] hover:scale-105"
          />
        </>
      ) : (
        <div className="flex gap-2 w-full">
          <Moon
            onClick={enableDarkMode}
            className="transition ease-in-out p-[1px] hover:scale-105"
          />
        </div>
      )}
    </Toggle>
  );
};

export default ThemeToggle;
