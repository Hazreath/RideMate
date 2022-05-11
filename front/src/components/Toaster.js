import { useState } from "react";
import "../styles/Toaster.css";

var toastText = "OK";
var toastType = "success";
var lock = false;
var toastElement = undefined;

function Toaster() {
    toastElement = (
        <div className={"notification toast " + toastType}>
            <h2>{toastText}</h2>
        </div>
    );
    let c = <div className="toaster">{toastElement}</div>;

    return c;
}

function displaySuccess(text) {
    lock = true;
    toastText = text;
    toastType = "toast-success";

    // toastElement.
}
export default Toaster;
