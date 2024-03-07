function removeHighestAndLowest(object) {
    let scoresArray = Object.entries(object);

    scoresArray.sort((a, b) => a[1] - b[1]);

    scoresArray[0][1] = 0;
    scoresArray[scoresArray.length - 1][1] = 0;

    let updatedScores = Object.fromEntries(scoresArray);

    return updatedScores;
}

export default removeHighestAndLowest;
