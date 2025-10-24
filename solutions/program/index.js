const avg = require('./avg');
const changeMind = require('./changeMind');
const randomInt = require('./randomInt');
const shuffleBadGuest = require('./shuffleBadGuest');


function myfnc(nbrGst, simulationTime, banSys, badSwitch ) {
    const simulationData = []
    let simulationTotalDrink = 0

    for (let i = 0; i < simulationTime; i++) {
        let countGestDrink = 0
        let guests = [];

        for (let j = 1; j <= nbrGst; j++) {
            guests.push({ id: j, type: 'good', drink: 0 });
        }

        let l = 0;
        let r = nbrGst - 1;

        while (l < nbrGst || r >= 0) {
            changeMind(guests, nbrGst);

            if (l < nbrGst) {
                if (banSys && guests[l].banned) {
                    
                    if(badSwitch){
                        for (let i = l ; i < nbrGst ; i++) {
                            if (!guests[i].banned) {
                                guests[i].drink += 1
                                l++;
                                break
                            }
                        } 
                        l++;
                    }else{
                        for (let i = l ; i < nbrGst ; i++) {
                            if (!guests[i].banned) {
                                guests[i].drink += 1
                                l = i ;
                                break
                            }
                        }
                        l++;
                    }
                } else if (guests[l].type === "good") {
                    guests[l].drink += 1;
                    if (guests[l].drink > 1) { 
                        guests[l].banned = true;
                        l++;
                    } else {
                        l++;
                    }
                } else if (guests[l].type === "bad") {
                    if (guests[l].mind === "all") {
                        guests[l].drink += (nbrGst - l);
                        if (banSys) guests[l].banned = true;
                        l = nbrGst;
                    } else {
                        const badDrink = randomInt(l, nbrGst - 1);
                        guests[l].drink += (badDrink - l + 1);
                        if (banSys && (badDrink - l + 1 > 1)) {
                            guests[l].banned = true;
                        }
                        l = badDrink + 1;
                    }
                }
            }

            if (r >= 0) {
                if (banSys && guests[r].banned) {
                    
                    if(badSwitch){
                        for (let i = r ; i >= 0 ; i--) {
                            if (!guests[i].banned) {
                                guests[i].drink += 1
                                r--;
                                break
                            }
                        }
                        r--;
                    }else{
                        for (let i = r ; i >= 0 ; i--) {
                            if (!guests[i].banned) {
                                guests[i].drink += 1
                                r = i ;
                                break
                            }
                        }
                        r--;
                    }
                
                
                } else if (guests[r].type === "good") {
                    guests[r].drink += 1;
                    if (guests[r].drink > 1) {
                        guests[r].banned = true;
                        r--;
                    } else {
                        r--;
                    }
                } else if (guests[r].type === "bad") {
                    if (guests[r].mind === "all") {
                        guests[r].drink += (r + 1);
                        if (banSys) guests[r].banned = true;
                        r = -1;
                    } else {
                        const badDrink = randomInt(1, r);
                        guests[r].drink += (r - badDrink + 1);
                        if (banSys && (r - badDrink + 1 > 1)) {
                            guests[r].banned = true;
                        }
                        r = badDrink - 1;
                    }
                }
            }

            if (badSwitch){
                guests = shuffleBadGuest(guests);

            }
            
        }

        for (let j = 0; j < nbrGst; j++) {
            if (guests[j].drink > 0) {
                countGestDrink++
            }
        }
        simulationData.push((countGestDrink / nbrGst) * 100)
        simulationTotalDrink += countGestDrink;
    }
    return (simulationTotalDrink / (simulationTime * nbrGst)) * 100;
}

let obj = { 0 : [], 1 : [],2 : [],3 : []}
for(let i = 0 ; i<10; i++){
    obj[0].push(myfnc(14, 1000,false,false))
    obj[1].push(myfnc(14, 1000,false,true))
   obj[2].push(myfnc(14, 1000,true,false))
     obj[3].push(myfnc(14, 1000,true,true))
}

console.log("no ban sys no badSwitch : ", avg(obj[0]));
console.log("no ban sys badSwitch : ", avg(obj[1]));
console.log("ban sys no badSwitch : ", avg(obj[2]));
console.log("ban sys  badSwitch : ", avg(obj[3]));