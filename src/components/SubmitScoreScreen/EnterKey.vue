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
  .enter,
  .enter::after {
    border-radius: 0.2em;
    background: #eee;
  }
  .enter {
    position: relative;
    font-size: 1em;
    width: 4em;
    height: 1.8em;
  }
  .enter::after {
    content: '';
    display: block;
    height: 3.6em;
    width: 2.5em;
    position: absolute;
    right: 0;
    bottom: 0;
    z-index: 4;
  }
  .enter kbd {
    color: #333;
    position: absolute;
    left: 0.5em;
    bottom: 0.4em;
    z-index: 5;
  }
</style>
