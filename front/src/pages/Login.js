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
import PresentationModal from "../components/PresentationModal";
import { useSelector, useDispatch } from "react-redux";
import { set } from "../stores/reducers/tokenReducer";
import { setTokenCookie, setUserIDCookie } from "../utils/Cookie";

const axios = require("axios").default;
var bullshit = {};

const versionMessage = "v0.1 : Proof of concept & TrickList";

function Login() {
    const navigate = useNavigate();
    const [openRegisterModal, changeOpenRegisterModal] = useState(false);
    const [openPresentationModal, changeOpenPresentationModal] =
        useState(false);

    useEffect(() => {
        // Delete token on first login visit
    }, []);
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
                <div className="logo">
                    <img className="img" src={logo} />
                    <div className="logo-subtitle">{versionMessage}</div>
                </div>

                <article className="message login-frame">
                    {/* <div className="message-header">
                        <p>Login</p>
                    </div> */}
                    <div className="message-body">
                        {displayLoginForm(
                            navigate,
                            openRegisterModal,
                            changeOpenRegisterModal,
                            openPresentationModal,
                            changeOpenPresentationModal
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
 * @param {*} dispatch store dispatcher to affect jwt token on successful login
 * @param {*} openRegisterModal register modal status
 * @param {*} changeOpenRegisterModal register modal status changer
 * @returns HTML content
 */
function displayLoginForm(
    navigate,
    openRegisterModal,
    changeOpenRegisterModal,
    openPresentationModal,
    changeOpenPresentationModal
) {
    // TODO remove autofilled credentials
    let debug = {
        username: "Benji",
        password: "azertyuiop",
    };
    let debug2 = {
        username: "hazreath",
        password: "azertyuiop",
    };
    let debugUser = debug2;
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
                    value={debugUser.username}
                    onChange={() => console.log()}
                />
                <input
                    type="password"
                    className="input is-rounded"
                    placeholder="Password"
                    name="password"
                    value={debugUser.password}
                    onChange={() => console.log()}
                />
                <input
                    type="submit"
                    className="button is-rounded is-success"
                    value={"Login"}
                />
                <a
                    href="#"
                    className="register"
                    onClick={(e) => changeOpenRegisterModal(!openRegisterModal)}
                >
                    👉Register👈
                </a>
                <a
                    href="#"
                    className="presentation"
                    onClick={(e) =>
                        changeOpenPresentationModal(!openPresentationModal)
                    }
                >
                    Where am I, What is RideMate ?
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

            {openPresentationModal && (
                <PresentationModal
                    openState={openPresentationModal}
                    openStateChanger={changeOpenPresentationModal}
                ></PresentationModal>
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
    console.log("Logging in with: " + username + "/" + password); // TODO
    axios
        .post(Settings.getApiUrl("/users/login"), {
            params: {
                username: username,
                password: password,
            },
        })
        .then(function (res) {
            // console.log(res.data);

            setTokenCookie(res.data.token);
            setUserIDCookie(res.data.userId);
            // console.log(res.data);

            // Redirect to Tricklist
            navigate("/tricklist");
        })
        .catch(function (err) {
            showErrorToast("Login failed : ", err);
        });
}

export default Login;
