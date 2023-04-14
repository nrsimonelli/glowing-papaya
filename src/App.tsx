import { useState } from 'react'
import './App.css'
import { Mode } from './Mode'
import { SelectUnit } from './SelectUnit'
import { SelectJob } from './SelectJob'
import { UnitName, JobName, CharacterDetail } from './utils'

export const App = () => {
  const [mode, setMode] = useState<'Overview' | 'Compare'>('Overview')
  const [characterList, setCharacterList] = useState<CharacterDetail[]>([])
  const [selectedUnit, setSelectedUnit] = useState('default')
  const [selectedJob, setSelectedJob] = useState('default')

  const isOverview = mode === 'Overview'

  const handleAdd = () => {
    //placeholder
  }
  const handleClear = () => {
    //placeholder
  }

  return (
    <div>
      {/* Heading */}
      <h1>Fire Emblem Engage</h1>
      <h3>Choose what you would like to compare below</h3>
      {/* Toggle here */}
      {JSON.stringify(selectedUnit)}
      <Mode mode={mode} setMode={setMode} />
      {/* Overall ranking actions... */}
      {/* end ranking options */}
      {/* Comparison actions */}
      <p className='prompt-text'>
        {isOverview
          ? 'Select stats for rankings'
          : 'Select your option and click Add'}
      </p>
      <div className='option-row'>
        <SelectUnit value={selectedUnit} onValueChange={setSelectedUnit} />
        <SelectJob
          value={selectedJob}
          onValueChange={setSelectedJob}
          selectedUnit={selectedUnit}
        />
        <button className='add button' onClick={handleAdd}>
          Add
        </button>
        <button className='button' onClick={handleClear}>
          Clear
        </button>
      </div>
      {/* display overall rankings by stat(s)? */}
      <div></div>
      {/* end display rankings */}
      {/*
       */}
      {/*
       */}
      {/* display list of characters */}
      <div></div>
      {/* end display list */}
    </div>
  )
}
