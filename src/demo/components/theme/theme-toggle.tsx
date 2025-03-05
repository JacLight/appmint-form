// ThemeContext.tsx
import React, { createContext, useContext, useEffect, useState } from 'react';
import Color from 'color';
import { useFormStore } from '../../../library/context/store';
import { useShallow } from 'zustand/shallow';
import { IconRenderer } from '../../../library/common/icons/icon-renderer';

const defaultTheme = {
    colors: {
        primary: '#0cd6a0',
        secondary: '#c6842d',
        accent: '#c44a5c',
        neutral: '#22263A',
        base100: '#FFFFFF',
        info: '#9FEAF9',
        success: '#22DD98',
        warning: '#DF7E16',
        error: '#E77489',
    },
}

interface Theme {
    colors: {
        [key: string]: string;
    };
}
interface ThemeContextType {
    theme: Theme;
    setTheme: (theme: Theme) => void;
    darkMode: string;
    setDarkMode: (darkMode: string) => void;
}
const ThemeContext = createContext<ThemeContextType>({} as ThemeContextType);
const colorKeys = ["primary", "secondary", "accent", "neutral", "base100", "info", "success", "warning", "error"]

export const getDarkMode = () => {
    let darkMode = localStorage.getItem('darkMode');
    if (!darkMode) {
        darkMode = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    return darkMode;
}

export const useTheme = () => {
    return useContext(ThemeContext);
};

const generateDarkModeColors = (colors) => {
    const darkModeColors = {};
    colorKeys.forEach(key => {
        const color = Color(colors[key]);
        if (color.luminosity() > 0.5) {
            darkModeColors[key] = color.darken(0.8).hex();
        } else {
            darkModeColors[key] = color.darken(0.2).hex();
        }
    });
    return darkModeColors;
};

export const ThemeToggle: React.FC<any> = ({ children }) => {
    const { theme = defaultTheme, setStateItem } = useFormStore(useShallow(state => ({ theme: state.theme, setStateItem: state.setStateItem })));
    const [darkMode, setDarkMode] = useState(getDarkMode());


    useEffect(() => {
        // Apply dark mode on component mount and when darkMode changes
        changeDarkMode(darkMode);
    }, [darkMode]);

    const changeTheme = (theme: Theme | string) => {
        setStateItem({ theme });
        setDarkMode(getDarkMode());
    };

    const changeDarkMode = (mode?: string) => {
        const root = document.documentElement;
        let newMode = mode;

        if (!newMode) {
            newMode = darkMode === 'dark' ? 'light' : 'dark';
            localStorage.setItem('darkMode', newMode);
        }

        if (newMode === 'dark') {
            root.classList.add('dark');
        } else {
            root.classList.remove('dark');
        }

        if (newMode !== darkMode) {
            setDarkMode(newMode);
        }

        const colorsToApply = newMode === 'dark' ? generateDarkModeColors(theme.colors) : theme.colors;
        Object.keys(colorsToApply).forEach((key) => {
            root.style.setProperty(`--tw-${key}`, colorsToApply[key]);
        });
    };

    const icon = darkMode === 'light' ? 'Sun' : 'Moon'
    return (
        <div>
            {/* <button onClick={() => setTheme('default')} className="p-2 hover:bg-gray-100 rounded-md">
                <IconRenderer icon={icon} className="w-5 h-5" />
            </button> */}
            <button onClick={e => changeDarkMode()} aria-label="Toggle dark mode" className="p-2 hover:bg-gray-100 rounded-md dark:hover:bg-gray-800">
                <IconRenderer icon={icon} className="w-5 h-5 dark:stroke-slate-400" />
            </button>
        </div>

    );
};
