import Vue from 'vue'

Vue.mixin({
  data () {
    return {
      letters: ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h',
        'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's',
        't', 'u', 'v', 'w', 'x', 'y', 'z'],
      hiddenLetters: '',
      hiddenWord: '********',
      foundLettersPositions: [],
      lifes: 10,
      hangmanState: 0,
      clickedLetters: [],
      gameResult: '',
      usersWord: '',
      hiddenWordList: ['knowledgeable', 'license', 'lush', 'move', 'squealing', 'flimsy', 'vengeful', 'science', 'reward', 'pickle', 'terrific', 'hot'],
      requestWordUrl: 'https://random-word-api.herokuapp.com/word?number=1&key=',
      wolframUrl: 'https://api.wolframalpha.com/v2/query?appid=LXUQPT-82TT59J9EP&output=json&input=',
      loadingDialog: false,
      plaintext: 'a | i | t | c | h\nb | a | t | c | h\nb | o | t | c | h\nc | a | t | c | h\nc | u | t | c | h\nd | i | t | c | h\nd | u | t | c | h\nf | e | t | c | h\nf | i | t | c | h\nh | a | t | c | h\nh | i | t | c | h\nh | u | t | c | h\nk | e | t | c | h\nk | u | t | c | h\nl | a | t | c | h\nl | e | t | c | h\nm | a | t | c | h\nM | i | t | c | h\nn | a | t | c | h\nn | o | t | c | h\np | a | t | c | h\np | i | t | c | h\nr | a | t | c | h\nr | e | t | c | h\n⋮ | | | | \n(28 words)'

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
          this.foundLettersPositions.push(letterPosition[i])

          this.hiddenLetters = this.stringSplice(this.hiddenLetters, letterPosition[i], 1, letter)

          if (this.hiddenWord.length <= this.foundLettersPositions.length) { // Player Wins
            this.gameResult = 'win'
            this.dialog = true
          }
        }

        return true
      } else { // Player Loses
        this.lifes--
        this.hangmanState++

        if (this.lifes === 0) {
          this.gameResult = 'lose'
          this.dialog = true
        }

        return false
      }
    },
    async fetchWolframApi (hiddenWord) {
      return new Promise(resolve => {
        Vue.axios.get('https://cors-anywhere.herokuapp.com/' + this.wolframUrl + this.hiddenLetters).then((response) => {
          let targetLetter
          let array = response.data.queryresult.pods[1].subpods[0].plaintext.split('\n')
          let firstLetter = ''

          if (array.length > 0) {
            let wolframArray = []

              // clean response data
            for (let i = 0; i < array.length; i++) {
              wolframArray.push(array[i].match(/[A-Za-z0-9]+/g))
            }

            let sortedLettersPositions = this.foundLettersPositions.sort((a, b) => b - a)

                // check every returned array from wolframalpha
            for (let id = 0; id < wolframArray.length; id++) {
              let lettersToCheck = wolframArray[id]

                // filter letters we already know
              for (let i = 0; i < sortedLettersPositions.length; i++) {
                lettersToCheck = this.arraySplice(lettersToCheck, sortedLettersPositions[i])
              }

                // check left letters
              for (let i = 0; i < lettersToCheck.length; i++) {
                targetLetter = lettersToCheck[i].toLowerCase()

                // break if we found letter from request

                if (firstLetter !== targetLetter) {
                  // check that game is not over and that we didn't click that letter
                  if ((this.checkLetter(targetLetter) === '') || this.gameResult !== '') break
                  if (!this.findLetter(targetLetter)) break
                  if (i === 0) firstLetter = targetLetter
                }
              }

              if (this.gameResult !== '') break
            }
          }

          resolve(true)
          this.loadingDialog = false
        })
      })
    },
    fetchTheWord () {
      this.loadingDialog = true
      return new Promise(resolve => {
        Vue.axios.get(`${'https://cors-anywhere.herokuapp.com/'}https://random-word-api.herokuapp.com/key?`).then((response) => {
          Vue.axios.get(this.requestWordUrl + response.data + '&number=1').then((response) => {
            this.hiddenWord = response.data[0]
            resolve(true)
            this.loadingDialog = false
          })
        })
      })
    },
    async generateHiddenWord () {
      if (this.gameType === 'pvc') await this.fetchTheWord()
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
