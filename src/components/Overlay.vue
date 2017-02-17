<template lang="html">
  <div class="overlay">
    {{ content }}
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
    background-color: red;
  }
</style>
