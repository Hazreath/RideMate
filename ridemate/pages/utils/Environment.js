const ENV_ARRAY_SEPARATOR = ",";
const KEY_VALUE_SEPARATOR = ":";
function getStrArrayFromEnvVar(envVarValue) {
    return envVarValue.split(ENV_ARRAY_SEPARATOR);
}

function getIntArrayFromEnvVar(envVarValue) {
    let splitted = envVarValue.split(ENV_ARRAY_SEPARATOR);
    let r = [];
    splitted.forEach((e) => {
        r.push(parseInt(e));
    });

    return r;
}

function getObjectFromEnvVar(envVarValue) {
    let splitted = envVarValue.split(ENV_ARRAY_SEPARATOR);
    let o = {};
    splitted.forEach((e) => {
        let keyVal = e.split(KEY_VALUE_SEPARATOR);
        o[keyVal[0]] = keyVal[1];
    });
    return o;
}

module.exports = {
    getIntArrayFromEnvVar,
    getStrArrayFromEnvVar,
    getObjectFromEnvVar,
};
