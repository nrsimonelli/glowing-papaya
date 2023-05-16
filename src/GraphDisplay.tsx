import {
  Bar,
  BarChart,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import { InitialUnitData, InitialStatData, StatName } from './TeamPlanner'
import { UNIT_NAME } from './constants'
import { UnitName } from './utils/types'

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

  // const colorList = [
  //   '#001D70',
  //   '#00318A',
  //   '#0047A5',
  //   '#085EC0',
  //   '#3D76DD',
  //   '#5B8FF9',
  //   '#7DAAFF',
  //   '#9AC5FF',
  //   '#B8E1FF',
  // ]

  const colorList = [
    '#209FED',
    '#1B6BED',
    '#1444ED',
    '#A0BFFF',
    '#8881FF',
    '#6752FF',
    '#D7D1FF',
    '#B78DFF',
    '#8B59FF',
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
          dataKey={'id'}
          tickFormatter={(value) => UNIT_NAME[value as UnitName]}
          stroke='#888888'
          fontSize={13}
          tickLine={false}
          axisLine={false}
        />
        <YAxis
          yAxisId={'stats'}
          stroke='#888888'
          fontSize={13}
          tickLine={false}
          axisLine={false}
        />
        <YAxis
          yAxisId={'exp'}
          orientation='right'
          domain={[0, 6000]}
          stroke='#888888'
          fontSize={13}
          tickLine={false}
          axisLine={false}
        />
        <Tooltip
          contentStyle={{
            background: '#2a2a2a',
            fontSize: 13,
            lineHeight: 1.5,
            textAlign: 'right',
            border: 'transparent',
          }}
          cursor={false}
          formatter={(value) => Math.floor(Number(value))}
        />
        <Legend
          align={'center'}
          verticalAlign={'bottom'}
          layout={'horizontal'}
        />
        {statData.map(({ id }, index) => (
          <Bar
            key={`${id}-bar`}
            yAxisId={'stats'}
            dataKey={id}
            name={StatName[id].label}
            stackId={'a'}
            fill={StatName[id].color}
            radius={index === statData.length - 1 ? [4, 4, 0, 0] : [0, 0, 0, 0]}
          />
        ))}
        <Bar
          yAxisId={'exp'}
          dataKey='baseExp'
          name={'Base Exp'}
          stackId={'b'}
          fill='#65789B'
          radius={[0, 0, 0, 0]}
        />
        <Bar
          yAxisId={'exp'}
          dataKey={getExpDiff}
          name={'Invested Exp'}
          stackId={'b'}
          fill='#61DDAA'
          radius={[4, 4, 0, 0]}
        />
      </BarChart>
    </ResponsiveContainer>
  )
}
