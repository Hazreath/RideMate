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

import { useSelector, useDispatch } from "react-redux";
import { set } from "../stores/reducers/tokenReducer";
import { setTokenCookie } from "../utils/Cookie";

const axios = require("axios").default;
var bullshit = {};

function Login() {
    const navigate = useNavigate();
    const [openRegisterModal, changeOpenRegisterModal] = useState(false);
    const dispatch = useDispatch();
    bullshit = changeOpenRegisterModal;

    useEffect(() => {
        dispatch(set()); // Delete token on first login visit
    }, []);
    console.log(useSelector((state) => state.token));
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
                            dispatch,
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
 * @param {*} dispatch store dispatcher to affect jwt token on successful login
 * @param {*} openRegisterModal register modal status
 * @param {*} changeOpenRegisterModal register modal status changer
 * @returns HTML content
 */
function displayLoginForm(
    navigate,
    dispatch,
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
                onSubmit={(e) => login(e, navigate, dispatch)}
            >
                <input
                    type="text"
                    className="input is-rounded"
                    placeholder="Login"
                    name="username"
                    value={"Benji"}
                />
                <input
                    type="password"
                    className="input is-rounded"
                    placeholder="Password"
                    name="password"
                    value={"azertyuiop"}
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
function login(e, navigate, dispatch) {
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
            console.log(res.data);

            // Save token to store
            // dispatch(set(res.data.token));
            setTokenCookie(res.data.token);
            // Redirect to Tricklist
            navigate("/tricklist");
        })
        .catch(function (err) {
            showErrorToast("Login failed : ", err);
        });
}

export default Login;
