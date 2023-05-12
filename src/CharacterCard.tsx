import { CrossCircledIcon } from '@radix-ui/react-icons'
import { Image } from './components/Image'
import { MAX_STAT, STAT_KEY } from './constants'
import { CharacterDetail, MinMaxObj, StatKey } from './utils/types'
import { getDisplayName } from './utils/getDisplayName'

export const CharacterCard = ({
  character,
  handleDelete,
  minMax,
}: {
  character: CharacterDetail
  handleDelete: (arg: string) => void
  minMax: MinMaxObj
}) => {
  const { ID, UNIT, JOB, GROWTH, CAP } = character

  const getStatColor = (
    value: number,
    current: { MIN: number; MAX: number }
  ) => {
    const { MIN, MAX } = current
    if (value >= MAX) {
      return 'positive'
    }
    if (value <= MIN) {
      return 'negative'
    }
    return 'neutral'
  }

  const getBarWidth = (stat: StatKey) => {
    return Math.floor((CAP[stat] / MAX_STAT[stat]) * 100)
  }

  const getValueColor = (stat: StatKey) => {
    const topPerformer = MAX_STAT[stat] - CAP[stat] <= 3
    // const bottomPerformer = (MIN CAP[stat])
    if (topPerformer) {
      return 'top'
    }
    return 'neutral'
  }

  return (
    <div className='card-root'>
      <div className='card-image'>
        <Image className='square' name={UNIT} />
      </div>
      <div className='card-detail'>
        <div className='detail-row'>
          <div className='detail-class'>{getDisplayName(JOB)}</div>
          <div className='delete' onClick={() => handleDelete(ID)}>
            <CrossCircledIcon className='cross-icon' />
          </div>
        </div>
        {STAT_KEY.map((stat) => (
          <div key={stat} className='detail-row'>
            <span className='row-name'>{stat}: </span>
            <div className='row-bar'>
              <span
                className='bar-bg'
                style={{ width: `${getBarWidth(stat)}%` }}
              >
                <span
                  className={`${getStatColor(
                    GROWTH[stat],
                    minMax[stat]
                  )} row-value`}
                >
                  {GROWTH[stat]}%
                </span>
              </span>
              <span className={`bar-fill ${getValueColor(stat)}`}>
                {CAP[stat]}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
