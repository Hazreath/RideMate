import React from "react";
import Banner from "../components/Banner";
function Profile() {
    let c = (
        <div className="profile-container">
            <form className="form-profile-pic">
                <div className="file has-name">
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
            </form>
            <form className="form-password">
                <h3>Change password</h3>
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
            </form>
        </div>
    );

    return (
        <React.Fragment>
            <Banner />
            {c}
        </React.Fragment>
    );
}

export default Profile;
