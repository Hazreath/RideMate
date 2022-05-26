import React from "react";
import "../styles/Profile.css";
import Banner from "../components/Banner";
import { useState } from "react";
import { useSelector } from "react-redux";

const AVAILABLE_MODS = {
    profile: 0,
    modify: 1,
};
function Profile() {
    const [selectedMode, changeSelectedMode] = useState(1);

    let contentDisplayed;

    // Display HTML content depending on current mode
    switch (selectedMode) {
        case AVAILABLE_MODS.profile:
            contentDisplayed = displayProfile;
            break; // TODO
        case AVAILABLE_MODS.modify:
            contentDisplayed = displayModifyProfile;
            break;
        default:
            contentDisplayed = displayErrorNonExistentMode;
    }

    console.log(selectedMode);
    console.log(contentDisplayed());
    let c = <div className="profile-container">{contentDisplayed()}</div>;

    return (
        <React.Fragment>
            <Banner />
            {c}
        </React.Fragment>
    );
}

function displayModifyProfile() {
    return (
        <div className="modify-profile-container">
            <h2 className="subtitle is-3">Modify profile</h2>
            <form className="form-password">
                <h3 className="subtitle is-4">Change avatar</h3>
                <div className="file has-name avatar-file-input">
                    <label className="file-label">
                        <input
                            className="file-input"
                            type="file"
                            name="profile-pic"
                        />
                        <span className="file-name">Profile picture</span>
                        <span className="file-cta">
                            <span className="file-label">
                                🖼 Upload image...
                            </span>
                        </span>
                    </label>
                </div>
                <h3 className="subtitle is-4">Change password</h3>
                <input
                    className="input"
                    type="password"
                    placeholder="Old password"
                ></input>
                <input
                    className="input"
                    type="password"
                    placeholder="New password"
                ></input>
                <input
                    className="input"
                    type="password"
                    placeholder="Retype new password"
                ></input>
                <input
                    className="button is-success"
                    type="submit"
                    value="Modify profile"
                ></input>
            </form>
        </div>
    );
}

function displayProfile() {
    // TODO
    return "";
}

function displayErrorNonExistentMode() {
    return <h2>ERROR : non implemented mode</h2>;
}
export default Profile;
