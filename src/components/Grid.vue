<template lang="html">
  <div class="grid">
    <div class="score">{{ score }}</div>
    <div class="row" v-for="row in matrix">
      <cell v-for="val in row" :value="val"></cell>
    </div>
  </div>
</template>

<script>
import Cell from './Cell'

export default {
  name: 'grid',
  props: {
    matrix: {
      type: Array,
      required: true
    },
    score: Number
  },
  components: {
    Cell
  }
}
</script>

<style lang="css" scoped>
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
