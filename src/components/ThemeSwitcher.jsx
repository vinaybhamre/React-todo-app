import { useEffect, useState } from "react";

// import hooks 
import useLocalStorage from "../hooks/UseLocalStorage";

// import styles from module
import styles from "./ThemeSwitcher.module.css";

// import icons 
import { MoonIcon, SunIcon, SwatchIcon, XMarkIcon } from '@heroicons/react/24/outline';

function ThemeSwitcher() {

    const [hue, setHue] = useLocalStorage('react-todo.color', '240')

    const defaultDark = window.matchMedia('(prefer-color-scheme : dark)').matches;

    const [theme, setTheme] = useLocalStorage('react-todo.theme', defaultDark ? "dark" : 'light');

    const [isColorPicking, setIsColorPicking] = useState(false);

    useEffect(() => {
        document.documentElement.setAttribute('color-scheme', theme);
    }, [theme]);
    
    useEffect(() => {
        document.documentElement.style.setProperty('--_hue', hue);
    }, [hue])


  return (
   <aside
   className={styles.wrapper}
   style={
    {
        backgroundColor : isColorPicking ? 'hsl(var(--muted) / .6)'
        : 'transparent'
    }
   }
   >
    {
        isColorPicking ? 
        (
            <>
            <button
            className={`btn ${styles.close}`}
            aria-label="close color picking mode"
            onClick={() => setIsColorPicking(false)}
            >
                <XMarkIcon />
            </button>
            <input 
            type="range" 
            className={styles.picker}
            min="0"
            max="360"
            aria-label="Change color theme slider"
            value={hue}
            onInput={(e) => setHue(e.target.value)}
            />
            </>
        )
        :
        (
            <div className={styles.btns}>
                <button
                className="btn"
                aria-label={`Change theme to ${theme === 'light' ? 'dark' : 'light'} mode`}
                role="switch"
                onClick={() =>
                    setTheme(theme === 'light' ? 'dark' : 'light')}
                >
                {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
                </button>
                <button 
                className="btn"
                aria-label="Enable color picking mode"
                onClick={() => setIsColorPicking(true)}
                >
                    <SwatchIcon />
                </button>

            </div>
        )
    }

   </aside>
  )
}

export default ThemeSwitcher