<template>
  <v-container fluid grid-list-md text-xs-center>
    <section>
        <v-layout row wrap class="gameArea">
          <v-flex xs12 class="headline"> Use the letters below to guess the hidden word! </v-flex>
          <v-flex xs12> <v-btn small :color="checkLetter(letter)" :disabled="checkLetterDisable(letter)" v-for="(letter, i) in letters" :key="i" :ref="'letter_'+letter" @click=" () => findLetter(letter)">{{letter}}</v-btn> </v-flex>
          <v-flex xs12>
            <div class="display-1 hiddenWord">
              {{ hiddenLetters }}
            </div>
          </v-flex>
          <v-flex xs12>
            <div class="title hiddenWord">
              Your lifes: {{ lifes }}
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
      gameType: 'pvc',
      dialog: false,
      gameResultTitle: {
        'win': 'You won the game',
        'lose': 'You lost the game'
      },
      gameResultBody: {
        'win': 'You are clever!',
        'lose': 'Don`t cry and try again'
      }

    }
  },
  methods: {

  },
  beforeMount () {
    // fill the hidden word with spaces
    this.generateHiddenWord()
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
</style>
