<template>
  <div class='event-window'>
    <span>{{ `${addevent.day}/${addevent.month + 1}   ${addevent.year}` }}</span>
    <div v-for='hour in hours' class='hour'>
      <span>{{ hour }}</span>
      <span v-if='changing !== hour' class='add-event' @click = 'change(hour)'> {{ `${events[hour] && events[hour].text || addevent.events && addevent.events[0] && addevent.events[0].events && addevent.events[0].events[hour] && addevent.events[0].events[hour].text || ''}` }}</span>
      <input v-if='changing === hour' v-model='text' />
      <button v-if='changing === hour' @click='addEvent(hour)'>Add event</button>
    </div>
    <button @click='saveChanges'>Save</button>
  </div>
</template>

<script src="./event.js"></script>
<style src="./event.css" scoped></style>
