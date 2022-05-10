import "../styles/RegisterModal.css";
import { useEffect, useState } from "react";
// import {changeOpenRegisterModalState} from '../pages/Login'
function RegisterModal(openState, openStateChanger) {
    console.log("openState: " + openState["openState"]);

    const [modal, changeModal] = useState(true);
    useEffect(() => {
        console.log("MODAL: " + modal);
    }, []);

    let display = openState && modal ? "flex" : "none";
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
                            onClick={() => changeModal(!modal)}
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
            ></button>
        </div>
    );

    return c;
}
function closeModal(state, stateChanger) {
    // console.log(stateChanger)
    // state['stateChanger'](false)
    // state(false)
    // openStateChanger(false)
    // changeOpenRegisterModalState(false)
    stateChanger(!state);
}
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
                name="name"
                placeholder="Nickname"
            ></input>
            <input
                className="input is-info is-rounded is-full column"
                type="Email"
                name="name"
                placeholder="Email"
            ></input>
            <input
                className="input is-info is-rounded is-full column"
                type="password"
                name="name"
                placeholder="Password"
            ></input>
            <input
                className="input is-info is-rounded is-full column"
                type="password"
                name="name"
                placeholder="Retype password"
            ></input>

            <input
                type="submit"
                className="button is-success is-rounded"
            ></input>
        </form>
    );
}

function register(e) {}
export default RegisterModal;
