<template>
  <div class='month-calendar'>
    <div v-for='(day, n) in weekDays' class='day-of-week'>
      <div>{{ day }}</div>
      <div v-if='n < getBlankDays()' class='month-calendar-day'></div>
      <div v-for='monthDay in period' v-if='monthDay.date.dayOfTheWeek === day' class='month-calendar-day'>
        <div class='date-cell' @click='openPopup(monthDay)' v-bind:class='checkEvent(monthDay)'>{{ monthDay.date.day }}</div>
      </div>
    </div>
  </div>
</template>

<script src="./month.js"></script>
<style src="./month.css" scoped></style>
