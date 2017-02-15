<template lang="html">
  <div class="grid">
    <div class="row" v-for="row in matrix">
      <cell v-for="val in row" :value="val"></cell>
    </div>
  </div>
</template>

<script>
import Cell from './Cell'

export default {
  name: 'grid',
  props: ['matrix'],
  components: {
    Cell
  }
}
</script>

<style lang="css">
  .grid {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: flex;
    flex-direction: column;
    border: 1px solid #ccc;
  }
  .row {
    display: flex;
  }
  .row::after {
    content: '';
    display: block;
    clear: both;
  }
</style>
