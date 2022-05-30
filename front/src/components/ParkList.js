import "../styles/ParkList.css";
import Trick from "../models/Trick";
import React, { useState, useEffect, useCallback } from "react";
import Settings from "../settings";
import toast from "react-hot-toast";
import { showErrorToast } from "../utils/Toasting";
import { useDispatch, useSelector } from "react-redux";
import { set, check } from "../stores/reducers/tricklistReducer";
import { getFromApi, postToApi, patchToApi } from "../utils/APICall";
import { getTokenFromCookie, getUserIDFromCookie } from "../utils/Cookie";
import NewTrickModal from "../components/NewTrickModal";

// STUB
var tricks = [
    new Trick("Bar to Finger", "Bowl"),
    new Trick("540", "Bowl"),
    new Trick("540", "Fly"),
    new Trick("Icepick", "Bowl"),
    new Trick("Quad", "Fly"),
];

// const axios = require("axios").default;
// var currentUserId = "628631a1833c4175110820e3"; // TODOOOO

function ParkList() {
    // Retrieving tricklist from store
    const trickList = useSelector((state) => state.trickList.trickList);
    const tlDispatcher = useDispatch();

    // Show undone tricks, or done ones
    const [todoMode, changeTodoMode] = useState(true);

    useEffect(() => {
        fetchTrickList(tlDispatcher);
    }, []);

    var c = (
        <div className="parklist-root">
            <form className="parklist" method="POST">
                {/* <div className="tabs is-centered is-boxed is-fullwidth is-medium">
                    <ul>
                        <li className="is-active">
                            <a className="subtitle is-3">Park</a>
                        </li>
                        <li>
                            <a className="subtitle is-3">Street</a>
                        </li>
                    </ul>
                </div> */}
                <div
                    id="tabs-todomode"
                    className="tabs is-centered is-small tabs-todomode"
                >
                    <ul>
                        <li className={todoMode ? "is-active" : undefined}>
                            <a
                                className="subtitle is-5"
                                onClick={() => changeTodoMode(true)}
                            >
                                🥊 To do
                            </a>
                        </li>
                        <li className={!todoMode ? "is-active" : undefined}>
                            <a
                                className="subtitle is-5"
                                onClick={() => changeTodoMode(false)}
                            >
                                👌 Done
                            </a>
                        </li>
                    </ul>
                </div>
                <div className="parklist-container">
                    {/* {platforms.map(p => displayTricksWithPlatform(trickList,p))} */}
                    {displayTrickList(trickList, todoMode, tlDispatcher)}
                </div>
            </form>
            <NewTrickModal></NewTrickModal>
        </div>
    );

    return c;
}

function uniquifier(v, i, array) {
    return array.indexOf(v) === i;
}

function debugTrickList(tricklist) {
    let filtered = tricklist.map((t) => t.name);
    console.log(filtered);
}
/**
 * Displays users tricklist
 * @param {*} trickList state containing users tricklist
 * @returns HTML content
 */
function displayTrickList(trickList, todoMode, tlDispatcher) {
    let todoTricks = trickList.filter((t) => t.done === !todoMode);
    let platforms = todoTricks.map((t) => t.platform.name).filter(uniquifier);

    let c = "";
    if (todoTricks.length > 0) {
        let theme = todoMode ? "is-info" : "is-success";
        c = (
            <React.Fragment>
                {platforms.map((pname) => (
                    <div
                        key={pname}
                        className={"parklist-platform box message " + theme}
                    >
                        <h3
                            key={pname + "-h3"}
                            className="subtitle is-3 platform-name message-header"
                        >
                            {pname}
                        </h3>
                        <ul key={pname + "-ul"} className="trick-bag">
                            {todoTricks
                                .filter((t) => t.platform.name === pname)
                                .map((t) => (
                                    <li key={t._id}>
                                        <label className="checkbox">
                                            <input
                                                type="checkbox"
                                                className="checkbox"
                                                value={t._id}
                                                onClick={(e) => {
                                                    if (todoMode)
                                                        checkTrick(
                                                            e,
                                                            tlDispatcher
                                                        );
                                                }}
                                                defaultChecked={!todoMode}
                                                disabled={!todoMode}
                                            />
                                            {t.name}
                                        </label>
                                    </li>
                                ))}
                        </ul>
                    </div>
                ))}
                {/* {trickList.length === 0 && <h3>coucou</h3>>} */}
            </React.Fragment>
        );
    } else {
        c = (
            <React.Fragment>
                <div className="message is-warning">
                    <h3 className="message-header">You have no trick !</h3>
                    <div className="message-body">
                        Try adding a trick by clicking the ➕ button in the
                        down-right corner !
                    </div>
                </div>
            </React.Fragment>
        );
    }

    return c;
}

function checkTrick(e, tlDispatcher) {
    // console.log("checkTrick: " + e.target.value);
    var trick_id = e.target.value;
    let data = {
        params: {
            _id: trick_id,
        },
    };
    // console.log(data);
    patchToApi(Settings.getApiUrl("/tricks/check"), data)
        .then((res) => {
            toast.success("Trick done ! GG 👍");
            // TODO refresh
            tlDispatcher(check(trick_id));
        })
        .catch((err) => {
            showErrorToast("Error when checking trick : ", err);
        });
}
/**
 * Fetches users tricklist from DB
 * @param {*} tListSetter tricklist state setter
 */
function fetchTrickList(tlDispatcher) {
    // console.log("FETCHING TL");

    let currentUserId = getUserIDFromCookie();
    // console.log("=========ID: " + currentUserId);
    getFromApi(Settings.getApiUrl("/tricks/") + currentUserId)
        .then(function (res) {
            let tr = res.data;
            tlDispatcher(set(tr));
        })
        .catch(function (err) {
            showErrorToast("Failed to fetch your TrickList : ", err);
        });
}

function compareTrick(a, b) {
    if (a.platform.name > b.platform.name) {
        return 1;
    } else if (a.platform.name == b.platform.name) {
        return 0;
    } else {
        // <
        return -1;
    }
}
export default ParkList;
