import { useState } from 'react'
import './App.css'
import { Mode } from './Mode'
import { SelectUnit } from './SelectUnit'

export const App = () => {
  const [mode, setMode] = useState<'Overview' | 'Compare'>('Overview')
  const [characterList, setCharacterList] = useState([])
  const [selectedUnit, setSelectedUnit] = useState([])
  const [selectedJob, setSelectedJob] = useState([])

  return (
    <div>
      {/* Heading */}
      <h1>Fire Emblem Engage</h1>
      <h3>Choose what you would like to compare below</h3>
      {/* Toggle here */}
      <Mode mode={mode} setMode={setMode} />
      {/* Overall ranking actions... */}
      {/* Comparison actions */}
      <p className='prompt-text'>Select your option and click Add</p>
      <div className='option-row'>
        {/* Input fields here here */}
        <SelectUnit />
        <SelectJob />
        <button className='add button'>Add</button>
        <button className='button'>Clear</button>
      </div>
    </div>
  )
}
