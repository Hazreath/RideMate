import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import burger_menu from "../assets/imgs/menu.png";
import "../styles/Menu.css";
import RiderTag from "./RiderTag";

const MENU_STATES = {
    opened: "menu-opened",
    closed: "menu-closed",
    firstInit: "first-initialization",
};

// False if first page init
var hasBeenClicked = false;
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

function menuOpen(updater, v) {
    hasBeenClicked = true;
    updater(v);
}

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

function isOnTricklist() {
    return window.location.pathname === "/tricklist";
}
export default Menu;
