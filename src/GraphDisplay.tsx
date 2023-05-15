import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from 'recharts'
import { InitialUnitData, InitialStatData } from './TeamPlanner'

export const GraphDisplay = ({
  unitData,
  statList,
}: {
  unitData: InitialUnitData[]
  statList: InitialStatData[]
}) => {
  const data = unitData
    .filter((entry) => entry.isVisible)
    .map((unit) => {
      const index = unit.data.length - 1
      const { HP, STR, MAG, DEX, SPD, DEF, RES, LCK, BLD } =
        unit.data[index].STATS
      return {
        id: unit.id,
        baseExp: unit.base.EXP,
        totalExp: unit.data[index].EXP,
        HP: HP,
        STR: STR,
        MAG: MAG,
        DEX: DEX,
        SPD: SPD,
        DEF: DEF,
        RES: RES,
        LCK: LCK,
        BLD: BLD,
      }
    })

  const statData = statList.filter(({ isVisible }) => isVisible)

  const getExpDiff = (data: { totalExp: number; baseExp: number }) => {
    return data.totalExp - data.baseExp
  }

  const colorList = [
    '#001D70',
    '#00318A',
    '#0047A5',
    '#085EC0',
    '#3D76DD',
    '#5B8FF9',
    '#7DAAFF',
    '#9AC5FF',
    '#B8E1FF',
  ]

  const getColor = (index: number) => {
    const numberOfColors = statData.length
    switch (numberOfColors) {
      case 1:
      case 2:
        return colorList[index + 3]
      case 3:
      case 4:
      case 5:
        return colorList[index + 2]
      case 6:
      case 7:
        return colorList[index + 1]
      case 8:
      case 9:
        return colorList[index]
      default:
        return colorList[index]
    }
  }

  return (
    <ResponsiveContainer width='100%' height={350}>
      <BarChart data={data}>
        <XAxis
          dataKey='id'
          stroke='#888888'
          fontSize={12}
          tickLine={false}
          axisLine={false}
        />
        <YAxis
          yAxisId={'stats'}
          stroke='#888888'
          fontSize={12}
          tickLine={false}
          axisLine={false}
          // tickFormatter={(value) => `$${value}`}
        />
        <YAxis
          yAxisId={'exp'}
          orientation='right'
          domain={[0, 6000]}
          stroke='#888888'
          fontSize={12}
          tickLine={false}
          axisLine={false}
          // tickFormatter={(value) => `$${value}`}
        />
        {statData.map(({ id }, index) => (
          <Bar
            yAxisId={'stats'}
            dataKey={id}
            stackId={'a'}
            fill={getColor(index)}
            radius={index === statData.length - 1 ? [4, 4, 0, 0] : [0, 0, 0, 0]}
          />
        ))}
        <Bar
          yAxisId={'exp'}
          dataKey='baseExp'
          stackId={'b'}
          fill='#65789B'
          radius={[0, 0, 0, 0]}
        />
        <Bar
          yAxisId={'exp'}
          dataKey={getExpDiff}
          stackId={'b'}
          fill='#61DDAA'
          radius={[4, 4, 0, 0]}
        />
      </BarChart>
    </ResponsiveContainer>
  )
}
