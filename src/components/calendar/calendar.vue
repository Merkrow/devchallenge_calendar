<template>
  <div class='nav'>
    <popup v-if='updating' :addevent='eventDate' :hours='hours' :add='addEvent' :toggleUpdate='toggleUpdate'></popup>
    <button @click='setPrevPeriod'>Prev {{ period }}</button>
    <button @click='setNextPeriod'>Next {{ period }}</button>
    <button @click='setPeriod'>Week</button>
    <button @click='setPeriod'>Month</button>
    <button @click='setPeriod'>Year</button>
    <week v-if='period === "Week"' :period='getPeriod' :monthes='monthes' :today='today' :hours='hours' :toggleUpdate='toggleUpdate' :setEventDate='setEventDate'></week>
    <month v-if='period === "Month"' :period='getPeriod' :monthes='monthes' :today='today' :weekDays='weekDays' :toggleUpdate='toggleUpdate' :setEventDate='setEventDate'></month>
    <div v-if='period === "Year"' v-for='(month, n) in getPeriod'>
      <div v-if='n === 0' class='year'>{{ currentDate.year }}</div>
      <div class='month-name'>{{ monthes[n] }}</div>
      <month :period='month' :monthes='monthes' :today='today' :weekDays='weekDays' :toggleUpdate='toggleUpdate' :setEventDate='setEventDate'></month>
    </div>
  </div>
</template>

<script src="./calendar.js"></script>
<style src="./calendar.css" scoped></style>
