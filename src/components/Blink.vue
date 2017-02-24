<template lang="html">
  <div class="blink">
    <span>press</span>
    <div class="key">
      <slot name="key">
        (key visual here)
      </slot>
    </div>
    <span>to {{ actionName }}</span>
  </div>
</template>

<script>
export default {
  name: 'blink',
  props: {
    actionName: String
  }
}
</script>

<style lang="css" scoped>
  .blink {
    position: absolute;
    bottom: 2em;
    width: 100%;
    display: flex;
    justify-content: center;
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
  .key {
    margin: 0 0.5em;
  }
</style>
