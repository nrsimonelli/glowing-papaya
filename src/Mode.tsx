import { Toggle, ToggleOption } from './components/Toggle'

export const Mode = ({
  mode,
  setMode,
}: {
  mode: 'Overview' | 'Favorites' | 'Planner'
  setMode: React.Dispatch<
    React.SetStateAction<'Overview' | 'Favorites' | 'Planner'>
  >
}) => {
  const options = ['Overview', 'Favorites', 'Planner']
  return (
    <Toggle
      type={'single'}
      defaultValue={mode}
      onValueChange={(value: 'Overview' | 'Favorites' | 'Planner') => {
        if (value) setMode(value)
      }}
    >
      {options.map((option) => (
        <ToggleOption
          key={option}
          value={option}
          data-state={mode === option ? 'on' : 'off'}
        >
          {option}
        </ToggleOption>
      ))}
    </Toggle>
  )
}
