<template>
  <div id="app">
    <div v-if="!gameRunning">you lost!</div>
    <div>score: {{ snake.length - 2 }}</div>
    <grid :matrix="matrix"></grid>
  </div>
</template>

<script>
import Grid from './components/Grid'

const    UP_VECTOR = [-1,  0],
      RIGHT_VECTOR = [ 0,  1],
       DOWN_VECTOR = [ 1,  0],
       LEFT_VECTOR = [ 0, -1]

export default {
  name: 'app',
  components: {
    Grid
  },
  data () {
    return {
      gridDimensions: [24, 24], // odd values may result in a blurry grid (because of transform(-50%, -50%))
      snake: [
        [1, 0],
        [1, 1]
      ],
      directionVector: [0, 1],
      cellsPerSecond: 10, // snake speed
      directionChanged: false, // allow only one direction change per cycle
      /*
        this is needed to prevent self collision,
        when user changes direction two or more times per cycle,
        which possibly results in a direction opposite of current one

        in addition, this makes snake movement more intuitive,
        as a valid keypress (not of opposite direction) always results
        in a direction change of the snake
      */
      treat: [0, 0],
      gameRunning: true
    }
  },
  computed: {
    matrix: function () {
      const rows = this.gridDimensions[0]
      const cols = this.gridDimensions[1]
      const matrix = Array(rows).fill(0).map(row => Array(cols).fill(0))
      this.snake.forEach(coord => {
        matrix[coord[0]][coord[1]] = 1
      })
      const [ treatRow, treatCol ] = this.treat
      matrix[treatRow][treatCol] = 2
      return matrix
    }
  },
  mounted: function () {
    window.addEventListener('keydown', this.handleKeydown)
    this.startGame()
  },
  methods: {
    handleKeydown (e) {
      if (this.directionChanged) return
      switch (e.keyCode) {
        case 87: // W
          if (!this.isOppositeDirection(UP_VECTOR)) this.directionVector = UP_VECTOR
          break
        case 68: // D
          if (!this.isOppositeDirection(RIGHT_VECTOR)) this.directionVector = RIGHT_VECTOR
          break
        case 83: // S
          if (!this.isOppositeDirection(DOWN_VECTOR)) this.directionVector = DOWN_VECTOR
          break
        case 65: // A
          if (!this.isOppositeDirection(LEFT_VECTOR)) this.directionVector = LEFT_VECTOR
          break
      }
      this.directionChanged = true
    },
    isOppositeDirection (dir) {
      const dir2 = this.directionVector
      return (dir[0] + dir2[0]) === 0 &&
             (dir[1] + dir2[1]) === 0
    },
    moveSnake () {
      const head = this.snake[this.snake.length - 1]
      const nextHead = [
        head[0] + this.directionVector[0],
        head[1] + this.directionVector[1]
      ]
      if (this.onGrid(nextHead) && !this.isSnake(nextHead)) {
        this.snake.push(nextHead)
        if (this.isTreat(nextHead)) {
          this.placeTreat()
        }
        else {
          this.snake.shift()
        }
      }
      else {
        this.stopGame()
      }
      this.directionChanged = false
    },
    isSnake (coord) {
      return this.matrix[coord[0]][coord[1]] === 1
    },
    isTreat (coord) {
      return coord[0] === this.treat[0] &&
             coord[1] === this.treat[1]
    },
    placeTreat () {
      const rows = this.gridDimensions[0],
            cols = this.gridDimensions[1]
      const treat = [-1, -1],
            lastTreat = this.treat
      while (!this.onGrid(treat)
          || this.matrix[treat[0]][treat[1]] === 1
          || (treat[0] === lastTreat[0] && treat[1] === lastTreat[1]))
      {
        treat[0] = Math.floor(Math.random() * rows)
        treat[1] = Math.floor(Math.random() * cols)
      }
      this.treat = treat
    },
    startGame () {
      this.gameRunning = true
      this._cycle = setInterval(this.moveSnake, 1000 / this.cellsPerSecond)
      this.placeTreat()
    },
    stopGame () {
      this.gameRunning = false
      clearInterval(this._cycle)
    },
    onGrid (coord) {
      const r = coord[0],
            c = coord[1]
      return r >= 0 && r < this.gridDimensions[0] &&
             c >= 0 && c < this.gridDimensions[1]
    }
  }
}
</script>

<style>
  body {
    background: #ccc;
    font-family: monospace;
  }
</style>
