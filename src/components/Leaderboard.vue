<template lang="html">
  <ol>
    <li v-for="leader in sortedLeaders">
      {{leader.name}}
      {{leader.score}}
    </li>
  </ol>
</template>

<script>
import { scoreboard } from './../db'

export default {
  name: 'leaderboard',
  data () {
   return {
     leaders: []
   }
  },
  computed: {
    sortedLeaders () {
      return this.leaderBoard.reverse()
    }
  },
  firebase: {
    leaderBoard: scoreboard.orderByChild('score').limitToLast(2)
  }
}
</script>

<style lang="css">
</style>
