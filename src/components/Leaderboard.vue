<template lang="html">
  <ol>
    <li v-for="leader in leaderboard">
      {{leader.name}}
      {{leader.score}}
    </li>
  </ol>
</template>

<script>
export default {
  name: 'leaderboard',
  created: function () {

  }
}
</script>

<style lang="css">
</style>
