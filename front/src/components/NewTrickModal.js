import "../styles/NewTrickModal.css";
import { useState, useEffect } from "react";
import Trick from "../models/Trick";
import Platform from "../models/Platform";
import Settings from "../settings.js";
import toast from "react-hot-toast";
import { showErrorToast } from "../utils/Toasting";
import { useDispatch, useSelector } from "react-redux";
import { set, push } from "../stores/reducers/tricklistReducer";
import { postToApi } from "../utils/APICall";
import React from "react";
import { getUserIDFromCookie } from "../utils/Cookie";
const axios = require("axios").default;
var dispatcher = undefined;

function NewTrickModal() {
    const [modalOpened, changeOpenModal] = useState(false);
    // const [newForm, changeNewForm] = useState(true); // true : trick | false: module/platform
    const [platformList, changePlatformList] = useState([]);

    let modalClass = "modal add-trick-modal";

    if (modalOpened) {
        modalClass += " is-active";
    }

    const trickList = useSelector((state) => state.trickList.trickList);
    const tlDispatcher = useDispatch();
    dispatcher = useDispatch();
    // console.log(tlDispatcher);
    // FIRST RENDER ONLY
    useEffect(() => {
        changePlatformList([]);
    }, []);

    let c = (
        <div className="new-trick-modal-container">
            <div
                className="new-button"
                onClick={() => openModal(changeOpenModal, !modalOpened)}
            >
                <span>+</span>
            </div>
            <div className={modalClass}>
                <div className="modal-background"></div>
                <div className="modal-content">
                    <article className="message is-primary">
                        <div className="message-header">
                            <p>Add a new trick...</p>
                            <button
                                className="delete"
                                aria-label="delete"
                                onClick={() =>
                                    openModal(changeOpenModal, !modalOpened)
                                }
                            ></button>
                        </div>
                        <div className="message-body">
                            <div className="new-modal-body">
                                {displayNewTrickForm(
                                    platformList,
                                    changePlatformList,
                                    trickList,
                                    { tlDispatcher }
                                )}
                            </div>
                        </div>
                    </article>
                </div>
                <button
                    className="modal-close is-large"
                    aria-label="close"
                ></button>
            </div>
        </div>
    );

    return c;
}
function openModal(updater, v) {
    // Fixes bug where todomode tabs are not grayed on modal displaying
    let tabsZ = v ? 0 : 1;
    document.getElementById("tabs-todomode").style.zIndex = tabsZ;
    updater(v);
}

function changeForm(updater, v) {
    // console.log('form changed : ' + v ? 'trick' : 'platform')
    updater(v);
}

/**
 * Displays the form to add a new trick, fetches platformList if it is empty
 * @param {*} platformList platformList state
 * @param {*} plistSetter platformList state modifier
 * @returns html
 */
function displayNewTrickForm(platformList, plistSetter, tl, tlDispatcher) {
    if (platformList.length == 0) {
        fetchPlatformList(plistSetter);
    }

    let c = (
        <form
            className="columns new-trick-form"
            method="POST"
            onSubmit={(e) => addNewTrick(e, tl, tlDispatcher)}
        >
            <input
                className="input is-info is-rounded is-full column"
                type="text"
                name="name"
                placeholder="Trick name..."
            ></input>

            <div className="select is-rounded is-full">
                <select name="platform">
                    {platformList.map((p) => (
                        <option key={p.name} value={p._id}>
                            {p.name}
                        </option>
                    ))}
                </select>
            </div>

            <input
                type="submit"
                className="button is-success is-rounded"
                value="Ajouter"
                // onClick={() => updateTL(tlUpdated, tlUpdatedSetter)}
            ></input>
        </form>
    );

    return c;
}

/**
 * Fetches platform list in BD to state platformList
 * @param {function} plistSetter : Setter of platformList state
 */
function fetchPlatformList(plistSetter) {
    // Get all platforms to display in list
    let plist = [];
    axios
        .get(Settings.getApiUrl("/platforms/"))
        .then(function (res) {
            let data = res.data;
            plistSetter(data);
        })
        .catch(function (err) {
            plist = [{ name: "⚠ Error fetching data ⚠" }];
            plistSetter(plist);
        });
}

/**
 * @deprecated
 * Displays the form to create a new platform
 * @returns html
 */
function displayNewPlatformForm() {
    let c = (
        <form className="columns new-trick-form" method="POST">
            <input
                className="input is-info is-rounded is-full column"
                type="text"
                placeholder="Module name..."
            ></input>
            <input
                type="submit"
                className="button is-success is-rounded"
                value="Ajouter"
            ></input>
        </form>
    );

    return c;
}

function updateTL(tlUpdated, tlUpdatedSetter) {
    console.log("TL UPDATED");
    tlUpdatedSetter({ tlUpdated: !tlUpdated });
}
/**
 * Send post request to backend, in order to add the trick to DB
 * @param {*} e Form submit event
 */
function addNewTrick(e, tl) {
    e.preventDefault();

    // console.log(tl);
    // console.log(tlDispatcher);

    let formData = new FormData(e.target);
    let select = e.target.getElementsByTagName("select")[0];
    let platformName = select[select.selectedIndex].text;
    let name = formData.get("name");
    let platform_id = formData.get("platform");

    // Check if tricks does not exists (same name, platform)

    let exists = tl.find(
        (t) => t.name === name && t.platform._id === platform_id
    );
    // console.log(t);
    if (!exists) {
        // Send data to API
        let data = {
            params: {
                user_id: getUserIDFromCookie(), // TODO STUB
                platform: {
                    _id: platform_id,
                    name: platformName,
                },

                // platform_name:
                name: name,
                xp: 10,
            },
        };
        postToApi(Settings.getApiUrl("/tricks/"), data)
            .then(function (res) {
                toast.success("Trick added !");

                // Add new trick to tricklist, to refresh
                // let newTL = [...tl];
                // newTL.push(res.data);
                // dispatcher(set(newTL));
                dispatcher(push(res.data));
            })
            .catch(function (err) {
                // console.log("Failed to create a trick");

                showErrorToast("Failed to add trick : ", err);
                // console.log(err);
            });
    } else {
        // ERROR
        let text = exists.done
            ? "You've done this trick already !"
            : "You already have to do this trick !";
        showErrorToast(text);
    }
}
export default NewTrickModal;
