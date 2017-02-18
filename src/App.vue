<template>
  <div id="app">
    <div class="center">
      <overlay v-show="overlay.display" :message="overlay.message" :display-restart="gameOver"></overlay>
      <grid :matrix="matrix"></grid>
    </div>
  </div>
</template>

<script>
import Grid from './components/Grid'
import Overlay from './components/Overlay'

const START_MESSAGES = [
  {
    message: 'ready',
    duration: 700
  },
  {
    message: 'set',
    duration: 700
  },
  {
    message: 'go!',
    duration: 300
  }
]

const DIR_VECTORS = [
  [-1,  0],
  [ 0,  1],
  [ 1,  0],
  [ 0, -1]
]

export default {
  name: 'app',
  components: {
    Grid, Overlay
  },
  data () {
    return {
      gridDimensions: [24, 24], // odd values may result in a blurry grid (because of transform(-50%, -50%))
      snake: [
        [1, 0],
        [1, 1]
      ],
      direction: 1, // id of DIR_VECTORS
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
      gameOver: false,
      overlay: {
        message: 'ready',
        display: true
      }
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
      if (e.keyCode === 32) { // Space
        this.restartGame()
        return
      }
      if (this.directionChanged) return
      let newDirection = -1
      switch (e.keyCode) {
        case 38: // up arrow
        case 87: // W
          newDirection = 0
          break
        case 39: // right arrow
        case 68: // D
          newDirection = 1
          break
        case 40: // down arrow
        case 83: // S
          newDirection = 2
          break
        case 37: // left arrow
        case 65: // A
          newDirection = 3
          break
      }
      if (newDirection !== this.direction && !this.isOppositeDirection(newDirection)) {
        this.direction = newDirection
        this.directionChanged = true
      }
    },
    isOppositeDirection (dir) {
      return (this.direction + dir) % 2 === 0
    },
    moveSnake () {
      const head = this.snake[this.snake.length - 1]
      const directionVector = DIR_VECTORS[this.direction]
      const nextHead = [
        head[0] + directionVector[0],
        head[1] + directionVector[1]
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
      const newTreat = [-1, -1]
      while (!this.onGrid(newTreat)
          || this.isSnake(newTreat)
          || this.isTreat(newTreat))
      {
        newTreat[0] = Math.floor(Math.random() * rows)
        newTreat[1] = Math.floor(Math.random() * cols)
      }
      this.treat = newTreat
    },
    restartGame () {
      if (!this.gameOver) return
      this.snake = [[1, 0], [1, 1]]
      this.direction = 1
      this.startGame()
    },
    startGame () {
      this.gameOver = false
      this.placeTreat()
      let timeSum = 0
      START_MESSAGES.forEach(msg => {
        setTimeout(() => {
          this.overlay.message = msg.message
        }, timeSum)
        timeSum += msg.duration
      })
      setTimeout(() => {
        this.overlay.display = false
        this._cycle = setInterval(this.moveSnake, 1000 / this.cellsPerSecond)
      }, timeSum)
    },
    stopGame () {
      this.gameOver = true
      this.overlay.message = `score: ${this.snake.length - 2}`
      this.overlay.display = true
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
  .center {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
  body {
    background: #ccc;
  }
</style>
