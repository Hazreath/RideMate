require("../utils/Environment");
const {
    getIntArrayFromEnvVar,
    getStrArrayFromEnvVar,
    getObjectFromEnvVar,
} = require("../utils/Environment");
// ============ MAIN ================
testEnv();
// ==================================

// PASSED 👌
function testEnv() {
    let str = "bonjour";
    let intArr = "1,2,3,4,5";
    let strArr = "salut,wesh,salam";
    let object = "tamer:lachov,cheveux:false";

    console.log(getIntArrayFromEnvVar(intArr));

    console.log(getStrArrayFromEnvVar(strArr));
    console.log(getObjectFromEnvVar(object));
}
