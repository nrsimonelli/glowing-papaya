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
      <div className='AppTitle'>
        <h1>
          Engage <span className='GradientText'>Plus</span>
        </h1>
        <Mode mode={mode} setMode={setMode} />
      </div>
      <h3 className='SubHeading'>
        Data, tools, and visuals to help you get the most out of{' '}
        <span className='GradientText'>Fire Emblem Engage</span>.
      </h3>
      <div className='PromptText'>
        {mode === 'Overview' && (
          <>
            <h3>Character Overview</h3>
            <p>
              In order to get started, select a class and up to three different
              stats.
            </p>
            <p>
              Each character and class in Engage come with their own{' '}
              <span className={'GradientText'}>growth rates</span>. When you
              combine these together you start to get a feel for a character's
              potential in a given class.
            </p>
          </>
        )}
        {mode === 'Favorites' && (
          <>
            <h3>Favorited Unit List</h3>
            <p>
              Add to your list by using the input fields below or by clicking on
              a character while on the Overview tab.
            </p>
            <p>
              A character's class in Engage, combined with slight personal
              modifiers, determines their{' '}
              <span className={'GradientText'}>maximum stats</span>. In addition
              to growth rate, these are important to consider when evaluating
              the potential of a given character.
            </p>
          </>
        )}
        {mode === 'Planner' && (
          <>
            <h3>Team Planner</h3>
            <p>
              Using the filters and sliders below, you may compare units against
              one another across varying levels of experience.
            </p>
            <p>
              To fully evaluate a character you will want to consider their{' '}
              <span className={'GradientText'}>personal base stats</span>. These
              are found, and displayed below, by looking at a character's stats
              before adding class bonuses.
            </p>
          </>
        )}
      </div>
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
