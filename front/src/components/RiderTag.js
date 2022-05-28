import "../styles/RiderTag.css";
import profile_stub from "../assets/imgs/profile.jpg";
import User from "../models/User";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import LoadSpinner from "./LoadSpinner";
import Settings from "../settings.js";
import { getFromApi } from "../utils/APICall";
import { getUserIDFromCookie, getTokenFromCookie } from "../utils/Cookie";
const axios = require("axios").default;

const USERNAME_ERROR = "none";

function RiderTag() {
    const [userInfos, setUserInfos] = useState({});
    //

    useEffect(() => {
        getUserInfos(setUserInfos); // TODO STUB
    }, []);

    let c = (
        <React.Fragment>
            <div className="rider-tag">
                {!userInfos.username
                    ? displaySpinner()
                    : displayRiderTag(userInfos)}
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
    );

    return c;
}

function displayRiderTag(userInfos) {
    let c = (
        <React.Fragment>
            {userInfos.username !== USERNAME_ERROR
                ? displayUserInfos(userInfos)
                : displayError()}

            <div className="actions">
                <Link to="/profile">
                    <button className="profile button is-primary is-small">
                        Profile
                    </button>
                </Link>

                <Link to="/">
                    <button className="logout button is-warning is-small">
                        Logout
                    </button>
                </Link>
            </div>
        </React.Fragment>
    );

    return c;
}
function displaySpinner() {
    return <LoadSpinner />;
}

function displayUserInfos(userInfos) {
    return (
        <React.Fragment>
            <img
                src={Settings.getApiUrl("/users/avatar/" + userInfos.avatar)}
                alt="profile pic"
                className="profile-pic"
                onError={
                    ({ target }) => {
                        target.src = Settings.getApiUrl(
                            "/users/avatar/default.png"
                        );
                    }
                    // (this.src = Settings.getApiUrl("/users/avatar/default.png"))
                }
            ></img>
            <div className="rider-infos">
                <p className="name">{userInfos.username}</p>
                <div className="level-xp">
                    <p className="level">Lv. {userInfos.level}</p>

                    <progress
                        className="progress is-success progress-bar"
                        max={userInfos.xpToNextLv}
                        value={userInfos.xp}
                    ></progress>
                    <p className="xp">
                        XP : {userInfos.xp}/{userInfos.xpToNextLv}
                    </p>
                </div>
            </div>
        </React.Fragment>
    );
}
function displayError() {
    return (
        <React.Fragment>
            <p>Error when loading your data.</p>
        </React.Fragment>
    );
}
function getUserInfos(uinfosSetter) {
    let user = null;
    let userId = getUserIDFromCookie();
    // console.log(id);
    getFromApi(Settings.getApiUrl("/users/") + userId)
        .then(function (res) {
            let data = res.data;
            // console.log(res.data);
            user = new User(data.username, data.level, data.xp);
            user.avatar = res.data.avatar;
            // setTimeout(() => {uinfosSetter(user)}, 3000)
            uinfosSetter(user);
        })
        .catch(function (err) {
            console.log(err);
            user = new User(USERNAME_ERROR, 0, 0);
            uinfosSetter(user);
        });
}
export default RiderTag;
