<template>
  <v-container fluid grid-list-md text-xs-center>
    <section>
        <v-layout row wrap class="gameArea">
          <v-flex xs12 class="headline"> Computer is gonna play vs you! Enter the word! (He closed the eyes) </v-flex>
        <v-flex xs12>
          <v-text-field
            label="a-Z letters"
            outline
            class="wordInput"
            v-model="usersWord"
          ></v-text-field>
          <v-btn color="info" @click="startTheGame()">Start the Game</v-btn>
        </v-flex>
          <v-flex xs12>
            <div class="display-1 hiddenWord">
              {{ hiddenLetters }}
            </div>
          </v-flex>
          <v-flex xs12>
            <div class="title hiddenWord">
              Computer's lifes: {{ lifes }}
            </div>
          </v-flex>
          <v-flex xs12>
            <div class="imageFrame">
              <img src="@/assets/hangman.png" v-bind:style="{ 'margin-left': hangmanStateMargin}" alt="HangMan" class="mb-5">
            </div>
          </v-flex>
        </v-layout>

        <v-dialog
          v-model="dialog"
          width="500"
          persistent 
        >
          <v-card>
            <v-card-title
              class="headline grey lighten-2"
              primary-title
            >
              {{gameResultTitle[gameResult]}}
            </v-card-title>

            <v-card-text>
              {{gameResultBody[gameResult]}}
            </v-card-text>

            <v-divider></v-divider>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                color="primary"
                flat
                @click="resetGame()"
              >
                Try Again
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <v-dialog v-model="loadingDialog" persistent max-width="100">
          <v-card class="overflow-hidden">
            <v-card-text>
                <v-progress-circular indeterminate :size="70" :width="7" color="primary"></v-progress-circular>
            </v-card-text>
          </v-card>
        </v-dialog>
    </section>
  </v-container>
</template>

<script>
import './../mixins/hangManLogic'

export default {
  data () {
    return {
      gameType: 'cvp',
      dialog: false,
      gameResultTitle: {
        'win': 'Computer won the game',
        'lose': 'Computer lost your game'
      },
      gameResultBody: {
        'win': 'Try again!',
        'lose': 'It was hard word'
      },
      checkWolfram: false

    }
  },
  methods: {
    startTheGame () {
      if (this.usersWord.length > 0) {
        this.usersWord = this.usersWord.toLowerCase()
        this.checkWolfram = false
        this.hiddenWord = this.usersWord
        this.generateHiddenWord()
        this.computerPlaying()
      } else { alert('Enter the world please') }
    },
    async computerPlaying () {
        // play untill result
      while (this.gameResult === '') {
        await this.makeTurn()
      }
    },
    async makeTurn () {
      let randomLetter = this.letters[Math.floor(Math.random() * 25) + 0]

      // Dont use the same letters
      while (this.checkLetter(randomLetter) === '') {
        randomLetter = this.letters[Math.floor(Math.random() * 25) + 0]
      }

      if ((this.foundLettersPositions.length + 2) < this.hiddenWord.length || this.checkWolfram === true) {
        this.findLetter(randomLetter)
      } else {
        this.checkWolfram = true
        this.loadingDialog = true
        await this.fetchWolframApi(this.hiddenWord)
      }

      return new Promise(resolve => {
        setTimeout(() => {
          resolve(true)
        }, 400)
      })
    }

  },
  beforeMount () {
    // fill the hidden word with spaces
    // this.generateHiddenWord()
  }
}
</script>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1,
h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}

.hiddenWord{
  letter-spacing: 20px !important;
}

.gameArea > div{
  margin-top: 20px !important;
}

.imageFrame {
    width: 548px;
    height: 406px;
    overflow: hidden;
    margin: 0 auto;
}

.wordInput {
    width: 250px;
    margin: 0 auto;
}

</style>
