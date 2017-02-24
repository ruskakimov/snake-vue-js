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
      <enter-key slot="key"></enter-key>
    </blink>
  </div>
</template>

<script>
import Blink from './Blink'
import EnterKey from './SubmitScoreScreen/EnterKey'

export default {
  name: 'submit-score-screen',
  props: {
    value: String
  },
  components: {
    Blink, EnterKey
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
