<template lang="html">
  <div class="overlay">
    <span class="message">
      {{ message }}
    </span>
  </div>
</template>

<script>
export default {
  name: 'overlay',
  props: ['message']
}
</script>

<style lang="css">
  .overlay {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: #333;
    opacity: 0.8;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .message {
    font-size: 2em;
    font-family: 'Rubik', sans-serif;
    color: #fff;
    -webkit-font-smoothing: antialiased;
    margin-bottom: 0.6em;
  }
</style>
