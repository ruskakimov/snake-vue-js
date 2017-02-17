<template lang="html">
  <div class="overlay">
    <span class="content">
      {{ content }}
    </span>
  </div>
</template>

<script>
export default {
  name: 'overlay',
  props: ['content']
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
  .content {
    font-size: 2em;
    font-family: 'Rubik', sans-serif;
    color: #fff;
    -webkit-font-smoothing: antialiased;
    margin-bottom: 0.6em;
  }
</style>
