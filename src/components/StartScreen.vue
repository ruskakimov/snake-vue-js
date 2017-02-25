<template lang="html">
  <div class="screen">
    <blink actionName="start">
      <enter-key slot="key"></enter-key>
    </blink>
  </div>
</template>

<script>
import Blink from './Blink'
import EnterKey from './SubmitScoreScreen/EnterKey'

export default {
  name: 'submit-score-screen',
  components: {
    Blink, EnterKey
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
</style>
