class CountdownTimer {
  constructor({ selector, targetDate }) {
    this.selector = document.querySelector(selector);
    this.targetDate = targetDate;
    this.days = this.selector.querySelector('span[data-value="days"]');
    this.hours = this.selector.querySelector('span[data-value="hours"]');
    this.minutes = this.selector.querySelector('span[data-value="mins"]');
    this.seconds = this.selector.querySelector('span[data-value="secs"]');
  }

  start() {
    const startTime = this.targetDate.getTime();
    const currentTime = Date.now();
    const deltaTime = startTime - currentTime;
    this.updateClockface(deltaTime);
    setInterval(() => {
      const startTime = this.targetDate.getTime();
      const currentTime = Date.now();
      const deltaTime = startTime - currentTime;
      this.updateClockface(deltaTime);
    }, 1000);
  }
  updateClockface(time) {
    const days = this.pad(Math.floor(time / (1000 * 60 * 60 * 24)));
    const hours = this.pad(
      Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
    );
    const mins = this.pad(Math.floor((time % (1000 * 60 * 60)) / (1000 * 60)));
    const secs = this.pad(Math.floor((time % (1000 * 60)) / 1000));
    this.days.textContent = `${days}`;
    this.hours.textContent = `${hours}`;
    this.minutes.textContent = `${mins}`;
    this.seconds.textContent = `${secs}`;
  }
  pad(value) {
    return String(value).padStart(2, '0');
  }
}

const timer1 = new CountdownTimer({
  selector: '#timer-1',
  targetDate: new Date('Feb 2, 2021'),
});

timer1.start();

const timer2 = new CountdownTimer({
  selector: '#timer-2',
  targetDate: new Date('Feb 3, 2021'),
});

timer2.start();
