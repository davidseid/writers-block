import React from 'react';

const Source = ({setSourceText}) => {
  return (
    <div>
      <div className="instruction">
        <h3>Source</h3>
      </div>
      <div className="text-box">
        <textarea 
          className="text-box" 
          placeholder="Put source material here" 
          cols="200" 
          rows="20"
          onChange={(e) => {setSourceText(e.target.value)}}
        >
        </textarea>
      </div>
    </div>

  )
}

export default Source;