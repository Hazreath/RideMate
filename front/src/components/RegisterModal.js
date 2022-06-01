import "../styles/RegisterModal.css";
import { useEffect, useState } from "react";
import Settings from "../settings";
import toast from "react-hot-toast";
import { showErrorToast } from "../utils/Toasting";
import { postToApi } from "../utils/APICall";
import { AESEncrypt } from "../utils/Encryption";
const axios = require("axios").default;

/**
 * Shows register modal
 * @param {*} param0 register modal open state, and its setter
 * @returns JSX content
 */
function RegisterModal({ openState, openStateChanger }) {
    let display = openState ? "flex" : "none";
    let c = (
        <div
            className="modal register-modal-container"
            style={{ display: display }}
        >
            <div className="modal-background"></div>
            <div className="modal-content">
                <article className="message is-primary">
                    <div className="message-header">
                        <p>Register</p>
                        <button
                            className="delete"
                            aria-label="delete"
                            onClick={() => openStateChanger(!openState)}
                        ></button>
                        {/* onClick={() => openModal(changeOpenModal,!modalOpened)} */}
                    </div>
                    <div className="message-body">
                        <div className="register-modal-body">
                            {displayRegisterForm()}
                        </div>
                    </div>
                </article>
            </div>
            <button
                className="modal-close is-large"
                aria-label="close"
                onClick={() => openStateChanger(!openState)}
            ></button>
        </div>
    );

    return c;
}

/**
 * Displays register form in register modal
 * Verifies (FRONT) form completion, minimum size of password, email format, and password === password confirm
 * @returns JSX Content
 */
function displayRegisterForm() {
    return (
        <form
            className="columns register-form"
            method="POST"
            onSubmit={register}
        >
            <input
                className="input is-info is-rounded is-full column"
                type="text"
                name="username"
                placeholder="Username"
                required
            ></input>
            <input
                className="input is-info is-rounded is-full column"
                type="Email"
                name="email"
                placeholder="Email"
                required
            ></input>
            <input
                className="input is-info is-rounded is-full is-danger column"
                type="password"
                name="password"
                placeholder="Password"
                minLength={8}
                required
            ></input>
            <input
                className="input is-info is-rounded is-full column"
                type="password"
                placeholder="Confirm password"
                minLength={8}
                required
            ></input>

            <input
                type="submit"
                className="button is-success is-rounded"
                value={"Register"}
            ></input>
        </form>
    );
}

/**
 * Registers new user
 * Send Post to server with new user infos
 * @param {*} e JS Form submit event
 */
function register(e) {
    e.preventDefault();

    let formData = new FormData(e.target);

    let encryptedPass = AESEncrypt(formData.get("password"));
    postToApi(Settings.getApiUrl("/users/register/"), {
        params: {
            username: formData.get("username"),
            password: encryptedPass,
            email: formData.get("email"),
        },
    })
        .then(function (res) {
            toast.success("Registered successfully !");
        })
        .catch(function (err) {
            showErrorToast("Register failed : ", err);
        });
}
export default RegisterModal;
