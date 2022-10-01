const Log = require("../models/Log");

/**
 * Generic class for logging purposes.
 * Add an entry to DB, splitted by logtype level :
 * FATAL > ERROR > WARNING > INFO
 */
class Logging {
    static Info(message, location, object = null) {
        let log = new Log({
            date: Date.now(),
            message: message,
            location: location,
            gravity: "INFO",
            object: object,
        });

        log.save()
            .then((t) => console.log("Log added"))
            .catch((e) => console.error("Adding log failed", e));
    }

    static Warning(message, location, object = null) {
        let log = new Log({
            date: Date.now(),
            message: message,
            location: location,
            gravity: "INFO",
            object: object,
        });

        log.save()
            .then((t) => console.log("Log added"))
            .catch((e) => console.error("Adding log failed", e));
    }

    static Error(message, location, object = null) {
        let log = new Log({
            date: Date.now(),
            message: message,
            location: location,
            gravity: "ERROR",
            object: object,
        });

        log.save()
            .then((t) => console.log("Log added"))
            .catch((e) => console.error("Adding log failed", e));
    }

    static Fatal(message, location, object = null) {
        let log = new Log({
            date: Date.now(),
            message: message,
            location: location,
            gravity: "FATAL",
            object: object,
        });

        log.save()
            .then((t) => console.log("Log added"))
            .catch((e) => console.error("Adding log failed", e));
    }
}

module.exports = Logging;
