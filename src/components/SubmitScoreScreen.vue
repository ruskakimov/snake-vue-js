<template lang="html">
  <div class="screen">
    <div class="name">
      <input
        type="text"
        ref="input"
        :value="value"
        @input="updateValue($event.target.value)"
      >
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
    }
  },
  activated: function () {
    this.$refs.input.focus()
  }
}
</script>

<style lang="css" scoped>
  .screen {
    width: 100%;
    height: 100%;
  }
</style>
