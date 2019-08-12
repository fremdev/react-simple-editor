import React from 'react'
import './Synonyms.css'

function Synonyms(props) {
  const synonymsList = props.synonyms.map(synonym => {
    return <li key={synonym} onClick={() => props.replaceWord(synonym)}>{synonym}</li>
  })
  const content = () => {
    if (props.loading) {
      return <p>Loading...</p>
    }
    if (!synonymsList.length) {
      return <p>Not found :(</p>
    }
    return synonymsList
  }
  return (
    <div className="synonyms-popup">
      <h5 className="synonyms-title">Synonyms:</h5>
      {content()}
    </div>
  )
}

export default Synonyms