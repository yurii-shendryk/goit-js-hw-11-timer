class CountdownTimer {
  constructor({ selector, targetDate }) {
    this.selector = selector;
    this.targetDate = targetDate;
    this.intervalId = null;
    this.start();
  }
  // Методы
  // Запускаем таймер
  start() {
    const startTime = this.targetDate.getTime();
    const currentTime = Date.now();
    const deltaTime = startTime - currentTime;
    this.updateClockface(deltaTime);
    this.intervalId = setInterval(() => {
      const startTime = this.targetDate.getTime();
      const currentTime = Date.now();
      const deltaTime = startTime - currentTime;
      if (deltaTime <= 0) {
        this.stop();
        return;
      }
      this.updateClockface(deltaTime);
    }, 1000);
  }
  // удаляем таймер после окончания отсчета времени
  stop() {
    clearInterval(this.intervalId);
    this.updateClockface(0);
  }

  getTimerElements(selector) {
    const root = document.querySelector(selector);
    const refs = {
      days: root.querySelector('span[data-value="days"]'),
      hours: root.querySelector('span[data-value="hours"]'),
      minutes: root.querySelector('span[data-value="mins"]'),
      seconds: root.querySelector('span[data-value="secs"]'),
    };
    return refs;
  }

  updateClockface(time) {
    const timer = this.getTimerElements(this.selector);
    const days = this.pad(Math.floor(time / (1000 * 60 * 60 * 24)));
    const hours = this.pad(
      Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
    );
    const mins = this.pad(Math.floor((time % (1000 * 60 * 60)) / (1000 * 60)));
    const secs = this.pad(Math.floor((time % (1000 * 60)) / 1000));
    timer.days.textContent = `${days}`;
    timer.hours.textContent = `${hours}`;
    timer.minutes.textContent = `${mins}`;
    timer.seconds.textContent = `${secs}`;
  }
  pad(value) {
    return String(value).padStart(2, '0');
  }
}

const timer = new CountdownTimer({
  selector: '#timer-1',
  targetDate: new Date('Jun 05, 2021'),
});
