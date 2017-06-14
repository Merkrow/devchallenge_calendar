import Week from '../week/week.vue';
import Month from '../month/month.vue';
import Popup from '../event/event.vue';

export default {
  name: 'calendar',
  components: {
    Week,
    Month,
    Popup,
  },
  data() {
    return {
      events: [],
      monthes: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
      weekDays: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
      currentDate: {
        dayOfWeek: new Date().getDay(),
        dayOfMonth: new Date().getDate(),
        month: new Date().getMonth(),
        year: new Date().getFullYear(),
      },
      today: {
        day: new Date().getDate(),
        month: new Date().getMonth(),
        year: new Date().getFullYear(),
      },
      eventDate: {
        day: 0,
        month: 0,
        year: 0,
      },
      period: 'Week',
      calendar: [],
      updating: false,
    };
  },
  computed: {
    monthesByYear: function () {
      const { year } = this.currentDate;
      const monthes = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

      if (year % 4 === 0) {
        monthes[1] = 29;
      }

      return monthes;
    },
    hours: () => {
      let result = [];
      for (let i = 0; i < 24; i++) {
        result = i >= 10 ? result.concat(`${i}:00`) : result.concat(`0${i}:00`);
      }
      return result;
    },
    todayMonthDays: function () {
      return this.monthesByYear[this.currentDate.month];
    },
    getPeriod: function () {
      let { month, year } = this.currentDate;
      let events = [];
      const { dayOfWeek, dayOfMonth } = this.currentDate;
      const { monthesByYear, weekDays } = this;
      const result = [];
      let currentMonthDays = monthesByYear[month];
      switch (this.period) {
        case 'Week':
          let startDate = dayOfMonth - dayOfWeek + 1;
          startDate -= dayOfWeek === 0 ? 6 : 0;
          if (startDate < 1) {
            if (monthesByYear[month - 1]) {
              currentMonthDays = monthesByYear[month - 1];
              month -= 1;
            } else {
              currentMonthDays = monthesByYear[11];
              month = 11;
              year -= 1;
            }
            startDate = currentMonthDays + startDate;
          }
          for (let i = startDate, j = 0; j < 7; j++, i++) {
            if (this.events.length) {
              events = this.events.filter(item => item.date.day === i && item.date.month === month && item.date.year === year);
            }
            const dayInfo = {
              date: {
                day: i,
                month,
                year,
                dayOfTheWeek: weekDays[j],
                events,
              },
            };
            result.push(dayInfo);
            if (i === currentMonthDays) {
              if (month !== 11) {
                i = 0;
                month++;
              } else {
                i = 0;
                month = 1;
                year++;
              }
            }
          }
          break;
        case 'Month':
          const firstDay = new Date(year, month, 1).getDay() - 1;
          for (let i = 1, j = firstDay === -1 ? 6 : firstDay; i <= currentMonthDays; i++, j++) {
            if (this.events.length) {
              events = this.events.filter(item => item.date.day === i && item.date.month === month && item.date.year === year);
            }
            const dayInfo = {
              date: {
                day: i,
                month,
                year,
                dayOfTheWeek: weekDays[j],
                events
              },
            };
            if (j === 6) {
              j = -1;
            }
            result.push(dayInfo);
          }
          break;
        case 'Year':
          for (let k = 0; k < 12; k++) {
            result[k] = [];
            const firstDay = new Date(year, k, 1).getDay() - 1;
            for (let i = 1, j = firstDay === -1 ? 6 : firstDay; i <= monthesByYear[k]; i++, j ++) {
              if (this.events.length) {
                events = this.events.filter(item => item.date.day === i && item.date.month === k && item.date.year === year);
              }
              const dayInfo = {
                date: {
                  day: i,
                  month: k,
                  year,
                  dayOfTheWeek: weekDays[j],
                  events
                },
              };
              if (j === 6) {
                j = -1;
              }
              result[k].push(dayInfo);
            }
          }
          break;
        default:
          break;
      }
      return result;
    },
  },
  methods: {
    setPeriod(e) {
      this.period = e.srcElement.innerHTML;
    },
    setPrevPeriod() {
      switch (this.period) {
        case 'Year':
          this.currentDate.year -= 1;
          break;
        case 'Month':
          this.currentDate.month -= this.currentDate.month === 0 ? -11 : 1;
          break;
        case 'Week':
          const { month, dayOfMonth } = this.currentDate;
          const startDate = dayOfMonth - 7;
          if (startDate < 0 && month !== 0) {
            this.currentDate.month -= 1;
            this.currentDate.dayOfMonth = this.monthesByYear[this.currentDate.month] + startDate;
          } else if (startDate < 0 && month === 0) {
            this.currentDate.month = 11;
            this.currentDate.dayOfMonth = this.monthesByYear[11] + startDate;
            this.currentDate.year -= 1;
          } else {
            this.currentDate.dayOfMonth = startDate;
          }
          break;
        default:
          break;
      }
    },
    toggleUpdate() {
      this.updating = !this.updating;
    },
    setEventDate(obj) {
      this.eventDate.day = obj.date.day;
      this.eventDate.month = obj.date.month;
      this.eventDate.year = obj.date.year;
      this.eventDate.events = obj.date.events;
    },
    addEvent(obj) {
      this.events.push(obj);
    },
    setNextPeriod() {
      switch (this.period) {
        case 'Year':
          this.currentDate.year += 1;
          break;
        case 'Month':
          this.currentDate.month += this.currentDate.month === 11 ? -11 : 1;
          break;
        case 'Week':
          const { month, dayOfMonth } = this.currentDate;
          const startDate = dayOfMonth + 7;
          if (startDate > this.monthesByYear[month] && month !== 11) {
            this.currentDate.dayOfMonth = startDate - this.monthesByYear[month];
            this.currentDate.month += 1;
          } else if (startDate > this.monthesByYear[month] && month === 11) {
            this.currentDate.dayOfMonth = startDate - this.monthesByYear[month];
            this.currentDate.month = 0;
            this.currentDate.year += 1;
          } else {
            this.currentDate.dayOfMonth = startDate;
          }
          break;
        default:
          break;
      }
    },
  },
  updated() {
    const { events, currentDate, period, updating, eventDate } = this;
    localStorage.setItem('events', JSON.stringify(events));
    localStorage.setItem('currentDate', JSON.stringify(currentDate));
    localStorage.setItem('period', period);
  },
  mounted() {
    const events = localStorage.getItem('events');
    const currentDate = localStorage.getItem('currentDate');
    if (currentDate) {
      this.currentDate = JSON.parse(currentDate);
    }
    const period = localStorage.getItem('period');
    if (period) {
      this.period = period;
    }
    if (events) {
      this.events = JSON.parse(events);
    }
  },
};
