function refreshClock() {
    const digits = [...document.querySelectorAll('.numbers>div')];
    const innerClock = document.querySelector('.innerClock');
    const outerClock = document.querySelector('.outerClock');

    // add minutes bars around the clock
    let barRotation = 0;
    for (let i = 0; i < 60; i++) {
        const clockBar = document.createElement('div');
        clockBar.classList.add('bar');
        if (i % 5 == 0) {
            clockBar.style.height = '3vh';
            clockBar.style.width = '2px';
        }
        clockBar.style.transform = `rotate(${barRotation}deg)`;
        barRotation += 6;
        innerClock.appendChild(clockBar);
    }

    // calculate clock radius
    const innerClockRadius = innerClock.clientWidth / 2;

    // change size of digits and border along with change of whole's clock size
    function resizeDigits() {
        let size = innerClockRadius * 0.4;
        digits.forEach(digit => digit.style.fontSize = `${size}px`)
    }

    function resizeBorder() {
        let size = innerClockRadius * 0.08;
        outerClock.style.borderWidth = size + 'px';
    }

    // function placing digits around the clock properly
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

function initiateMove(hrs = 0, mins = 0, secs = 0) {
    const hoursHand = document.querySelector('.hands .hours');
    const minutesHand = document.querySelector('.hands .minutes');
    const secondsHand = document.querySelector('.hands .seconds');

    // starting position of hands depending on current time
    let secRotation = (360 / 60) * secs + 180;
    let minRotation = (360 / 60) * mins + 180;
    let hourRotation = (360 / 12) * hrs + (360 / 12 / 60) * mins + 180;

    secondsHand.style.transform = `translate(-50%, -20%) rotate(${secRotation}deg)`;
    minutesHand.style.transform = `translate(-50%, -20%) rotate(${minRotation}deg)`;
    hoursHand.style.transform = `translate(-50%, -20%) rotate(${hourRotation}deg)`;

    // move hands - functions
    function secondsHandMove() {
        secRotation += 360 / 60;
        secondsHand.style.transform = `translate(-50%, -20%) rotate(${secRotation}deg)`;
    }

    function minutesHandMove() {
        minRotation += 360 / 60;
        minutesHand.style.transform = `translate(-50%, -20%) rotate(${minRotation}deg)`;
    }

    function hoursHandMove() {
        hourRotation += 360 / 60 / 12;
        hoursHand.style.transform = `translate(-50%, -20%) rotate(${hourRotation}deg)`;
    }

    // call out functions every second
    function handsMove() {
        secondsHandMove();
        if ((secRotation + 180) % 360 == 0) {
            minutesHandMove();
            hoursHandMove();
        }
    }

    return handsMove;
}

const currTime = new Date();

refreshClock();

// transfer data about current time to initiateMove function in order to set starting position of hands
const clockStart = initiateMove(currTime.getHours() > 12 ? currTime.getHours() - 12 : currTime.getHours(), currTime.getMinutes(), currTime.getSeconds());

// move seconds hand every second
setInterval(clockStart, 1000);

// event on size change of clock
window.addEventListener('resize', refreshClock);