import "../styles/ParkList.css";
import Trick from "../models/Trick";
import React, { useState, useEffect, useCallback, useRef } from "react";
import Settings from "../settings";
import toast from "react-hot-toast";
import { showErrorToast } from "../utils/Toasting";
import { useDispatch, useSelector } from "react-redux";
import { set, check, remove } from "../stores/reducers/tricklistReducer";
import {
    getFromApi,
    postToApi,
    patchToApi,
    deleteToApi,
} from "../utils/APICall";
import { getTokenFromCookie, getUserIDFromCookie } from "../utils/Cookie";
import NewTrickModal from "../components/NewTrickModal";
import { GenericModal, MODAL_TYPES } from "./GenericModal";
import { generateModalId } from "../utils/Random";

/**
 * Shows ParkList, containing standard tricklist
 * @returns JSX content
 */
function ParkList() {
    // Retrieving tricklist from store
    const trickList = useSelector((state) => state.trickList.trickList);
    const [genericModalState, changeGenericModalState] = useState({});
    const tlDispatcher = useDispatch();

    // Show undone tricks, or done ones
    const [todoMode, changeTodoMode] = useState(true);

    // First render only
    useEffect(() => {
        fetchTrickList(tlDispatcher);
    }, []);

    var c = (
        <div className="parklist-root">
            <form className="parklist" method="POST">
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
                    {displayTrickList(
                        trickList,
                        todoMode,
                        tlDispatcher,
                        changeGenericModalState
                    )}
                </div>
            </form>
            <NewTrickModal></NewTrickModal>
            <GenericModal
                state={genericModalState}
                stateSetter={changeGenericModalState}
            ></GenericModal>
        </div>
    );

    return c;
}

/**
 * Returns a modified version of arg array, containing only unique values
 * DOES NOT ALTER ORIGINAL array IN ANY WAY
 * Made to be supplied in a JS filter method,
 * (ex : array.filter(uniquifier))
 * @param {*} v current value (functionnal)
 * @param {*} i current index (functionnal)
 * @param {*} array array to
 * @returns modified array (copy of original) containing only unique values
 */
function uniquifier(v, i, array) {
    return array.indexOf(v) === i;
}

/**
 * @deprecated for test purposes only
 * @param {*} tricklist
 */
function debugTrickList(tricklist) {
    let filtered = tricklist.map((t) => t.name);
    console.log(filtered);
}

/**
 * Displays tricklist in parklist
 * @param {*} trickList Tricklist content from store
 * @param {*} todoMode Show tricks todo or done ones
 * @param {*} tlDispatcher Dispatcher to store
 * @param {*} changeGenericModalState Delete confirmation modal open state setter
 * @returns JSX content
 */
function displayTrickList(
    trickList,
    todoMode,
    tlDispatcher,
    changeGenericModalState
) {
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
                                        <input
                                            type="button"
                                            className="button is-danger delete-button"
                                            value="x"
                                            onClick={(e) => {
                                                // deleteTrick(e);
                                                showDeleteModal(
                                                    e,
                                                    changeGenericModalState,
                                                    tlDispatcher
                                                );
                                            }}
                                        />
                                        <input
                                            type="hidden"
                                            value={t._id}
                                        ></input>
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
 * Change generic modal state at root of ParkList, which triggers its refresh
 * @param {*} e JS Click event on 'X' button
 * @param {*} changeGenericModalState delete modal state changer
 * @param {*} tlDispatcher tricklist dispatcher to store
 */
function showDeleteModal(e, changeGenericModalState, tlDispatcher) {
    let modalBody = (
        <div>
            <h2 style={{ textAlign: "center" }}>
                Are you sure you want to delete that trick ?
            </h2>
            <div
                className="yes-no-buttons"
                style={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "space-evenly",
                }}
            >
                <button
                    className="button is-success yes-button"
                    value=""
                    onClick={() => deleteTrick(e, tlDispatcher)}
                >
                    {/* Yes */}
                    <a className="yesButton">Yes</a>
                </button>
                <button className="button is-danger noButton">No</button>
            </div>
        </div>
    );
    let modalOptions = {
        modal_id: generateModalId(),
        title: "Delete trick ?",
        modal_color_class: "is-warning",
        body: modalBody,
        buttonActions: {
            noButton: "#closeModal",
            yesButton: "#closeModal",
        },
    };

    changeGenericModalState(modalOptions);
}
/**
 * Remove trick from tricklist
 * Sends PATCH (not delete, see comment below) to server, remove trick in DB
 * Also updates tricklist in store, which refreshes page
 * @param {*} e JS event of click on 'X' button (contains trick id)
 * @param {*} tlDispatcher tricklist dispatcher to store
 */
function deleteTrick(e, tlDispatcher) {
    // console.log("DELETE");
    let t_id = e.target.nextSibling.value;

    let data = {
        params: {
            _id: t_id,
        },
    };

    // TODO VALIDATION MODAL
    patchToApi(Settings.getApiUrl("/tricks/delete"), data)
        .then((res) => {
            toast.success("Trick deleted .. 😥");
            // Close modal and refresh tl
            // changeGenericModalState({});
            // TODO refresh

            tlDispatcher(remove(t_id));
        })
        .catch((err) => {
            showErrorToast("Error when checking trick : ", err);
        });
}

/**
 * Change trick done state to true
 * Sends PATCH to server, change done attribute trick in DB
 * Also updates tricklist in store, which refreshes page
 * @param {*} e JS event of click on checkbox button (contains trick id)
 * @param {*} tlDispatcher tricklist dispatcher to store
 */
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

/**
 * @deprecated
 * Compare method for trick
 * @param {*} a
 * @param {*} b
 * @returns
 */
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
