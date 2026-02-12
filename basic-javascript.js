let counter = document.getElementById("counter");

function tickUp() {
    counter.innerHTML = parseInt(counter.innerHTML) + 1;
}

function tickDown() {
    counter.innerHTML = parseInt(counter.innerHTML) - 1;
}

let forLoopResult = document.getElementById("forLoopResult");

function runForLoop() {
    forLoopResult.innerHTML = "";
    for (let i = 0; i <= parseInt(counter.innerHTML); i++) {
        forLoopResult.innerHTML += i + " ";
    }
}

let oddNumberResult = document.getElementById("oddNumberResult");

function showOddNumbers() {
    oddNumberResult.innerHTML = "";
    for (let i = 0; i <= parseInt(counter.innerHTML); i++) {
        if (i % 2 !== 0) {
            oddNumberResult.innerHTML += i + " ";
        }
    }
}

function addMultiplesToArray() {
    let multiplesArray = [];
    for (let i = parseInt(counter.innerHTML); i >= 0; i--) {
        if (i % 5 === 0) {
            multiplesArray.push(i);
        }
    }
    console.log(multiplesArray);
}

let carType = document.getElementById("carType");
let carMPG = document.getElementById("carMPG");
let carColor = document.getElementById("carColor");

function printCarObject() {
    let car = {
        cType: carType.value,
        cMpg: parseInt(carMPG.value),
        cColor: carColor.value
    };
    console.log(car);
}

function loadCar(index) {
    if (index == 1) {
        carType.value = carObject1.cType;
        carMPG.value = carObject1.cMPG;
        carColor.value = carObject1.cColor;
    }
    else if (index == 2) {
        carType.value = carObject2.cType;
        carMPG.value = carObject2.cMPG;
        carColor.value = carObject2.cColor;
    }
    else if (index == 3) {
        carType.value = carObject3.cType;
        carMPG.value = carObject3.cMPG;
        carColor.value = carObject3.cColor;
    }
    else {
        console.log("Invalid index");
    }
}

let styleParagraph = document.getElementById("styleParagraph");

function changeColor(index) {
    if (index == 1) {
        styleParagraph.style.color = "red";
    }
    else if (index == 2) {
        styleParagraph.style.color = "green";
    }
    else if (index == 3) {
        styleParagraph.style.color = "blue";
    }
    else {
        console.log("Invalid index");
    }
}