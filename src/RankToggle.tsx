import { Toggle, ToggleOption } from './components/Toggle'
import { STAT_KEY } from './constants'
import { StatKey } from './utils/types'

export const RankToggle = ({
  statList,
  setStatList,
}: {
  statList: StatKey[]
  setStatList: React.Dispatch<React.SetStateAction<StatKey[]>>
}) => {
  const isFull = statList.length === 3

  const handleValueChange = (value: StatKey[]) => {
    if (!value) {
      return
    }
    setStatList(value)
  }

  const isSelected = (val: StatKey) => statList.includes(val)

  return (
    <Toggle
      type={'multiple'}
      value={statList}
      onValueChange={(value) => handleValueChange(value as StatKey[])}
    >
      {STAT_KEY.map((key) => (
        <ToggleOption
          key={key}
          value={key}
          disabled={isFull && !isSelected(key)}
        >
          {key}
        </ToggleOption>
      ))}
    </Toggle>
  )
}
