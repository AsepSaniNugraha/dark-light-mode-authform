import { useContext } from "react";
import { ThemeContext } from "../context/ThemeProvider";

const ThemeButton = () => {
    const { theme, toggleTheme } = useContext(ThemeContext);

    return (
        <button
            onClick={toggleTheme}
            className="fixed top-4 left-4 w-10 h-10 rounded-lg border border-text-primary text-text-primary">
            {theme === "dark" ? <i className="bi bi-brightness-high-fill"></i> : <i className="bi bi-moon-fill"></i>}
        </button>
    );
};

export default ThemeButton;