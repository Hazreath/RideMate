import { useState } from "react";
import "../styles/Toaster.css";

var toastText = "OK";
var toastType = "success";
var lock = false;
var toastElement = undefined;

/**
 * Div where toasts will be displayed, for user feedback
 * @returns JSX content
 */
function Toaster() {
    toastElement = (
        <div className={"notification toast " + toastType}>
            <h2>{toastText}</h2>
        </div>
    );
    let c = <div className="toaster">{toastElement}</div>;

    return c;
}

/**
 * @deprecated
 * Displays success toast
 * @param {*} text text to print
 */
function displaySuccess(text) {
    lock = true;
    toastText = text;
    toastType = "toast-success";

    // toastElement.
}
export default Toaster;
