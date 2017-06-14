export default {
  name: 'popup',
  props: ['addevent', 'hours', 'toggleUpdate', 'add'],
  data() {
    return {
      changing: 0,
      events: {},
      text: '',
    };
  },
  methods: {
    change(hour) {
      this.changing = hour;
    },
    addEvent(hour) {
      this.events[hour] = { ...this.addevent, hour, text: this.text };
      this.text = '';
      this.changing = 0;
    },
    saveChanges() {
      this.toggleUpdate();
      if (Object.keys(this.events).length) {
        this.add({ date: this.addevent, events: this.events });
      }
    },
  },
  mounted() {
  },
};
