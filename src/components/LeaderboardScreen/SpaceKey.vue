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
    position: relative;
    font-size: 1em;
    width: 8em;
    height: 1.8em;
    border-radius: 0.2em;
    background: #eee;
  }
  .space kbd {
    color: #333;
    position: absolute;
    left: 0.5em;
    bottom: 0.4em;
  }
</style>
