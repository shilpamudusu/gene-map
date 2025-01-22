import React from "react"
import { Scatter as ChartScatter } from "react-chartjs-2"

interface ScatterProps {
  data: any
  options: any
}

export const Scatter = React.forwardRef<ChartScatter, ScatterProps>(({ data, options }, ref) => {
  return <ChartScatter data={data} options={options} ref={ref} />
})

Scatter.displayName = "Scatter"

