import "../styles/Banner.module.css";
import logo from "../assets/imgs/logo.png";
import RiderTag from "./RiderTag";
import Menu from "./Menu";

/**
 * ============= BANNER.JS ===============
 * Website 'memberzone' banner, containing menu, app logo and RiderTag of current user
 * (RiderTag in Banner, or in Menu for mobiles)
 */

function Banner() {
    let c = (
        <header className={"banner-header"}>
            <div className="columns banner-container">
                <Menu></Menu>

                {/* <h1 class='column'>Tricks</h1> */}
                <img className="logo" src={logo}></img>

                <div className="banner-rider-tag-container">
                    <RiderTag></RiderTag>
                </div>
            </div>
        </header>
    );

    return c;
}

export default Banner;
