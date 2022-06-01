import React from "react";
import "../styles/Profile.css";
import Banner from "../components/Banner";
import { useState } from "react";
import { useSelector } from "react-redux";
import { getFromApi, postFileToApi, postToApi } from "../utils/APICall";
import Settings from "../settings";
import { showErrorToast } from "../utils/Toasting";
import toast from "react-hot-toast";
import { patchToApi } from "../utils/APICall";
import { getUserIDFromCookie } from "../utils/Cookie";
import axios from "axios";

/**
 * Profile page available mods
 * Currently only modify is available
 */
const AVAILABLE_MODS = {
    profile: 0,
    modify: 1,
};
const FILENAME_EMPTY = "Empty";

/**
 * Shows profile page, depending on selected mode
 * @returns JSX Content
 */
function Profile() {
    const [selectedMode, changeSelectedMode] = useState(1);
    const [uploadedFilename, changeUploadedFilename] = useState(FILENAME_EMPTY);
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

    let c = (
        <div className="profile-container">
            {contentDisplayed(uploadedFilename, changeUploadedFilename)}
        </div>
    );

    return (
        <React.Fragment>
            <Banner />
            {c}
        </React.Fragment>
    );
}

/**
 * Display modify profile interface, in which you can change your avatar and password
 * @param {String, state} filename
 * @param {State setter} filenameSetter
 * @returns HTML
 */
function displayModifyProfile(filename, filenameSetter) {
    return (
        <div className="modify-profile-container">
            <h2 className="subtitle is-3">Modify profile</h2>
            <form
                className="form-password"
                // enctype="multipart/form-data"
                onSubmit={(e) => modifyProfile(e)}
            >
                <h3 className="subtitle is-4">Change avatar</h3>
                <div className="file has-name avatar-file-input">
                    <label className="file-label">
                        <input
                            className="file-input"
                            type="file"
                            id="avatar-input"
                            name="avatar"
                            onChange={({ target }) => {
                                // console.log(target.files[0].name);
                                filenameSetter("🖼 " + target.files[0].name);
                                // filename = target.files[0].name;
                            }}
                        />

                        <span className="file-name">{filename}</span>
                        <span className="file-cta">
                            <span className="file-label">
                                🖼 Upload image...
                            </span>
                        </span>
                    </label>
                    {filename != FILENAME_EMPTY && (
                        <input
                            className="button is-danger is-right"
                            type="button"
                            value="Delete file"
                            onClick={() => {
                                document.getElementById("avatar-input").value =
                                    "";
                                filenameSetter(FILENAME_EMPTY);
                            }}
                        />
                    )}
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

/**
 * TODO
 * Displays Profile dashboard
 * @returns
 */
function displayProfile() {
    // TODO
    return "";
}

/**
 * Modifies profile information
 * - if password supplied, check that pass === passconfirm and sends password change
 * PATCH request to server;
 * - if avatar, send PATCH modifyAvatar to server
 * (if both, do both OFC)
 * @param {*} e JS Form submit event
 */
function modifyProfile(e) {
    e.preventDefault();
    // console.log("MODIFY");
    let avatar = e.target.avatar.files[0];
    let avatarElt = e.target.avatar;
    // console.log(avatar.files);
    let oldPass = e.target.old_password.value;
    let newPass1 = e.target.new_password1.value;
    let newPass2 = e.target.new_password2.value;
    // let oldPass = "azertyuiop";
    // let newPass1 = oldPass;
    // let newPass2 = oldPass;

    // TODO find a better way to show success, or reach axios' thens
    let errorOccured = false;
    let interacted = avatar || (oldPass && newPass1 && newPass2);
    // Modify profile pic, only if supplied
    if (avatar) {
        toast.loading("Changing avatar...", { duration: 3000 });
        postFileToApi(Settings.getApiUrl("/users/modifyProfile/avatar"), {
            avatar,
        })
            .then(function (res) {
                toast.success("Upload OK :)");
            })
            .catch(function (err) {
                errorOccured = true;
                showErrorToast("Error when uploading avatar :", err);
            });
    }

    // Change password only if all required fields are filled
    if (oldPass && newPass1 && newPass2) {
        if (newPass1 === newPass2) {
            // Modify pass only if new pass 1 & 2 are equals
            let dataModify = {
                params: {
                    avatar: avatar,
                    oldPass: oldPass,
                    newPass: newPass1,
                },
            };
            toast.loading("Changing password...", { duration: 3000 });
            patchToApi(Settings.getApiUrl("/users/modifyProfile"), dataModify)
                .then((res) => {
                    console.log(res);
                    toast.success("Profile modified ! 😎");
                })
                .catch((err) => {
                    showErrorToast("Error when modifying profile :", err);
                    errorOccured = true;
                });
            // postToApi(Settings.getApiUrl("/users/confirmPass"), dataPassConfirm)
            //     .then(function (res) {
            //         // Old password OK : modifying profile infos...

            //     })
            //     .catch(function (err) {
            //         showErrorToast(
            //             "❌ Error : old password does not match your current password ! "
            //         );
            //     });
        } else {
            console.log(newPass1);
            console.log(newPass2);
            showErrorToast(
                "❌ New password and new password confirmation do not match :"
            );
        }
    }

    if (!interacted) {
        showErrorToast(
            "You need to supply either a new avatar, or a new password to modify your profile ! 😂"
        );
    }

    setTimeout(function () {
        console.log("TIMEOUT PASSED : error : " + errorOccured);
        if (interacted && !errorOccured) {
            toast.success("Profile modified ! 😎");

            setTimeout(() => window.location.reload(), 1000);
        }
    }, 3000);
}

/**
 * Displays error if a non existent profile mode is selected
 * See AVAILABLE_MODS for availables modes
 * @returns JSX Content
 */
function displayErrorNonExistentMode() {
    return <h2>ERROR : non implemented mode</h2>;
}
export default Profile;
