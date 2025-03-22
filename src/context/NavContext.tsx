import React, { createContext, useState, useEffect, ReactNode } from "react";
import { getNavigation } from "../services/api";

export interface NavItem {
  id: number;
  title: string;
  target: string;
  visible?: boolean;
  children?: NavItem[];
}

interface NavContextType {
  navItems: NavItem[];
  setNavItems: React.Dispatch<React.SetStateAction<NavItem[]>>;
}

export const NavContext = createContext<NavContextType>({
  navItems: [],
  setNavItems: () => {},
});

interface NavProviderProps {
  children: ReactNode;
}

export const NavProvider: React.FC<NavProviderProps> = ({ children }) => {
  const [navItems, setNavItems] = useState<NavItem[]>([]);

  useEffect(() => {
    async function fetchNav() {
      try {
        const data = await getNavigation();
        setNavItems(data);
      } catch (error) {
        console.error("Failed to fetch navigation data:", error);
      }
    }
    fetchNav();
  }, []);

  return (
    <NavContext.Provider value={{ navItems, setNavItems }}>
      {children}
    </NavContext.Provider>
  );
};
