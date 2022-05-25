/**
 * Toasting.js : Util file containing toast-related utility functions
 */

import toast from "react-hot-toast";

/**
 *
 * @param {*} err
 */
export function showErrorToast(prefix, err) {
    // console.log(err.response.data.error);
    if (!err) {
        // No supplied error message -> only prefix
        toast.error(prefix);
    } else if (!err.response) {
        // Code-related error
        toast.error("" + err);
    } else if (err.response.data.error) {
        toast.error(prefix + err.response.data.error);
    } else if (err.response.status === 404) {
        toast.error(prefix + "Server communication error.");
    }
}
