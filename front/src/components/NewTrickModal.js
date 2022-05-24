import "../styles/NewTrickModal.css";
import { useState, useEffect } from "react";
import Trick from "../models/Trick";
import Platform from "../models/Platform";
import Settings from "../settings.js";
import toast from "react-hot-toast";
import { showErrorToast } from "../utils/Toasting";
import { useSelector } from "react-redux";
import { postToApi } from "../utils/APICall";
import React from "react";
const axios = require("axios").default;

function NewTrickModal({ tl, tlSetter }) {
    const [modalOpened, changeOpenModal] = useState(false);
    // const [newForm, changeNewForm] = useState(true); // true : trick | false: module/platform
    const [platformList, changePlatformList] = useState([]);

    let modalClass = "modal add-trick-modal";

    if (modalOpened) {
        modalClass += " is-active";
    }

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
                ➕
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
                                    { tl },
                                    { tlSetter }
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
function displayNewTrickForm(platformList, plistSetter, tl, tlSetter) {
    if (platformList.length == 0) {
        fetchPlatformList(plistSetter);
    }

    let c = (
        <form
            className="columns new-trick-form"
            method="POST"
            onSubmit={(e) => addNewTrick(e, plistSetter, tl, tlSetter)}
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
function addNewTrick(e, tl, tlSetter) {
    e.preventDefault();

    console.log(tl);
    console.log(tlSetter);

    let formData = new FormData(e.target);
    let select = e.target.getElementsByTagName("select")[0];
    let platformName = select[select.selectedIndex].text;

    let data = {
        params: {
            user_id: "628631a1833c4175110820e3", // TODO STUB
            platform: {
                _id: formData.get("platform"),
                name: platformName,
            },

            // platform_name:
            name: formData.get("name"),
            xp: 10,
        },
    };
    postToApi(Settings.getApiUrl("/tricks/"), data).then(function (res) {
        toast.success("Trick added !");
        // Close modal and refresh park list
        console.log(res.data);
        // let newTrick = { ...res.data };
        // Deep copy + add new trick
        let tricklist = { ...tl };
        // tricklist.push(newTrick);
        tlSetter({ tricklist });
        // TODO REACTUALISER LISTE TRICKS
    });
    // .catch(function (err) {
    //     // console.log("Failed to create a trick");

    //     showErrorToast("Failed to add trick : ", err);
    //     // console.log(err);
    // });
}
export default NewTrickModal;
