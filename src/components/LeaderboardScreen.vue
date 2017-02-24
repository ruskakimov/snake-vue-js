<template lang="html">
  <div class="screen">
    <leaderboard></leaderboard>
    <blink actionName="restart">
      <space-key slot="key"></space-key>
    </blink>
  </div>
</template>

<script>
import { scoreboard } from './../db'
import Leaderboard from './Leaderboard'
import Blink from './Blink'
import SpaceKey from './SpaceKey'

export default {
  name: 'leaderboard-screen',
  components: {
    Leaderboard, Blink, SpaceKey
  }
}
</script>

<style lang="css" scoped>
  .screen {
    width: 100%;
    height: 100%;
  }
</style>
