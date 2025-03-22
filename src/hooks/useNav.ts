import { useState, useEffect } from 'react';
import { getNavigation, saveNavigation } from '../services/api';
import { NavItem } from '../context/NavContext';

interface UseNavReturnType {
    navItems: NavItem[];
    setNavItems: React.Dispatch<React.SetStateAction<NavItem[]>>;
    saveNavItems: () => Promise<void>;
}

export const useNav = (): UseNavReturnType => {
    const [navItems, setNavItems] = useState<NavItem[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getNavigation();
                setNavItems(data);
            } catch (error) {
                console.error('Error fetching navigation data:', error);
            }
        };

        fetchData();
    }, []);

    const saveNavItems = async () => {
        try {
            await saveNavigation(navItems);
            console.log('Navigation saved successfully');
        } catch (error) {
            console.error('Error saving navigation data:', error);
        }
    };

    return { navItems, setNavItems, saveNavItems };
};
