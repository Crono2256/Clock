const digits = [...document.querySelectorAll('.numbers>div')];
const innerClock = document.querySelector('.innerClock');
const outerClock = document.querySelector('.outerClock');

function refreshClock() {
    const innerClockRadius = innerClock.clientWidth / 2;

    function resizeDigits() {
        let size = innerClockRadius * 0.4;
        digits.forEach(digit => digit.style.fontSize = `${size}px`)
    }

    function resizeBorder() {
        let size = innerClockRadius * 0.12;
        outerClock.style.borderWidth = size + 'px';
    }

    function placeDigits() {
        let degrees = Math.PI / 3;

        for (let i = 0; i <= 11; i++) {
            digits[i].style.transform = `translate(calc(${Math.round(innerClockRadius * Math.cos(degrees))}px - 50%), calc(${-Math.round(innerClockRadius * Math.sin(degrees))}px - 50%))`;
            degrees -= Math.PI / 6;
        }
    }

    resizeDigits();
    resizeBorder();
    placeDigits();
}

function initiateMove() {
    const hoursHand = document.querySelector('.hands .hours');
    const minutesHand = document.querySelector('.hands .minutes');
    const secondsHand = document.querySelector('.hands .seconds');

    let secRotation = 120;
    let minRotation = 180;
    let hourRotation = 60;

    // starting position of hands
    secondsHand.style.transform = `translate(-50%, -20%) rotate(${secRotation}deg)`;
    minutesHand.style.transform = `translate(-50%, -20%) rotate(${minRotation}deg)`;
    hoursHand.style.transform = `translate(-50%, -20%) rotate(${hourRotation}deg)`;

    function secondsHandMove() {
        secRotation += 360 / 60;
        secondsHand.style.transform = `translate(-50%, -20%) rotate(${secRotation}deg)`;
        // console.log(secRotation);
    }

    function minutesHandMove() {
        minRotation += 360 / 60;
        minutesHand.style.transform = `translate(-50%, -20%) rotate(${minRotation}deg)`;
    }

    function hoursHandMove() {
        console.log('godzina przesuwa się')
        hourRotation += 360 / 60 / 12;
        hoursHand.style.transform = `translate(-50%, -20%) rotate(${hourRotation}deg)`;
    }

    // move hands every second
    function handsMove() {
        // console.log('ruch wskazówek');
        secondsHandMove();
        if ((secRotation + 180) % 360 == 0) {
            minutesHandMove();
            hoursHandMove();
        }
    }

    return handsMove;
}

refreshClock();
const clockStart = initiateMove();
// initiateMove();
setInterval(clockStart, 1000);

window.addEventListener('resize', refreshClock);