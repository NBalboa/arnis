function setMaxNumber(input, max) {
    if (!isNaN(input) && input >= 0 && input <= max) {
        return input;
    } else if (isNaN(input)) {
        return "Input must be a number";
    } else {
        return `Input must between 0 and ${max}`;
    }
}

export default setMaxNumber;
