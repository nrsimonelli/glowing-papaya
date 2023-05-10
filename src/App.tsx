import { useState } from 'react'
import './App.css'
import { Mode } from './Mode'

import { RankOverview } from './RankOverivew'
import { FavoriteList } from './FavoriteList'
import { CharacterDetail, UnitName } from './utils/types'
import { Slider } from './components/Slider'
import { Image } from './components/Image'
import { AlphaSlider } from './AlphaSlider'
import { TeamPlanner } from './TeamPlanner'

export const App = () => {
  const [mode, setMode] = useState<'Overview' | 'Favorites' | 'Planner'>(
    'Planner'
  )
  const [characterList, setCharacterList] = useState<CharacterDetail[]>([])
  const isOverview = mode === 'Overview'
  const testNames: UnitName[] = ['VEYLE', 'JADE']

  return (
    <div>
      {/* Heading */}
      <h1>
        Fire Emblem <span className='gradient-text'>Engage</span>
      </h1>
      <h3>Choose what you would like to compare below</h3>
      {/* Toggle here */}
      <Mode mode={mode} setMode={setMode} />
      <p className='prompt-text'>
        {isOverview
          ? 'Select up to three stats to rank units'
          : 'Select your option and click Add'}
      </p>
      {/* SECTION */}
      <FavoriteList
        mode={mode}
        characterList={characterList}
        setCharacterList={setCharacterList}
      />
      <RankOverview
        mode={mode}
        characterList={characterList}
        setCharacterList={setCharacterList}
      />
      <TeamPlanner mode={mode} />
    </div>
  )
}
