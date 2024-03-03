import removeSpacesAndLowerCase from "./removeSpacesAndLowerCase";

function checkDuplicateName(name, contestants) {
    for (const contestantName of contestants) {
        const existingName = removeSpacesAndLowerCase(
            contestantName.contestant
        );
        const newName = removeSpacesAndLowerCase(name);

        if (existingName === newName) {
            return true;
        }
    }
    return false;
}

export default checkDuplicateName;
