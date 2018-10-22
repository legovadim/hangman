import Vue from 'vue'

Vue.mixin({
  methods: {
    stringSplice (word, idx, rem, str) {
      return word.slice(0, idx) + str + word.slice(idx + Math.abs(rem))
    },
    allIndexOf (str, toSearch) {
      var indices = []
      for (var pos = str.indexOf(toSearch); pos !== -1; pos = str.indexOf(toSearch, pos + 1)) {
        indices.push(pos)
      }
      return indices
    }
  }
})
