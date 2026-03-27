'use client'

import { formatCurrency } from '@/lib/utils'
import { useState } from 'react'

interface DataPoint {
  date: string
  fullDate: Date
  entradas: number
  saidas: number
}

interface LineChartProps {
  data: DataPoint[]
}

export function LineChart({ data }: LineChartProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  // Encontrar valores máximos e mínimos para escala
  const allValues = data.flatMap(d => [d.entradas, d.saidas])
  const maxValue = Math.max(...allValues)
  const minValue = Math.min(...allValues)
  const valueRange = maxValue - minValue
  
  // Dimensões do gráfico com largura proporcional aos dados
  const chartHeight = 200
  const basePointWidth = 15 // largura base por ponto
  const chartWidth = Math.max(data.length * basePointWidth, 800) // mínimo 800px
  
  // Converter valor para posição Y (invertido pois Y cresce para baixo no SVG)
  const valueToY = (value: number) => {
    const percentage = (value - minValue) / valueRange
    return chartHeight - (percentage * (chartHeight - 40)) - 20
  }
  
  // Criar pontos para as linhas
  const entradasPoints = data.map((d, i) => {
    const x = (i / (data.length - 1)) * chartWidth
    const y = valueToY(d.entradas)
    return `${x},${y}`
  }).join(' ')
  
  const saidasPoints = data.map((d, i) => {
    const x = (i / (data.length - 1)) * chartWidth
    const y = valueToY(d.saidas)
    return `${x},${y}`
  }).join(' ')

  // Calcular largura de cada ponto
  const pointSpacing = chartWidth / (data.length - 1)
  
  // Mostrar labels a cada 5 pontos ou menos
  const labelInterval = Math.max(1, Math.floor(data.length / 12))
  
  return (
    <div className="relative overflow-x-auto">
      <svg
        viewBox={`0 0 ${chartWidth} ${chartHeight}`}
        className="h-64"
        style={{ minWidth: `${chartWidth}px` }}
      >
        {/* Grid horizontal */}
        {[0, 0.25, 0.5, 0.75, 1].map((percent, i) => {
          const y = chartHeight - 20 - (percent * (chartHeight - 40))
          return (
            <g key={i}>
              <line
                x1="0"
                y1={y}
                x2={chartWidth}
                y2={y}
                stroke="currentColor"
                className="text-gray-200 dark:text-gray-700"
                strokeWidth="0.2"
                strokeDasharray="1,1"
              />
              <text
                x="-5"
                y={y}
                textAnchor="end"
                className="text-[8px] fill-gray-500 dark:fill-gray-400"
                dominantBaseline="middle"
              >
                {formatCurrency(minValue + (valueRange * percent))}
              </text>
            </g>
          )
        })}
        
        {/* Linha de Entradas */}
        <polyline
          points={entradasPoints}
          fill="none"
          stroke="#22c55e"
          strokeWidth="2"
          className="drop-shadow-sm"
        />
        
        {/* Linha de Saídas */}
        <polyline
          points={saidasPoints}
          fill="none"
          stroke="#ef4444"
          strokeWidth="2"
          className="drop-shadow-sm"
        />
        
        {/* Pontos de Entradas */}
        {data.map((d, i) => {
          const x = (i / (data.length - 1)) * chartWidth
          const y = valueToY(d.entradas)
          return (
            <circle
              key={`entrada-${i}`}
              cx={x}
              cy={y}
              r={hoveredIndex === i ? "4" : "3"}
              fill="#22c55e"
              className="cursor-pointer transition-all"
              onMouseEnter={() => setHoveredIndex(i)}
              onMouseLeave={() => setHoveredIndex(null)}
            />
          )
        })}
        
        {/* Pontos de Saídas */}
        {data.map((d, i) => {
          const x = (i / (data.length - 1)) * chartWidth
          const y = valueToY(d.saidas)
          return (
            <circle
              key={`saida-${i}`}
              cx={x}
              cy={y}
              r={hoveredIndex === i ? "4" : "3"}
              fill="#ef4444"
              className="cursor-pointer transition-all"
              onMouseEnter={() => setHoveredIndex(i)}
              onMouseLeave={() => setHoveredIndex(null)}
            />
          )
        })}
        
        {/* Labels do eixo X */}
        {data.map((d, i) => {
          if (i % labelInterval !== 0 && i !== data.length - 1) return null
          const x = (i / (data.length - 1)) * chartWidth
          return (
            <text
              key={`label-${i}`}
              x={x}
              y={chartHeight - 5}
              textAnchor="middle"
              className="text-[9px] fill-gray-600 dark:fill-gray-400"
            >
              {d.date}
            </text>
          )
        })}
      </svg>
      
      {/* Tooltip */}
      {hoveredIndex !== null && (
        <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-gray-900 dark:bg-gray-800 text-white px-4 py-3 rounded-lg shadow-lg z-10 min-w-[200px]">
          <p className="text-xs font-semibold mb-2">{data[hoveredIndex].date}</p>
          <div className="space-y-1">
            <div className="flex items-center justify-between gap-4">
              <span className="text-xs text-green-400">Entradas:</span>
              <span className="text-xs font-bold">{formatCurrency(data[hoveredIndex].entradas)}</span>
            </div>
            <div className="flex items-center justify-between gap-4">
              <span className="text-xs text-red-400">Saídas:</span>
              <span className="text-xs font-bold">{formatCurrency(data[hoveredIndex].saidas)}</span>
            </div>
            <div className="flex items-center justify-between gap-4 pt-1 border-t border-gray-700">
              <span className="text-xs text-gray-300">Saldo:</span>
              <span className={`text-xs font-bold ${data[hoveredIndex].entradas - data[hoveredIndex].saidas >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                {formatCurrency(data[hoveredIndex].entradas - data[hoveredIndex].saidas)}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
