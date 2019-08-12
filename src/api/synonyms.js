export default {
  fetchSynonyms(word) {
    return fetch(`https://api.datamuse.com/words?ml=${word}`)
      .then(response => response.json())
      .then(words => words.slice(0, 10).map(entry => entry.word))
  }
}
