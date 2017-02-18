<template lang="html">
  <div class="overlay">
    <span class="message">
      {{ message }}
    </span>
    <div v-if="displayRestart" class="restart">
      <span>press</span>
      <button class="restart-btn">
        <kbd>Space</kbd>
      </button>
      <span>to restart</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'overlay',
  props: ['message', 'displayRestart']
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
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-family: 'Rubik', sans-serif;
    color: #fff;
    -webkit-font-smoothing: antialiased;
  }
  .message {
    font-size: 4em;
    margin-bottom: 0.5em;
  }
  .restart {
    position: absolute;
    bottom: 2em;
    display: flex;
    align-items: center;
    animation: blink 1s infinite;
  }
  @keyframes blink {
    0% {
      opacity: 1;
    }
    50% {
      opacity: 0.5;
    }
    100% {
      opacity: 1;
    }
  }
  .restart-btn {
    margin: 0 0.5em;
    position: relative;
    font-size: 1em;
    border: 0;
    width: 5em;
    height: 1.8em;
    border-radius: 0.2em;
    background: #eee;
  }
  .restart-btn kbd {
    position: absolute;
    left: 0.5em;
    bottom: 0.4em;
  }
</style>
