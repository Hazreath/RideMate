import "../styles/Login.css";
import logo from "../assets/imgs/logo.png";
import background_video from "../assets/videos/ransley.mp4";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Settings from "../settings";
import RegisterModal from "../components/RegisterModal";
import toast from "react-hot-toast";
import { showErrorToast } from "../utils/Toasting";
const axios = require("axios").default;
var bullshit = {};

function Login() {
    const navigate = useNavigate();
    const [openRegisterModal, changeOpenRegisterModal] = useState(false);
    bullshit = changeOpenRegisterModal;
    // this.changeOpenRegisterModal = this.changeOpenRegisterModal.bind(this)
    // this.changeOpenRegisterModal = changeOpenRegisterModal.bind(this)
    let c = (
        <div className="login-page">
            {/* <div className='login-background'></div> */}
            <video autoPlay muted loop className="login-background">
                <source
                    src={background_video + "#t=23"}
                    type="video/mp4"
                ></source>
            </video>
            <div className="login-page">
                <img className="logo" src={logo} />

                <article className="message login-frame">
                    <div className="message-header">
                        <p>Login</p>
                        {/* <button class="delete" aria-label="delete"></button> */}
                    </div>
                    <div className="message-body">
                        {displayLoginForm(
                            navigate,
                            openRegisterModal,
                            changeOpenRegisterModal
                        )}
                    </div>
                </article>
            </div>
        </div>
    );

    return c;
}

/**
 * Displays login from
 * @param {*} navigate to redirect to tricklist after successful login
 * @param {*} openRegisterModal register modal status
 * @param {*} changeOpenRegisterModal register modal status changer
 * @returns HTML content
 */
function displayLoginForm(
    navigate,
    openRegisterModal,
    changeOpenRegisterModal
) {
    // TODO remove autofilled credentials
    // console.log(openRegisterModal)
    // console.log(changeOpenRegisterModal)
    // this.changeOpenRegisterModal.bind(this)

    return (
        <div className="login-form-container">
            <form
                className="login-form"
                method="POST"
                onSubmit={(e) => login(e, navigate)}
            >
                <input
                    type="text"
                    className="input is-rounded"
                    placeholder="Login"
                    name="username"
                />
                <input
                    type="password"
                    className="input is-rounded"
                    placeholder="Password"
                    name="password"
                />
                <input
                    type="submit"
                    className="button is-rounded is-success"
                    value={"Login"}
                />
                <a
                    href="#"
                    className="register"
                    onClick={() => changeOpenRegisterModal(!openRegisterModal)}
                >
                    👉Register👈
                </a>
                {/* onClick={changeOpenRegisterModal(true)} */}
                {/* <Link to="/tricklist">tricklist</Link> */}
            </form>
            {openRegisterModal && (
                <RegisterModal
                    openState={openRegisterModal}
                    openStateChanger={changeOpenRegisterModal}
                ></RegisterModal>
            )}
            {/* openRegisterModal */}
        </div>
    );
}

// export function changeOpenRegisterModalState(v) {
//     bullshit(v)
// }
/**
 * Sends login infos to backend and proceed with authentication if credentials are corrects
 * @param {*} e Event from form submit
 * @param {*} navigate navigate object to redirect to tricklist after login
 */
function login(e, navigate) {
    e.preventDefault();

    let formData = new FormData(e.target);
    let username = formData.get("username");
    let password = formData.get("password");
    console.log("Logging in with: " + username + "/" + password);
    axios
        .post(Settings.getApiUrl("/users/login"), {
            params: {
                username: username,
                password: password,
            },
        })
        .then(function (res) {
            // Redirect to Tricklist
            navigate("/tricklist");
        })
        .catch(function (err) {
            showErrorToast("Login failed : ", err);
        });
}

export default Login;
