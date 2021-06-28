"use strict"

const container = document.querySelector('.container')

class Stopwatch {
    constructor(id) {
        this.id = id
    }

    createStopwatch() {
        const el = document.createElement('div')
        el.className = 'stopwatch-container'
        el.innerHTML = `<h1>Stopwatch ${this.id}</h1>
        <div class="stopwatch stopwatch_${this.id}">
            <span class="hours"> 00 : </span>
            <span class="minutes"> 00 : </span>
            <span class="seconds"> 00 : </span>
            <span class="milliseconds"> 00</span>
        </div>

        <div class="buttons">
            <button class="start">start</button>
            <button class="pause">pause</button>
            <button class="reset">reset</button>
            <button class="lap">lap</button>
            <button class="setData">save time</button>
            <button class="getData">start last time</button>
        </div>
        <div class="laps-container laps-container_${this.id}"></div>`
        container.append(el)
    }

    declareElements() {
        this.watch = document.querySelector(`.stopwatch_${this.id}`)
        this.laps = document.querySelector(`.laps-container_${this.id}`)
        this.timer = null
        this.ms = 0
    }

    startWatch() {
        this.watch = document.querySelector(`.stopwatch_${this.id}`)
        this.watch.classList.remove('paused')
        clearInterval(this.timer)
        this.timer = setInterval( () => {
            this.ms += 10
            let dateTimer = new Date(this.ms)
            this.watch.innerHTML =
                ('0' + dateTimer.getUTCHours()).slice(-2) + ' : ' +
                ('0' + dateTimer.getUTCMinutes()).slice(-2) + ' : ' +
                ('0' + dateTimer.getUTCSeconds()).slice(-2) + ' : ' +
                ('0' + dateTimer.getUTCMilliseconds()).slice(-3, -1)
        }, 10)
    }

    pauseWatch() {
        this.watch.classList.add('paused')
        clearInterval(this.timer)
    }

    addLap() {
        this.laps = document.querySelector(`.laps-container_${this.id}`)
        this.lap = document.createElement('div')
        this.lap.innerText = this.watch.innerText
        this.laps.append(this.lap)
    }

    resetWatch() {
        this.watch.classList.add('paused')
        clearInterval(this.timer)
        this.ms = 0
        this.watch.innerHTML = '00 : 00 : 00 : 00'
        this.laps.innerHTML = null
    }

    saveWatch() {
        localStorage.setItem(`${this.id}`, JSON.stringify([this.ms, this.watch.innerHTML]))
    }

    startLastWatch() {
        if (localStorage.getItem(`${this.id}`)) {
            this.watch.classList.add('paused')
            clearInterval(this.timer)
            this.ms = JSON.parse(localStorage.getItem(`${this.id}`))[0]
            this.watch.innerHTML = JSON.parse(localStorage.getItem(`${this.id}`))[1]
        } else {
            alert('You didn\'t save data!')
        }
    }

    begin() {
        document.addEventListener('click', (e) => {
            const element = e.target
            const condition = (element.parentElement.previousElementSibling.className.includes(`stopwatch_${this.id}`))
            if (element.className === 'start' && condition) this.startWatch()
            if (element.className === 'pause' && condition) this.pauseWatch()
            if (element.className === 'reset' && condition) this.resetWatch()
            if (element.className === 'setData') this.saveWatch()
            if (element.className === 'getData' && condition) this.startLastWatch()
            if (element.className === 'lap' && !this.watch.className.includes('paused') && condition) this.addLap()
        })
    }
}

const createWatch = document.querySelector('.createStopwatch')
let count = 0

createWatch.addEventListener('click', () => {
    ++count
    const stopwatch = new Stopwatch(count)
    stopwatch.createStopwatch()
    stopwatch.declareElements()
    stopwatch.begin()
})


