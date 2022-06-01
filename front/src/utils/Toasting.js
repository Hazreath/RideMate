/**
 * Toasting.js : Util file containing toast-related utility functions
 */

import toast from "react-hot-toast";

/**
 * Shows error toast in Toaster
 * /!\ Many exceptions and uniques cases : check method body
 * @param {*} err
 */
export function showErrorToast(prefix, err) {
    // console.log(err.response.data.error);
    // console.log(err);
    let toDisplay = "";
    if (!err) {
        // No supplied error message -> only prefix
        toDisplay = prefix;
    } else if (!err.response) {
        // Code-related error
        toDisplay = err;
    } else if (err.response.data.error) {
        toDisplay = prefix + err.response.data.error;
    } else if (err.response) {
        // HTML Format : error in <pre> div
        // let html = document.createElement(err.response.data);
        let parser = new DOMParser();
        let doc = parser.parseFromString(err.response.data, "text/html");
        let error = doc.getElementsByTagName("pre")[0].innerText;
        toDisplay = error.split("at")[0];
    } else if (err.response.status === 404) {
        toDisplay = prefix + "Server communication error.";
    }

    toast.error(toDisplay);
    // console.log("TOAST : " + toDisplay);
}
