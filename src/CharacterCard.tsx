import { CrossCircledIcon } from '@radix-ui/react-icons'
import { Image } from './Image'
import { STAT_KEY, UNIT_GROWTH } from './constants'
import { CharacterDetail, MinMaxObj } from './utils/types'

export const CharacterCard = ({
  character,
  handleDelete,
  minMax,
}: {
  character: CharacterDetail
  handleDelete: (arg: string) => void
  minMax: MinMaxObj
}) => {
  const { ID, UNIT, JOB } = character

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

  return (
    <div className='card-root'>
      <div className='card-image'>
        <Image className='square' name={UNIT} />
      </div>
      <div className='card-detail'>
        <div className='detail-row'>
          <div className='detail-class'>{JOB}</div>
          <div className='delete' onClick={() => handleDelete(ID)}>
            <CrossCircledIcon className='cross-icon' />
          </div>
        </div>
        {STAT_KEY.map((stat) => (
          <div key={stat} className='detail-row'>
            <span className='row-name'>{stat}: </span>
            <span
              className={`${getStatColor(
                character[stat],
                minMax[stat]
              )} row-value`}
            >
              {character[stat]}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
