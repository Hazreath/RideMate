import "../styles/ParkList.css";
import Trick from "../models/Trick";
import React, { useState, useEffect, useCallback } from "react";
import Settings from "../settings";
import toast from "react-hot-toast";
import { showErrorToast } from "../utils/Toasting";
import { useSelector } from "react-redux";
import { getFromApi } from "../utils/APICall";
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
    // let platforms = trickList.map(t => t.platform).filter(uniquifier)
    const [trickList, changeTrickList] = useState([]);
    const [tlUpdated, changeTLUpdated] = useState(false);
    // console.log("Rendered !");

    const changeTrickListWrapper = (v) => {
        changeTrickList(v);
    };

    useEffect(() => {
        //
        if (trickList.length === 0) {
            fetchTrickList(changeTrickList);
        }
    }, []);

    var c = (
        <div className="parklist-root">
            <form className="parklist" method="POST">
                <div className="tabs is-centered is-boxed is-fullwidth is-medium">
                    <ul>
                        <li className="is-active">
                            <a className="subtitle is-3">Park</a>
                        </li>
                        {/* <li>
                            <a className="subtitle is-3">Street</a>
                        </li> */}
                    </ul>
                </div>
                <div className="parklist-container">
                    {/* {platforms.map(p => displayTricksWithPlatform(trickList,p))} */}
                    {displayTrickList(trickList)}
                </div>
            </form>
            <NewTrickModal
                tl={trickList}
                tlSetter={changeTrickList}
            ></NewTrickModal>
        </div>
    );

    return c;
}
function tlHasBeenUpdated() {}
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
function displayTrickList(trickList) {
    let platforms = trickList.map((t) => t.platform.name).filter(uniquifier);

    let c = "";
    if (trickList.length > 0) {
        c = (
            <React.Fragment>
                {platforms.map((pname) => (
                    <div
                        key={pname}
                        className="parklist-platform box message is-info"
                    >
                        <h3
                            key={pname + "-h3"}
                            className="subtitle is-3 platform-name message-header"
                        >
                            {pname}
                        </h3>
                        <ul key={pname + "-ul"} className="trick-bag">
                            {trickList
                                .filter((t) => t.platform.name === pname)
                                .map((t) => (
                                    <li key={pname + " " + t.name}>
                                        <label className="checkbox">
                                            <input
                                                type="checkbox"
                                                className="checkbox"
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

/**
 * Fetches users tricklist from DB
 * @param {*} tListSetter tricklist state setter
 */
function fetchTrickList(tListSetter) {
    // console.log("FETCHING TL");

    let currentUserId = getUserIDFromCookie();
    // console.log("=========ID: " + currentUserId);
    getFromApi(Settings.getApiUrl("/tricks/") + currentUserId)
        .then(function (res) {
            let tr = res.data;
            // debugTrickList(tr);
            // tr = tr.sort(compareTrick)
            tListSetter(tr);
            // renderSetter(0);
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
