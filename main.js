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

refreshClock();


window.addEventListener('resize', refreshClock);