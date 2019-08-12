import React, { useState, useEffect } from 'react'
import './App.css'
import ControlPanel from "./control-panel/ControlPanel"
import FileZone from "./file-zone/FileZone"
import getMockText from './text.service'
import synonymsApi from './api/synonyms'

function App() {
  const [words, setWords] = useState([])
  const [selectedIndex, setSelectedIndex] = useState(null)
  const [synonyms, setSynonyms] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    getMockText()
      .then(result => {
        const formattedWords = result.split(' ').map(word => {
          return {
            text: word,
            format: {}
          }
        })
        setWords(formattedWords)
      })
      .catch(err => {
        console.log(err)
      })
  }, [])

  const selectWord = (data) => {
    setSynonyms([])
    setLoading(true)
    const {index, word} = data
    setSelectedIndex(index)
    synonymsApi.fetchSynonyms(word)
      .then(synonyms => {
        setSynonyms(synonyms)
        setLoading(false)
      })
  }

  const formatWord = ({mode, data}) => {
    const formattedWords = words.map((word, index) => {
      const modesWithData = ['color']
      if (index !== selectedIndex) {
        return word
      } else {
        const format = {...word.format}
        if (modesWithData.includes(mode)) {
          format[mode] = data
        } else {
          format[mode] = !format[mode]
        }
        return {...word, format}
      }
    })
    setWords(formattedWords)
  }

  const replaceWord = (synonym) => {
    const updatedWords = words.map((word, index) => {
      if (index !== selectedIndex) {
        return word
      } else {
        return {...word, text: synonym}
      }
    })
    setWords(updatedWords)
    setSynonyms([])
  }

  const currenFormat = selectedIndex ? words[selectedIndex].format : null

  return (
    <div className="App">
      <header>
        <span>Simple Text Editor</span>
      </header>
      <main>
        <ControlPanel
          selected={selectedIndex}
          format={currenFormat}
          formatWord={formatWord}/>
        <FileZone
          words={words}
          selected={selectedIndex}
          synonyms={synonyms}
          loading={loading}
          selectWord={selectWord}
          replaceWord={replaceWord}/>
      </main>
    </div>
  )
}

export default App
