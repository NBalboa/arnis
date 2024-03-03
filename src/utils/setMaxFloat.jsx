function setMaxFloat(input, max) {
    if (!isNaN(input) && input >= 1 && input <= max) {
        return input;
    } else if (isNaN(input)) {
        return "Input must be a number";
    } else {
        return `Input must between 1 and ${max}`;
    }
}

export default setMaxFloat;
