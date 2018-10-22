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
              {{hangmanStateMargin}}
              <img src="@/assets/hangman.png" v-bind:style="{ 'margin-left': hangmanStateMargin}" alt="HangMan" class="mb-5">
            </div>
          </v-flex>
        </v-layout>

        <v-dialog
          v-model="dialog"
          width="500"
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
                @click="dialog = false"
              >
                Try Again
              </v-btn>
            </v-card-actions>
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
      letters: ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h',
        'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's',
        't', 'u', 'v', 'w', 'x', 'y', 'z'],
      clickedLetters: [],
      hiddenLetters: '',
      hiddenWord: 'questiiton',
      foundLettersPositions: [],
      lifes: 10,
      hangmanState: 0,
      dialog: false,
      gameResultTitle: {
        'win': 'You won the game',
        'lose': 'You lost the game'
      },
      gameResultBody: {
        'win': 'You are clever!',
        'lose': 'Don`t cry and try again'
      },
      gameResult: 'win'

    }
  },
  methods: {

  },
  computed: {
    hangmanStateMargin () {
      return (-548 * this.hangmanState) + 'px'
    }
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
