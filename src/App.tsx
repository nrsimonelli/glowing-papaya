import { useState } from 'react'
import './App.css'
import { Mode } from './Mode'
import { RankOverview } from './RankOverivew'
import { FavoriteList } from './FavoriteList'
import { CharacterDetail } from './utils/types'
import { TeamPlanner } from './TeamPlanner'

export const App = () => {
  const [mode, setMode] = useState<'Overview' | 'Favorites' | 'Planner'>(
    'Overview'
  )
  const [characterList, setCharacterList] = useState<CharacterDetail[]>([])

  return (
    <div className='app-root'>
      <h1>
        Fire Emblem <span className='gradient-text'>Engage</span>
      </h1>
      <h3>Choose what you would like to compare below</h3>
      <Mode mode={mode} setMode={setMode} />
      <p className='prompt-text'>
        {mode === 'Overview' && (
          <span>
            Check out a ranked list of the cast by combined{' '}
            <span className={'gradient-text'}>growth rates.</span> Get started
            by selecting a particular class and up to three stats.
          </span>
        )}
        {mode === 'Favorites' && (
          <span>
            View your Favorites! See growth rates as well as the{' '}
            <span className={'gradient-text'}>maximum stats </span>
            for each of your selected characters. Add to your list by using the
            fields below.
          </span>
        )}
        {/* {mode === 'Planner' && (
          <span>
            Get a look into each character and their{' '}
            <span className={'gradient-text'}>personal base stats</span> over
            time. Use the filters and sliders below to get the most out of this
            page.
          </span>
        )} */}
      </p>
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
