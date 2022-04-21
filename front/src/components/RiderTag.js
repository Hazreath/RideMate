import '../styles/RiderTag.css'
import profile_stub from '../assets/imgs/profile.jpg'
import React from 'react'
function RiderTag() {
    let c = 
    <React.Fragment>
        <div className='rider-tag'>
            <img src={profile_stub} alt='profile pic' className='profile-pic'></img>
            <div className='rider-infos'>
                <p className='name'>BenjiLeS</p>
                <div className='level-xp'>
                    <p className='level'>Lv. 4</p>
                    
                    <progress className='progress is-success progress-bar' max='60' value='24'></progress>
                    <p className='xp'>XP : 24/60</p>
                </div>
            </div>
            <div className='actions'>
                <button className='profile button is-primary is-small'>Profil</button>
                <button className='logout button is-warning is-small'>Déconnexion</button>
            </div>
        </div>
        
    </React.Fragment>
    
    return c
}

export default RiderTag