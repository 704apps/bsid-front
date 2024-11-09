"use client"

import { useState, useEffect } from "react"
import { Bar, BarChart, XAxis, CartesianGrid, LabelList } from "recharts"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

const chartData = [
  { month: "January", desktop: 186 },
  { month: "February", desktop: 305 },
  { month: "March", desktop: 237 },
  { month: "April", desktop: 73 },
  { month: "May", desktop: 209 },
  { month: "June", desktop: 214 },
]

const chartConfig = {
  desktop: {
    label: "Leituras",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig
// Função para gerar dados aleatórios para os últimos 6 meses
const generateLastSixMonthsData = () => {
  const data = []
  const today = new Date()
  for (let i = 5; i >= 0; i--) {
    const date = new Date(today.getFullYear(), today.getMonth() - i, 1)
    data.push({
      name: date.toLocaleString('default', { month: 'short' }),
      total: Math.floor(Math.random() * 50) + 10, // Gera um número aleatório entre 10 e 59
      date: date.toISOString().split('T')[0]
    })
  }
  return data
}

export default function ChartSignaturesReaded() {
  const [data, setData] = useState(generateLastSixMonthsData())

  useEffect(() => {
    // Atualiza os dados a cada 24 horas
    const interval = setInterval(() => {
      setData(generateLastSixMonthsData())
    }, 24 * 60 * 60 * 1000)

    return () => clearInterval(interval)
  }, [])

  // Calcula o total de leituras
  const totalLeituras = data.reduce((acc, item) => acc + item.total, 0)

  // Encontra a primeira e a última data de leitura
  const primeiraLeitura = new Date(data[0].date).toLocaleDateString('pt-BR')
  const ultimaLeitura = new Date(data[data.length - 1].date).toLocaleDateString('pt-BR')

  return (
    <Card className="w-full">
      <CardHeader>
        <CardDescription className="text-sm font-medium">Engajamento:</CardDescription>
        <CardTitle className="text-2xl font-bold">{totalLeituras} Leituras</CardTitle>
        <CardDescription className="text-xs text-muted-foreground">
          Primeira leitura em: {primeiraLeitura} - Última leitura em: {ultimaLeitura}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart
            accessibilityLayer
            data={chartData}
            margin={{
              top: 20,
            }}
          >
            <CartesianGrid vertical={true} />
            <XAxis
              dataKey="month"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar dataKey="desktop" fill="var(--color-desktop)" radius={8}>
              <LabelList
                position="top"
                offset={12}
                className="fill-foreground"
                fontSize={12}
              />
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
