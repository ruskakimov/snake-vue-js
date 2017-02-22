<template lang="html">
  <div class="score">
    {{ value }}
  </div>
</template>

<script>
export default {
  name: 'score',
  props: ['value']
}
</script>

<style lang="css">
  .score {
    position: absolute;
    height: 100%;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    font-family: 'Rubik', sans-serif;
    font-size: 5em;
    color: #000;
    opacity: 0.2;
    z-index: 1;
    -webkit-font-smoothing: antialiased;
  }
</style>
