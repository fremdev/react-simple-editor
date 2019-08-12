import React, { useEffect, useState, useRef } from "react"
import Synonyms from '../synonyms/Synonyms'
import './FormattedWord.css'

function FormattedWord(props) {
  const node = useRef()

  const [open, setOpen] = useState(false)

  const handleClickOutside = e => {
    if (node.current.contains(e.target)) {
      return
    }
    setOpen(false)
  }

  const handleSelect = () => {
    props.selectWord({index: props.index, word: props.word.text})
    setOpen(true)
  }

  const handleReplace = (v) => {
    props.replaceWord(v)
    setOpen(false)
  }

  useEffect(() => {
    if (open) {
      document.addEventListener("mousedown", handleClickOutside)
    } else {
      document.removeEventListener("mousedown", handleClickOutside)
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [open])

  const getStyles = () => {
    const { format } = props.word
    const styles = {}
    if (format.bold) {
      styles.fontWeight = 'bold'
    }
    if (format.underline) {
      styles.textDecoration = 'underline'
    }
    if (format.italic) {
      styles.fontStyle = 'italic'
    }
    if (format.color) {
      styles.color = format.color
    }
    return styles
  }

  return (
    <span ref={node} className="formatted-word">
      <span
        className="word-wrap"
        style={getStyles()}
        onDoubleClick={handleSelect}>{props.word.text}{props.separator}
        </span>
      {open ? <Synonyms synonyms={props.synonyms} loading={props.loading} replaceWord={handleReplace} /> : ''}
    </span>
  )
}

export default FormattedWord