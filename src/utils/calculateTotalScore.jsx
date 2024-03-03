function calculateTotalScore(scores) {
    let totalScore = 0;
    for (let key in scores) {
        if (scores.hasOwnProperty(key)) {
            totalScore += parseFloat(scores[key]);
        }
    }
    return totalScore;
}

export default calculateTotalScore;
