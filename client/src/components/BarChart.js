import React from 'react'
import {
    BarChart,
    Bar,
    XAxis,
    Tooltip,
    YAxis,
    CartesianGrid,
    ResponsiveContainer

} from 'recharts'



const BarChartComponent = ({value}) => {
  
  return (
    <ResponsiveContainer width='100%' height={300}>
      <BarChart
        data={value}
        margin={{
          top: 50,
        }}
      >
        <CartesianGrid strokeDasharray='3 3' />
        <XAxis dataKey='date' />
        <YAxis allowDecimals={false} />
        <Tooltip />
        <Bar dataKey='count' fill='#8884d8' barSize={75} />
      </BarChart>
    </ResponsiveContainer>
  )
}

export default BarChartComponent
