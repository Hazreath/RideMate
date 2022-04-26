import '../styles/RiderTag.css'
import profile_stub from '../assets/imgs/profile.jpg'
import User from '../models/User'
import React, {useEffect, useState} from 'react'
import { Link } from 'react-router-dom'
import LoadSpinner from './LoadSpinner'

const axios = require('axios').default
const STUB_ID = ''

function RiderTag() {
    const [userInfos, setUserInfos] = useState({})
    console.log("Called")
    // 

    useEffect(() => {
        getUserInfos("6267cf41eafdff68f78ba148", setUserInfos)
    }, [])
    
    let c = 
    <React.Fragment>
        <div className='rider-tag'>
            
            {!userInfos.username ? displaySpinner() : displayRiderTag(userInfos)}
            {/* <img src={profile_stub} alt='profile pic' className='profile-pic'></img>
            <div className='rider-infos'>
                <p className='name'>{userInfos.username}</p>
                <div className='level-xp'>
                    <p className='level'>{'Lv.' + userInfos.level}</p>
                    
                    <progress className='progress is-success progress-bar' max='60' value='24'></progress>
                    <p className='xp'>XP : {userInfos.xp + '/' + userInfos.xpToNextLv}</p>
                </div>
            </div>
            <div className='actions'>
                <button className='profile button is-primary is-small'>Profil</button>
                <Link to='/'>
                    <button className='logout button is-warning is-small'>
                        Déconnexion
                    </button>
                </Link>
            </div> */}
        </div>
        
    </React.Fragment>
    
    return c
}

function displayRiderTag(userInfos) {
    let c = 
    <React.Fragment>
        
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
                <Link to='/'>
                    <button className='logout button is-warning is-small'>
                        Déconnexion
                    </button>
                </Link>
            </div>
        
        
    </React.Fragment>
    
    return c
}
function displaySpinner() {
    return <LoadSpinner />
}
function getUserInfos(id, uinfosSetter) {
    let user = null
    axios.get('http://localhost:3001/api/users/' + id)
    .then(function(res) {
        
        let data = res.data
        
        user = new User(data.username, data.level, data.xp)
         console.log(user.toString())


        setTimeout(() => {uinfosSetter(user)}, 3000)
    })
    .catch(function(err) {
        console.log(err)
        uinfosSetter(null)
    })
    
    
}
export default RiderTag