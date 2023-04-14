import { Toggle, ToggleOption } from './components/Toggle'

export const Mode = ({
  mode,
  setMode,
}: {
  mode: 'Overview' | 'Compare'
  setMode: React.Dispatch<React.SetStateAction<'Overview' | 'Compare'>>
}) => {
  return (
    <Toggle
      type={'single'}
      defaultValue={mode}
      onValueChange={(value: 'Overview' | 'Compare') => {
        if (value) setMode(value)
      }}
    >
      <ToggleOption value={'Overview'}>Overview</ToggleOption>
      <ToggleOption value={'Compare'}>Compare</ToggleOption>
    </Toggle>
  )
}
