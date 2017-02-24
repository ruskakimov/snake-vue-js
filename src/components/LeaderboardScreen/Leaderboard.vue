<template lang="html">
  <div class="container">
    <h1>Leaders:</h1>
    <div class="board">
      <div class="leader" v-for="leader in sortedLeaders">
        <div class="name">{{ leader.name }}</div>
        <div class="score">{{ leader.score }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import { scoreboard } from './../../db'

export default {
  name: 'leaderboard',
  computed: {
    sortedLeaders () {
      return this.leaderBoard.sort((a, b) => b.score - a.score)
    }
  },
  firebase: {
    leaderBoard: scoreboard.orderByChild('score').limitToLast(7)
  }
}
</script>

<style lang="css" scoped>
  .container {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .board {
    width: 100%;
    display: flex;
    flex-direction: column;
  }
  .leader {
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
  }
  .name,
  .score {
    font-size: 1.2em;
    margin: .2em 0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .name {
    text-align: right;
    padding-right: 1em;
    flex-grow: 1;
  }
  .score {
    width: 5em;
    font-weight: bold;
    text-align: left;
    padding-left: 1em;
  }
  h1 {
    margin: 1em 0 .5em;
  }
</style>
