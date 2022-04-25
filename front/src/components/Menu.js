
import { useState } from 'react'
import burger_menu from '../assets/imgs/menu.png'
import '../styles/Menu.css'
import RiderTag from './RiderTag'


function Menu() {
    const [menuOpened, setMenuOpened] = useState(false)

    let c = 
    <div className='menu-container'>
        <a type='checkbox' id='open-menu' className='column is-narrow burger-menu' onClick={() => menuOpen(setMenuOpened,!menuOpened)}>
            <img src={burger_menu}/>
        </a>
        {/* TODO Animation de fermeture */}
        {menuOpened && displayMenu()}
        
        
    </div>
    
    return c
}

function menuOpen(updater,v) {
    console.log('value:' + v)
    updater(v)
    
}

function displayMenu() {
    let c =
        <aside className='menu'>
            <div className='menu-rider-tag-container'>
                <RiderTag></RiderTag>
            </div>
            
            <p className='menu-label'>General</p>
            <ul className='menu-list'>
                <li key='1'><a>🏠 Home</a></li>
                <li key='2'><a className='is-active'>🛴 TrickList</a></li>
                <li key='3'><a>🗣 Forum</a></li>
                <li key='4'><a>🏆 Clash</a></li>

            </ul>
            <p className='menu-label'>Support</p>
            <ul className='menu-list'>
                <li key='01'><a>🐛 Report a bug</a></li>
                <li key='02'><a>🤑 Gimme your money !</a></li>
            </ul>
            
        </aside>
    

    return c
}
export default Menu