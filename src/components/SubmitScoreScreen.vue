<template lang="html">
  <div class="screen">
    <div class="name">
      {{ value }}
    </div>
    <blink actionName="submit score">
      <space-key slot="key"></space-key>
    </blink>
  </div>
</template>

<script>
import Blink from './Blink'
import SpaceKey from './LeaderboardScreen/SpaceKey'

export default {
  name: 'submit-score-screen',
  props: {
    value: String
  },
  components: {
    Blink, SpaceKey
  },
  methods: {
    updateValue (value) {
      this.$emit('input', value)
    },
    handleKeydown (e) {
      if (e.keyCode >= 65 && e.keyCode <= 90) {
        this.updateValue(this.value + e.key)
      }
      else if (e.keyCode === 8) {
        this.updateValue(this.value.slice(0, -1))
      }
    }
  },
  mounted: function () {
    console.log('mounted')
    window.addEventListener('keydown', this.handleKeydown)
  },
  beforeDestroy: function () {
    console.log('unmounted')
    window.removeEventListener('keydown', this.handleKeydown)
  }
}
</script>

<style lang="css" scoped>
  .screen {
    width: 100%;
    height: 100%;
  }
</style>
