
let checkIfGreater = function (num) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (num > 10) {
                resolve("Number if greater then 10");
            }
            else {
                if (num < 10)
                    reject("number if smaller then 10");
                else if (isNaN()) {
                    reject("input isn't a number");
                }
                else {
                    reject("unknown, something goes wrong");
                }
            }
        }, 500);

    });
}

checkIfGreater(18).then((message) => {
    console.log("Success: "+message)
}).catch((error) => {
    console.log("Error: "+error);
});



