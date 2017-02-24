<template lang="html">
  <div class="enter">
    <kbd>Enter</kbd>
  </div>
</template>

<script>
export default {
  name: 'enter-key'
}
</script>

<style lang="css" scoped>
  .enter {
    position: relative;
    font-size: 1em;
    width: 5em;
    height: 1.8em;
    border-radius: 0.2em;
    background: #eee;
  }
  .enter kbd {
    color: #333;
    position: absolute;
    left: 0.5em;
    bottom: 0.4em;
  }
</style>
