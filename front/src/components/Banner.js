import '../styles/Banner.css'
import logo from '../assets/imgs/logo.png'
import RiderTag from './RiderTag'
import Menu from './Menu'


/**
 * ============= BANNER.JS ===============
 * Bannière du site, contient le titre, le menu et le RiderTag de l'utilisateur
 * connecté
 */

function Banner() {
    let c = 
        <header>
            <div className='columns banner-container'>
                <Menu></Menu>
                
                {/* <h1 class='column'>Tricks</h1> */}
                <img className='logo' src={logo}></img>
                
                <div className='banner-rider-tag-container'>
                    <RiderTag></RiderTag>
                </div>
                
            </div>
            
            
        </header>

    return c
}

export default Banner