import "../styles/NewTrickModal.css";
import { useState, useEffect, useRef } from "react";
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

/**
 * Currently supported custom button actions
 * - '#closeModal' : closes modal when click on targeted button
 */
const BUTTONS_ACTIONS = {
    closeModal: "#closeModal",
};

export const MODAL_TYPES = {
    Standard: "Standard",
};

/**
 * Generic modal object
 * To use it, render it at root of your page.
 * Its open state changes if currentState.modalId is different from previous one
 * @param {*} state Object containing modal parameters :
 * ```
 * {
 *       modal_id: unique modal id, prevent it from staying open all time (use generateModalId() method please),
 *       title: modal title,
 *       modal_type: modal disposition type (currently unimplemented)
 *       modal_color_class: modal bulma.css theme color (ex: 'is-info','is-warning'),
 *       body: JSX modal body content,
 *       buttonActions: {
 *          // contains custom buttons actions, see BUTTONS_ACTIONS
 *          // Keys are unique class selectors (id does not work :()
 *          // Example below
 *          button-unique-class: '#closeModal' // Will close the modal on button with unique class 'button-unique-class'
 *       },
 *   };
 * ```
 * @param {*} stateSetter Modal state setter
 * @returns Generic modal JSX content
 */
export function GenericModal(state, stateSetter) {
    const [modalOpened, changeOpenModal] = useState(false);
    const [prevModalId, changePrevModalId] = useState(0.0);
    // const tlDispatcher = useDispatch();

    let currentState = state.state;

    // UseRef to access DOM elements after loading in comp
    const messageBodyRef = useRef(null);
    let modalClass = "modal";

    useEffect(() => {
        // console.log("USEEFFECT");

        // console.log(messageBodyRef);
        if (currentState.modal_id && currentState.modal_id != prevModalId) {
            // console.log("CHANGE DETECTED : SHOWING MODAL");
            // console.log(currentState);
            changePrevModalId(currentState.modal_id);
            changeOpenModal(true);
        }
    }, [currentState]);

    // console.log(modalOpened);
    if (modalOpened) {
        modalClass += " is-active";
    }

    var modalType = MODAL_TYPES.Standard;

    // Handling customization
    let modalColorClass = "";
    if (currentState) {
        // Modal color theme
        if (currentState.modal_color_class) {
            modalColorClass = currentState.modal_color_class;
        }
        // Button events
        if (
            currentState.buttonActions &&
            messageBodyRef &&
            messageBodyRef.current.hasChildNodes() // wait for div content to be fetched
            // messageBodyRef.current.childrens
        ) {
            // BUTTON EVENTS REPLACING
            // foreach button ids, select dom element and set click event
            for (let key in currentState.buttonActions) {
                // console.log(key);
                // console.log(messageBodyRef);
                // console.log(messageBodyRef.current);
                let target =
                    messageBodyRef.current.getElementsByClassName(key)[0];

                // let target = messageBodyRef.current.getElementById(key);
                switch (currentState.buttonActions[key]) {
                    case BUTTONS_ACTIONS.closeModal:
                        // console.log("SETTING ACTION FOR " + key);
                        target.onclick = function () {
                            openModal(changeOpenModal, false);
                        };

                        break;
                }
            }
        }
    }

    let c = (
        <div className="generic-modal-container">
            <div className={modalClass}>
                <div className="modal-background"></div>
                <div className="modal-content">
                    {
                        <article className={"message " + modalColorClass}>
                            <div className="message-header is-warning">
                                <p>{currentState.title}</p>
                                <button
                                    className="delete"
                                    aria-label="delete"
                                    onClick={() =>
                                        openModal(changeOpenModal, !modalOpened)
                                    }
                                ></button>
                            </div>
                            <div ref={messageBodyRef} className="message-body">
                                {currentState.body}
                            </div>
                        </article>
                    }
                </div>
                <button
                    className="modal-close is-large"
                    aria-label="close"
                    onClick={() => openModal(changeOpenModal, !modalOpened)}
                ></button>
            </div>
        </div>
    );

    // console.log(c);

    return c;
}

/**
 * Open generic modal
 * Fixes bug where tabs in ParkList where not grayed out
 * @param {*} updater
 * @param {*} v
 */
function openModal(updater, v) {
    // console.log("OPEN MODAL : " + v);
    // Fixes bug where todomode tabs are not grayed on modal displaying
    let tabsZ = v ? 0 : 1;
    document.getElementById("tabs-todomode").style.zIndex = tabsZ;

    updater(v);
}
