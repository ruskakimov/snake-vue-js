<template lang="html">
  <div class="overlay">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'overlay'
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
    z-index: 3;
  }
</style>
