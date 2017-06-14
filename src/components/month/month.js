export default {
  name: 'month',
  props: ['weekDays', 'period', 'today', 'monthes', 'toggleUpdate', 'setEventDate'],
  methods: {
    getBlankDays() {
      const index = this.weekDays.findIndex(day => day === this.period[0].date.dayOfTheWeek);
      return index;
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
