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
  return (
    <Toggle
      type={'single'}
      defaultValue={mode}
      onValueChange={(value: 'Overview' | 'Favorites' | 'Planner') => {
        if (value) setMode(value)
      }}
    >
      <ToggleOption value={'Overview'}>Overview</ToggleOption>
      <ToggleOption value={'Favorites'}>Favorites</ToggleOption>
      <ToggleOption value={'Planner'}>Planner</ToggleOption>
    </Toggle>
  )
}
