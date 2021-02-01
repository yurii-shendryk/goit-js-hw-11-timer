class CountdownTimer {
  constructor({ selector, targetDate }) {
    this.selector = selector;
    this.root = document.querySelector(this.selector);
    this.targetDate = targetDate;
    this.template =
      '<div class="field"><span class="value" data-value="days">11</span ><span class="label">Days</span></div ><div class="field"><span class="value" data-value="hours">11</span><span class="label">Hours</span></div><div class="field"><span class="value" data-value="mins">11</span><span class="label">Minutes</span></div><div class="field"><span class="value" data-value="secs">11</span><span class="label">Seconds</span></div>';
    this.root.insertAdjacentHTML('beforeend', this.template);
    this.refs = {
      days: this.root.querySelector('span[data-value="days"]'),
      hours: this.root.querySelector('span[data-value="hours"]'),
      minutes: this.root.querySelector('span[data-value="mins"]'),
      seconds: this.root.querySelector('span[data-value="secs"]'),
    };
    this.startTime = this.targetDate.getTime();
    this.currentTime = Date.now();
    this.deltaTime = this.startTime - this.currentTime;
    this.intervalId = null;
  }
  // Запускаем таймер
  start() {
    if (this.intervalId !== null) {
      return;
    }
    this.deltaTime;
    if (this.deltaTime <= 0) {
      this.updateClockface(0);
      return;
    }
    this.updateClockface(this.deltaTime);
    this.intervalId = setInterval(() => {
      if (this.deltaTime <= 0) {
        clearInterval(this.intervalId);
        this.updateClockface(0);
        return;
      }
      const startTime = this.targetDate.getTime();
      const currentTime = Date.now();
      const deltaTime = startTime - currentTime;
      this.updateClockface(deltaTime);
    }, 1000);
  }
  // удаляем таймер после окончания отсчета времени
  stop() {
    clearInterval(this.intervalId);
    // this.root.innerHTML = '<b style="font-size:50px">Событие закончилось</b>';
    this.root.innerHTML = '';
    this.intervalId = null;
  }

  updateClockface(time) {
    const days = this.pad(Math.floor(time / (1000 * 60 * 60 * 24)));
    const hours = this.pad(
      Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
    );
    const mins = this.pad(Math.floor((time % (1000 * 60 * 60)) / (1000 * 60)));
    const secs = this.pad(Math.floor((time % (1000 * 60)) / 1000));
    this.refs.days.textContent = `${days}`;
    this.refs.hours.textContent = `${hours}`;
    this.refs.minutes.textContent = `${mins}`;
    this.refs.seconds.textContent = `${secs}`;
  }
  pad(value) {
    return String(value).padStart(2, '0');
  }
}

const timer1 = new CountdownTimer({
  selector: '#timer-1',
  targetDate: new Date(2021, 1, 3, 0, 55),
});
timer1.start();
setTimeout(() => {
  timer1.stop();
}, timer1.deltaTime);

const timer2 = new CountdownTimer({
  selector: '#timer-2',
  targetDate: new Date(2021, 1, 3, 0, 58),
});
timer2.start();
setTimeout(() => {
  timer2.stop();
}, timer2.deltaTime);

const timer3 = new CountdownTimer({
  selector: '#timer-3',
  targetDate: new Date(2021, 1, 3, 0, 58),
});
timer3.start();
setTimeout(() => {
  timer3.stop();
}, timer3.deltaTime);

const timer4 = new CountdownTimer({
  selector: '#timer-4',
  targetDate: new Date(2021, 1, 3, 0, 58),
});
timer4.start();
setTimeout(() => {
  timer4.stop();
}, timer4.deltaTime);
