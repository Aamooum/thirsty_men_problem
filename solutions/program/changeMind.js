function changeMind(guests, nbrGst) {
    const rand = Math.random()
    if (rand > 0.2 && guests[0].type === "good") {
        guests[0].type = 'bad';
        guests[0].mind = Math.random() < 0.5 ? "all" : "share";
    } else if (rand > 0.8 && guests[0].type === "bad" ) {
        guests[0].type = 'good';
        delete guests[0].mind;
    }

    if (rand > 0.2 && guests[nbrGst - 1].type === "good") {
        guests[nbrGst - 1].type = 'bad';
        guests[nbrGst - 1].mind = Math.random() < 0.5 ? "all" : "share";
    } else if (rand > 0.8 && guests[nbrGst - 1].type === "bad") {
        guests[nbrGst - 1].type = 'good';
        delete guests[nbrGst - 1].mind;
    }
}

module.exports = changeMind ;