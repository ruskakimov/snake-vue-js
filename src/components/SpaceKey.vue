<template lang="html">
  <div class="space">
    <kbd>Space</kbd>
  </div>
</template>

<script>
export default {
  name: 'space-key'
}
</script>

<style lang="css" scoped>
  .space {
    margin: 0 0.5em;
    position: relative;
    font-size: 1em;
    width: 5em;
    height: 1.8em;
    border-radius: 0.2em;
    background: #eee;
  }
  .space kbd {
    position: absolute;
    left: 0.5em;
    bottom: 0.4em;
  }
</style>
