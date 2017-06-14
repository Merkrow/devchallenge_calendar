export default {
  name: 'week',
  props: ['period', 'monthes', 'today', 'hours', 'toggleUpdate', 'setEventDate'],
  methods: {
    isToday(day) {
      return day.date.month === this.today.month && day.date.year === this.today.year &&
      day.date.day === this.today.day;
    },
    openPopup(day) {
      this.toggleUpdate();
      this.setEventDate(day);
    },
    checkEvent(day) {
      if (day.date.events.length) {
        return 'has-event';
      }
      return '';
    },
  },
  mounted() {
  },
};
