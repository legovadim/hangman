import Vue from 'vue'

Vue.mixin({
  methods: {
    data () {
      return {
        letters: ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h',
          'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's',
          't', 'u', 'v', 'w', 'x', 'y', 'z']

      }
    },
    findLetter (letter) {
        // find all letters in word
      let letterPosition = this.allIndexOf(this.hiddenWord, letter)

      this.$refs['letter_' + letter].color = 'warn'

        // remember what we click
      this.clickedLetters.push(letter)

        // check if we have this letter
      if (letterPosition.length > 0) {
          // find ALL same letters
        for (let i = 0; i < letterPosition.length; i++) {
            // add found letter
          this.foundLettersPositions.push(letterPosition)

          this.hiddenLetters = this.stringSplice(this.hiddenLetters, letterPosition[i], 1, letter)

          if (this.hiddenWord.length <= this.foundLettersPositions.length) { // Player Wins
            this.resetGame()
            this.gameResult = 'win'
            this.dialog = true
            console.log('WIN')
          }
        }
      } else { // Player Loses
        this.lifes--
        this.hangmanState++

        if (this.lifes === 0) {
          this.resetGame()
          this.gameResult = 'lose'
          this.dialog = true
          console.log('LOSE')
        }
      }
    },
    generateHiddenWord () {
      this.hiddenLetters = ''
      for (let i = 0; i < this.hiddenWord.length; i++) {
        this.hiddenLetters += '_'
      }
    },

    resetGame () {
      this.hangmanState = 0
      this.lifes = 10
      this.clickedLetters = []
      this.foundLettersPositions = []
      this.generateHiddenWord()
    },

    checkLetter (letter) {
      if (this.clickedLetters.includes(letter)) { return '' } else { return 'info' }
    },

    checkLetterDisable (letter) {
      if (this.clickedLetters.includes(letter)) { return true } else { return false }
    }
  }
})
