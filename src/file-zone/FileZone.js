import React from 'react'
import './FileZone.css'
import FormattedWord from "../formatted-word/FormattedWord";

function FileZone(props) {
  const formattedText =  props.words.map((word, index) => {
    let separator = ' '
    if (index === props.words.length - 1) {
        separator = ''
    }
    return <FormattedWord
      key={index}
      word={word}
      separator={separator}
      {...props}
      index={index}/>
  })
        
  return (
    <div id="file-zone">
      <div id="file">
        {formattedText}
      </div>
    </div>
  )
}

export default FileZone
