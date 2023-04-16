import { Toggle, ToggleOption } from './components/Toggle'

export const Mode = ({
  mode,
  setMode,
}: {
  mode: 'Overview' | 'Favorites'
  setMode: React.Dispatch<React.SetStateAction<'Overview' | 'Favorites'>>
}) => {
  return (
    <Toggle
      type={'single'}
      defaultValue={mode}
      onValueChange={(value: 'Overview' | 'Favorites') => {
        if (value) setMode(value)
      }}
    >
      <ToggleOption value={'Overview'}>Overview</ToggleOption>
      <ToggleOption value={'Favorites'}>Favorites</ToggleOption>
    </Toggle>
  )
}
