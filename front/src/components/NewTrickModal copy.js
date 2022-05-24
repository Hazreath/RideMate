import React from "react";
import Settings from "../settings.js";
import "../styles/NewTrickModal.css";
import { getFromApi } from "../utils/APICall";

class NewTrickModal extends React.Component {
    constructor(props) {
        super(props);
        console.log(props);
        this.state = {
            modalOpened: false,
            platformList: [],
        };

        // State setters
        this.changeModalOpened = (v) => {
            this.setState({ modalOpened: v });
        };
        this.changePlatformList = (v) => {
            this.setState({ platformList: v });
        };
        // Misc.
        this.modalClass = "modal add-trick-modal";
    }

    render() {
        // Handle modal opening
        if (this.state.modalOpened) {
            this.modalClass += " is-active";
        } else {
            this.modalClass = "modal add-trick-modal";
        }

        return (
            <div className="new-trick-modal-container">
                <div
                    className="new-button"
                    onClick={() => this.changeModalOpened(true)}
                >
                    ➕
                </div>
                <div className={this.modalClass}>
                    <div className="modal-background"></div>
                    <div className="modal-content">
                        <article className="message is-primary">
                            <div className="message-header">
                                <p>Add a new trick...</p>
                                <button
                                    className="delete"
                                    aria-label="delete"
                                    onClick={() =>
                                        this.changeModalOpened(false)
                                    }
                                ></button>
                            </div>
                            <div className="message-body">
                                <div className="new-modal-body">
                                    {displayNewTrickForm(
                                        this.state.platformList,
                                        this.changePlatformList
                                        // tlUpdated,
                                        // tlUpdatedSetter
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
    }
}

function displayNewTrickForm(platformList, changePlatformList) {
    if (platformList.length == 0) {
        fetchPlatformList(changePlatformList);
    }

    console.log(platformList);
    let c = (
        <form
            className="columns new-trick-form"
            method="POST"
            // onSubmit={(e) =>
            //     addNewTrick(e, plistSetter, tlUpdated, tlUpdatedSetter)
            // }
        >
            <input
                className="input is-info is-rounded is-full column"
                type="text"
                name="name"
                placeholder="Trick name..."
            ></input>

            <div className="select is-rounded is-full">
                <select name="platform">
                    {/* {platformList.map((p) => (
                        <option key={p.name} value={p._id}>
                            {p.name}
                        </option>
                    ))} */}
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
    getFromApi
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
export default NewTrickModal;
