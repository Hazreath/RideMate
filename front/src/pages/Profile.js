import React from "react";
import "../styles/Profile.css";
import Banner from "../components/Banner";
import { useState } from "react";
import { useSelector } from "react-redux";
import { getFromApi, postToApi } from "../utils/APICall";
import Settings from "../settings";
import { showErrorToast } from "../utils/Toasting";
import toast from "react-hot-toast";
import { patchToApi } from "../utils/APICall";

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
            <form className="form-password" onSubmit={(e) => modifyProfile(e)}>
                <h3 className="subtitle is-4">Change avatar</h3>
                <div className="file has-name avatar-file-input">
                    <label className="file-label">
                        <input
                            className="file-input"
                            type="file"
                            name="avatar"
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
                    name="old_password"
                ></input>
                <input
                    className="input"
                    type="password"
                    placeholder="New password"
                    name="new_password1"
                ></input>
                <input
                    className="input"
                    type="password"
                    placeholder="Retype new password"
                    name="new_password2"
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

function modifyProfile(e) {
    e.preventDefault();
    console.log("MODIFY");
    let avatar = e.target.avatar.value;
    let oldPass = e.target.old_password.value;
    let newPass1 = e.target.new_password1.value;
    let newPass2 = e.target.new_password2.value;

    if (newPass1 === newPass2) {
        // Verify that old password is correct TODO
        let dataPassConfirm = {
            params: {
                password: newPass1,
            },
        };

        // Modify pass only if new pass 1 & 2 are equals
        postToApi(Settings.getApiUrl("/users/passConfirm"), dataPassConfirm)
            .then(function (res) {
                // Old password OK : modifying profile infos...
                let dataModify = {
                    params: {
                        avatar: avatar,
                        oldPass: oldPass,
                        newPass: newPass1,
                    },
                };
                patchToApi(
                    Settings.getApiUrl("/users/modifyProfile"),
                    dataModify
                )
                    .then(function (res) {
                        toast.success("Profile modified ! 😎");
                    })
                    .catch(function (err) {
                        showErrorToast("Error when modifying profile :", err);
                    });
            })
            .catch(function (err) {
                showErrorToast(
                    "❌ Error : old password does not match your current password ! "
                );
            });
    } else {
        console.log(newPass1);
        console.log(newPass2);
        showErrorToast(
            "❌ New password and new password confirmation does not match :"
        );
    }
}

function displayErrorNonExistentMode() {
    return <h2>ERROR : non implemented mode</h2>;
}
export default Profile;
