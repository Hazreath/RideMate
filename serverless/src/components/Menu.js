import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import burger_menu from "../assets/imgs/menu.png";
import "../styles/Menu.css";
import RiderTag from "./RiderTag";

/**
 * Menu available states
 */
const MENU_STATES = {
    opened: "menu-opened",
    closed: "menu-closed",
    firstInit: "first-initialization", // prevent menu from showing on page refresh
};

// False if first page init
var hasBeenClicked = false;
/**
 * Shows navigation menu on right
 * @returns JSX content
 */
function Menu() {
    const [menuOpened, setMenuOpened] = useState(false);
    // Handles menu css class, for css animations purposes
    const [menuClass, setMenuClass] = useState(MENU_STATES.firstInit);

    useEffect(() => {
        // Prevent menu for showing if it has not been clicked on (first init)
        if (hasBeenClicked) {
            let c = menuOpened ? MENU_STATES.opened : MENU_STATES.closed;
            setMenuClass(c);
        }
    }, [menuOpened]);
    // let menuClass = menuOpened ? MENU_STATES.opened : MENU_STATES.closed;
    let c = (
        <div className="menu-container">
            <a
                type="checkbox"
                id="open-menu"
                className="column is-narrow burger-menu "
                onClick={() => menuOpen(setMenuOpened, !menuOpened)}
            >
                <img src={burger_menu} />
            </a>
            {/* TODO Animation de fermeture */}
            {displayMenu(menuClass, menuOpened)}
        </div>
    );

    return c;
}

/**
 * Opens menu : modifies opened state
 * @param {*} updater menu opened state setter
 * @param {*} v value to affect to opened state
 */
function menuOpen(updater, v) {
    hasBeenClicked = true;
    updater(v);
}

/**
 * Show inner menu content
 * @param {*} menuClass CSS Class to affect to .menu division
 * @param {*} menuOpened Menu opened state
 * @returns JSX content
 */
function displayMenu(menuClass, menuOpened) {
    // console.log("Display menu : " + menuClass);
    let c = (
        <aside id="menu" className={"menu " + menuClass}>
            <div className="menu-rider-tag-container">
                <RiderTag></RiderTag>
            </div>

            <div className="menu-options">
                <p className="menu-label">General</p>
                <ul className="menu-list">
                    {/* <li key="1">
                    <Link>
                        <a>🏠 Home</a>
                    </Link>
                </li> */}
                    <li key="1">
                        <Link
                            to="/tricklist"
                            className={isOnTricklist() ? "is-active" : ""}
                        >
                            🛴 TrickList
                        </Link>
                    </li>
                    <li key="2">
                        <a className="disabled">🗣 Forum</a>
                    </li>
                    <li key="3">
                        <a className="disabled">🏆 Clash</a>
                    </li>
                </ul>
                <p className="menu-label">Support</p>
                <ul className="menu-list">
                    <li key="01">
                        <a className="disabled">🐛 Report a bug</a>
                    </li>
                    <li key="02">
                        <a className="disabled">🤑 Gimme your money !</a>
                    </li>
                </ul>
            </div>
        </aside>
    );
    return c;
}

/**
 * Returns true if current user is browsing tricklist page
 * @returns true if user is on tricklist page, false otherwise
 */
function isOnTricklist() {
    return window.location.pathname === "/tricklist";
}
export default Menu;
