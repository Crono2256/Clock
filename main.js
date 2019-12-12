const digits = [...document.querySelectorAll('.numbers>div')];
const innerClock = document.querySelector('.innerClock');

function placeDigits() {
    const innerClockRadius = innerClock.clientWidth / 2;
    let degrees = Math.PI / 3;

    for (let i = 0; i <= 11; i++) {
        digits[i].style.transform = `translate(calc(${Math.round(innerClockRadius * Math.cos(degrees))}px - 50%), calc(${-Math.round(innerClockRadius * Math.sin(degrees))}px - 50%))`;
        degrees -= Math.PI / 6;
    }
}

placeDigits();

window.addEventListener('resize', placeDigits);