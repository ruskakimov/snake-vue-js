<template>
  <div id="app">
    <div class="center">
      <overlay v-show="!gameRunning">
        <keep-alive>
          <component
            :is="overlay.currentView"
            :score="score"
            v-model="userName"
          ></component>
        </keep-alive>
      </overlay>
      <grid :matrix="matrix" :score="score"></grid>
    </div>
  </div>
</template>

<script>
import Grid from './components/Grid'
import Overlay from './components/Overlay'
import StartScreen from './components/StartScreen'
import SubmitScoreScreen from './components/SubmitScoreScreen'
import LeaderboardScreen from './components/LeaderboardScreen'
import { scoreboard } from './db'

const DIR_VECTORS = [
  [-1,  0],
  [ 0,  1],
  [ 1,  0],
  [ 0, -1]
]

const SNAKE_SPEED = 10 // cells per second

export default {
  name: 'app',
  components: {
    Grid, Overlay, LeaderboardScreen, SubmitScoreScreen, StartScreen
  },
  data () {
    return {
      userName: localStorage['userName'] || '',
      gridDimensions: [24, 24], // odd values may result in a blurry grid (because of transform(-50%, -50%))
      snake: [
        [1, 0],
        [1, 1]
      ],
      direction: 1, // id of DIR_VECTORS
      directionQueue: [],
      treat: [0, 0],
      gameRunning: false,
      overlay: {
        currentView: 'leaderboard-screen'
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
    },
    score: function () {
      return this.snake.length - 2
    }
  },
  mounted: function () {
    window.addEventListener('keydown', this.handleKeydown)
    this.overlay.currentView = 'start-screen'
  },
  methods: {
    handleKeydown (e) {
      if (this.gameRunning) {
        switch (e.keyCode) {
          case 38: // up arrow
          case 87: // W
            this.addDirection(0)
            break
          case 39: // right arrow
          case 68: // D
            this.addDirection(1)
            break
          case 40: // down arrow
          case 83: // S
            this.addDirection(2)
            break
          case 37: // left arrow
          case 65: // A
            this.addDirection(3)
            break
        }
      }
      else if (this.overlay.currentView === 'submit-score-screen') {
        switch (e.keyCode) {
          case 13: // enter
            this.submitScore()
            break
        }
      }
      else if (this.overlay.currentView === 'leaderboard-screen') {
        switch (e.keyCode) {
          case 32: // space
            this.restartGame()
            break
        }
      }
      else if (this.overlay.currentView === 'start-screen') {
        switch (e.keyCode) {
          case 13: // enter
            this.startGame()
            break
        }
      }
    },
    addDirection (newDirection) {
      if (!this.gameRunning) return
      const lastDirection = (this.directionQueue.length)
                            ? this.directionQueue.slice(-1)[0]
                            : this.direction
      if (newDirection !== lastDirection
        && !this.isOppositeDirection(newDirection, lastDirection))
      {
        this.directionQueue.push(newDirection)
      }
    },
    isOppositeDirection (dir1, dir2) {
      return (dir1 + dir2) % 2 === 0
    },
    moveSnake () {
      if (this.directionQueue.length) {
        this.direction = this.directionQueue.shift()
      }
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
        this.gameOver()
      }
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
    submitScore () {
      if (this.userName === '') return
      scoreboard.push({
        name: this.userName,
        score: this.score
      })
      this.overlay.currentView = 'leaderboard-screen'
    },
    restartGame () {
      this.resetGame()
      this.startGame()
    },
    resetGame () {
      this.snake = [[1, 0], [1, 1]]
      this.direction = 1
      this.directionQueue = []
    },
    startGame () {
      this.placeTreat()
      this.gameRunning = true
      this._cycle = setInterval(this.moveSnake, 1000 / SNAKE_SPEED)
    },
    gameOver () {
      this.gameRunning = false
      clearInterval(this._cycle)
      this.overlay.currentView = 'submit-score-screen'
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
