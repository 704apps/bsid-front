"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts"
import { useState, useEffect } from "react"

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
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardDescription className="text-sm font-medium">Engajamento:</CardDescription>
        <CardTitle className="text-2xl font-bold">{totalLeituras} Leituras</CardTitle>
        <CardDescription className="text-xs text-muted-foreground">
          Primeira leitura em: {primeiraLeitura} - Última leitura em: {ultimaLeitura}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={data}>
            <XAxis
              dataKey="name"
              stroke="#888888"
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            <YAxis
              stroke="#888888"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => `${value}`}
            />
            <Bar dataKey="total" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}