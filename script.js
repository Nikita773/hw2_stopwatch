"use strict"

const watch = document.querySelector('.stopwatch')
const laps = document.querySelector('.laps-container')
let ms = 0,
    timer,
    lap

function startWatch() {
    watch.classList.remove('paused')
    clearInterval(timer)
    timer = setInterval( () => {
        ms += 10
        let dateTimer = new Date(ms)
        watch.innerHTML =
            ('0' + dateTimer.getUTCHours()).slice(-2) + ' : ' +
            ('0' + dateTimer.getUTCMinutes()).slice(-2) + ' : ' +
            ('0' + dateTimer.getUTCSeconds()).slice(-2) + ' : ' +
            ('0' + dateTimer.getUTCMilliseconds()).slice(-3, -1)
    }, 10)
}

function pauseWatch() {
    watch.classList.add('paused')
    clearInterval(timer)
}

function addLap() {
    lap = document.createElement('div')
    lap.innerText = watch.innerText
    laps.appendChild(lap)
}

function resetWatch() {
    watch.classList.add('paused')
    clearInterval(timer)
    ms = 0
    watch.innerHTML = '00 : 00 : 00 : 00'
    laps.innerHTML = null
}

document.addEventListener('click', (e) => {
    const element = e.target
    if (element.className === 'start') startWatch()
    if (element.className === 'pause') pauseWatch()
    if (element.className === 'reset') resetWatch()
    if (element.className === 'lap' && !watch.className.includes('paused')) addLap()
})
