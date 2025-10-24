function shuffleBadGuest(array) {
    const result = [];
    const badElements = [];

    array.forEach(item => {
        if (item.type === "good") {
            result.push(item);
        } else {
            badElements.push(item);
        }
    });

    badElements.forEach(badElement => {
        const randomPosition = Math.floor(Math.random() * (result.length + 1));
        result.splice(randomPosition, 0, badElement);
    });

    return result;
}

module.exports = shuffleBadGuest ;