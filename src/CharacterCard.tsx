import { TrashIcon } from '@radix-ui/react-icons'
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
    <div className='CardRoot'>
      <div className='CardImage'>
        <Image className='square' name={UNIT} />
      </div>
      <div className='delete' onClick={() => handleDelete(ID)}>
        <TrashIcon className='DeleteIcon' />
      </div>
      <div className='CardDetail'>
        <div className='DetailRow'>
          <div className='DetailClass'>{getDisplayName(JOB)}</div>
        </div>
        {STAT_KEY.map((stat) => (
          <div key={stat} className='DetailRow'>
            <span className='RowName'>{stat}: </span>
            <div className='RowBar'>
              <span
                className='BarBg'
                style={{ width: `${getBarWidth(stat)}%` }}
              >
                <span
                  className={`${getStatColor(
                    GROWTH[stat],
                    minMax[stat]
                  )} RowValue`}
                >
                  {GROWTH[stat]}%
                </span>
              </span>
              <span className={`BarFill ${getValueColor(stat)}`}>
                {CAP[stat]}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
