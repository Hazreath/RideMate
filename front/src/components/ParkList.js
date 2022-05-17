import "../styles/ParkList.css";
import Trick from "../models/Trick";
import React, { useState, useEffect } from "react";
import Settings from "../settings";
import toast from "react-hot-toast";
import { showErrorToast } from "../utils/Toasting";
// STUB
var tricks = [
    new Trick("Bar to Finger", "Bowl"),
    new Trick("540", "Bowl"),
    new Trick("540", "Fly"),
    new Trick("Icepick", "Bowl"),
    new Trick("Quad", "Fly"),
];

const axios = require("axios").default;
var currentUserId = "6267cf41eafdff68f78ba148"; // TODOOOO

function ParkList() {
    // let platforms = trickList.map(t => t.platform).filter(uniquifier)
    const [trickList, changeTrickList] = useState([]);
    const [tlUpdated, changeTLUpdated] = useState(false);
    console.log("Rendered !");

    // FIRST RENDER ONLY
    useEffect(() => {
        if (trickList.length === 0) {
            fetchTrickList(changeTrickList);
        }
    }, []);

    var c = (
        <form className="parklist" method="POST">
            <div className="tabs is-centered is-boxed is-fullwidth is-medium">
                <ul>
                    <li className="is-active">
                        <a className="subtitle is-3">Park</a>
                    </li>
                    <li>
                        <a className="subtitle is-3">Street</a>
                    </li>
                </ul>
            </div>
            <div className="parklist-container">
                {/* {platforms.map(p => displayTricksWithPlatform(trickList,p))} */}
                {trickList.length > 0 && displayTrickList(trickList)}
            </div>
        </form>
    );

    return c;
}

function uniquifier(v, i, array) {
    return array.indexOf(v) === i;
}

/**
 * Displays users tricklist
 * @param {*} trickList state containing users tricklist
 * @returns HTML content
 */
function displayTrickList(trickList) {
    let platforms = trickList.map((t) => t.platform.name).filter(uniquifier);
    let c = (
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
        </React.Fragment>
    );

    return c;
}

/**
 * Fetches users tricklist from DB
 * @param {*} tListSetter tricklist state setter
 */
function fetchTrickList(tListSetter) {
    axios
        .get(Settings.getApiUrl("/tricks/") + currentUserId)
        .then(function (res) {
            let tr = res.data;
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
