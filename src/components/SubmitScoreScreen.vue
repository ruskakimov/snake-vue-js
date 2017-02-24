<template lang="html">
  <div class="screen">
    <div class="name">
      <p>name:</p>
      <input
        type="text"
        ref="input"
        :value="value"
        @input="updateValue($event.target.value)"
      >
    </div>
    <div class="score">
      <p>score:</p>
      <span>{{ score }}</span>
    </div>
    <blink actionName="submit score">
      <enter-key slot="key"></enter-key>
    </blink>
  </div>
</template>

<script>
import Blink from './Blink'
import EnterKey from './SubmitScoreScreen/EnterKey'

const INPUT_LIMIT = 25

export default {
  name: 'submit-score-screen',
  props: {
    value: String,
    score: Number
  },
  components: {
    Blink, EnterKey
  },
  methods: {
    updateValue (value) {
      const newValue = (value.length > INPUT_LIMIT)
                       ? value.slice(0, INPUT_LIMIT)
                       : value
      this.$refs.input.value = newValue
      localStorage['userName'] = newValue
      this.$emit('input', newValue)
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
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: 1em;
  }
  .name,
  .score {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 2em;
  }
  p {
    margin: 0;
  }
  .score span {
    font-size: 3em;
  }
  input {
    background: transparent;
    width: 100%;
    border: 0;
    color: #eee;
    font-size: 3em;
    text-align: center;
    outline: none;
  }
</style>
