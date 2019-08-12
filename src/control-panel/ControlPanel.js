import React, { useState } from 'react'
import { GithubPicker } from 'react-color'
import './ControlPanel.css'

function ControlPanel(props) {
    const [isPicker, setPicker] = useState(false)

    const getClassNames = (action) => {
        const { format } = props
        if (!format) {
            return 'format-action'
        }
        if (format[action]) {
            return 'format-action active'
        }
        return 'format-action'
    }
    const getCurrentColor = () => {
        const defaultColor = '#333'
        if (!props.format) { return defaultColor }
        return props.format.color || defaultColor
    }
    const handleChangeColor = (v) => {
        setPicker(false)
        props.formatWord({mode: 'color', data: v.hex})
    }
    const togglePicker = () => {
        setPicker(!isPicker)
    }
    return (
        <div id="control-panel">
            <div id="format-actions">
                <button
                    onClick={() => props.formatWord({mode: 'bold'})}
                    disabled={!props.selected}
                    className={getClassNames('bold')}
                    type="button">
                        <b>B</b>
                </button>
                <button
                    onClick={() => props.formatWord({mode: 'italic'})}
                    disabled={!props.selected}
                    className={getClassNames('italic')}
                    type="button">
                        <i>I</i>
                </button>
                <button
                    onClick={() => props.formatWord({mode: 'underline'})}
                    disabled={!props.selected}
                    className={getClassNames('underline')}
                    type="button">
                        <u>U</u>
                </button>
                <button
                    style={{background: getCurrentColor()}}
                    onClick={togglePicker}
                    disabled={!props.selected}
                    className="format-action color"
                    type="button">
                    { isPicker ? <GithubPicker
                        className="picker"
                        onChangeComplete={handleChangeColor}
                    /> : '' }
                </button>
            </div>
        </div>
    )
}

export default ControlPanel
