<template lang="html">
  <div class="cell" :class="classObj"></div>
</template>

<script>
export default {
  name: 'cell',
  props: ['value'],
  computed: {
    classObj: function () {
      return {
        snake: this.value === 1,
        treat: this.value === 2
      }
    }
  }
}
</script>

<style lang="css">
  .cell {
    width: 1em;
    height: 1em;
    float: left;
  }
  .snake {
    background: #333;
    z-index: 2;
  }
  .treat {
    background: #c00;
    z-index: 2;
  }
</style>
