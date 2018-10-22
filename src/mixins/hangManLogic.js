import Vue from 'vue'

Vue.mixin({
  data () {
    return {
      letters: ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h',
        'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's',
        't', 'u', 'v', 'w', 'x', 'y', 'z'],
      hiddenWordList: ['knowledgeable', 'license', 'lush', 'move', 'squealing', 'flimsy', 'vengeful', 'science', 'reward', 'pickle', 'terrific', 'hot']

    }
  },
  computed: {
    hangmanStateMargin () {
      return (-548 * (this.hangmanState < 10 ? this.hangmanState : 9)) + 'px'
    }
  },
  methods: {
    findLetter (letter) {
        // find all letters in word
      let letterPosition = this.allIndexOf(this.hiddenWord, letter)

      if (this.gameType === 'pvc') this.$refs['letter_' + letter].color = 'warn'

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
            this.gameResult = 'win'
            this.dialog = true
            console.log('WIN')
          }
        }
      } else { // Player Loses
        this.lifes--
        this.hangmanState++

        if (this.lifes === 0) {
          this.gameResult = 'lose'
          this.dialog = true
          console.log('LOSE')
        }
      }
    },
    generateHiddenWord () {
      if (this.gameType === 'pvc') this.hiddenWord = this.hiddenWordList[Math.floor(Math.random() * this.hiddenWordList.length) + 0]
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
      this.gameResult = ''
      this.generateHiddenWord()
      this.dialog = false
    },

    checkLetter (letter) {
      if (this.clickedLetters.includes(letter)) { return '' } else { return 'info' }
    },

    checkLetterDisable (letter) {
      if (this.clickedLetters.includes(letter)) { return true } else { return false }
    }
  }
})
