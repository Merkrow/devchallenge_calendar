<template>
  <div class='week-calendar-container'>
    <div v-for="day in period" class='week-calendar'>
      <div v-if='!isToday(day)' @click='openPopup(day)' class='day-info' v-bind:class='checkEvent(day)'>{{ `${day.date.dayOfTheWeek} ${day.date.day}/${day.date.month + 1}   ${day.date.year}` }}</div>
      <div v-if='isToday(day)' @click='openPopup(day)' class='day-info today' v-bind:class='checkEvent(day)'>{{ `${day.date.dayOfTheWeek} ${day.date.month + 1}/${day.date.day}    ${day.date.year}` }}</div>
    </div>
  </div>
</template>

<script src="./week.js"></script>
<style src="./week.css" scoped></style>
