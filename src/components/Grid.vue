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
    display: flex;
    flex-direction: column;
    border: 2px solid #333;
    z-index: 0;
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
