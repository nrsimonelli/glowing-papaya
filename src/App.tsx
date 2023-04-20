import { useState } from 'react'
import './App.css'
import { Mode } from './Mode'

import { RankOverview } from './RankOverivew'
import { FavoriteList } from './FavoriteList'
import { CharacterDetail } from './utils/types'

export const App = () => {
  const [mode, setMode] = useState<'Overview' | 'Favorites'>('Overview')
  const [characterList, setCharacterList] = useState<CharacterDetail[]>([])
  const isOverview = mode === 'Overview'

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
    </div>
  )
}
