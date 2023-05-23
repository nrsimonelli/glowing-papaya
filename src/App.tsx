import './App.css'
import { Mode } from './Mode'
import { RankOverview } from './RankOverivew'
import { FavoriteList } from './FavoriteList'
import { CharacterDetail } from './utils/types'
import { TeamPlanner } from './TeamPlanner'
import { useLocalStorage } from './utils/useLocalStorage'
import { Viewport } from '@radix-ui/react-toast'

export const App = () => {
  const [mode, setMode] = useLocalStorage<'Overview' | 'Favorites' | 'Planner'>(
    'mode',
    'Overview'
  )
  const [characterList, setCharacterList] = useLocalStorage<CharacterDetail[]>(
    'characterList',
    []
  )

  return (
    <div className='AppRoot'>
      <h1>
        Fire Emblem <span className='GradientText'>Engage</span>
      </h1>
      <h3>Custom tools to help you make the most of your Engage experience</h3>
      <Mode mode={mode} setMode={setMode} />
      <p className='PromptText'>
        {mode === 'Overview' && (
          <span>
            Check out a ranked list of the cast by combined{' '}
            <span className={'GradientText'}>growth rates.</span> Get started by
            selecting a particular class and up to three stats.
          </span>
        )}
        {mode === 'Favorites' && (
          <span>
            View your Favorites! See growth rates as well as the{' '}
            <span className={'GradientText'}>maximum stats </span>
            for each of your selected characters. Add to your list by using the
            fields below.
          </span>
        )}
        {/* {mode === 'Planner' && (
          <span>
            Get a look into each character and their{' '}
            <span className={'GradientText'}>personal base stats</span> over
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
      <Viewport className='ToastViewport' />
      <div className='FooterRoot'></div>
    </div>
  )
}
