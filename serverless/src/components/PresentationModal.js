import "../styles/PresentationModal.css";
import React, { useEffect, useState } from "react";
import Settings from "../settings";
import toast from "react-hot-toast";
import { showErrorToast } from "../utils/Toasting";
import { postToApi } from "../utils/APICall";
const axios = require("axios").default;

/**
 * Shows presentation modal (answer to : What is tricklist ?)
 * @param {} param0 presentation modal openState and setter
 * @returns JSX content
 */
function PresentationModal({ openState, openStateChanger }) {
    let display = openState ? "flex" : "none";
    let c = (
        <div
            className="modal register-modal-container"
            style={{ display: display }}
        >
            <div className="modal-background"></div>
            <div className="modal-content presentation-box-container">
                {/* <article className="message is-primary">
                    <div className="message-header">
                        <p>What is 🛴RideMate ?</p>
                    </div>
                    <div className="message-body">
                        <div className="register-modal-body"></div>
                    </div>
                </article> */}
                <div className="box presentation-box">
                    {displayPresentationSpeech()}
                    <div className="presentation-footer">Made by @hazreath</div>
                </div>
            </div>
            <button
                className="modal-close is-large"
                aria-label="close"
                onClick={() => openStateChanger(!openState)}
            ></button>
        </div>
    );

    return c;
}

/**
 * Displays presentation speech in presentation modal
 * @returns JSX content
 */
function displayPresentationSpeech() {
    return (
        <React.Fragment>
            <div className="presentation-speech">
                <h2 className="subtitle">What's RideMate ? 🤔</h2>
                RideMate is a communautary website, made to unite freestyle
                scooter riders around the world. Weither you are a beginner or
                an expert, you can also use RideMate to track your progression
                and get better at your favorite sport 🛴 <p></p>
                It is still a fresh project, but I'm working everyday on it !{" "}
                <h2 className="subtitle">Available features 😎</h2>
                Right now, RideMate features :
                <ul>
                    <li>
                        📅 <b>TrickList</b>, made to set your objectives and
                        track your progress
                    </li>
                </ul>
                <h2 className="subtitle">Future content 🚀</h2>
                In the future, I'd like to make:
                <ul>
                    <li>
                        🗣 A place where community can share, and discuss (kind
                        of like a forum)
                    </li>
                    <li>
                        🏆 Online Game Of Scoot, with ranking and matchmaking{" "}
                    </li>
                </ul>
            </div>
        </React.Fragment>
    );
}

export default PresentationModal;
