'use client'

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Pie, PieChart, Cell, ResponsiveContainer, Label, Tooltip } from "recharts"

// Dados de exemplo
const dadosCliquesVisualizacoes = [
  { name: 'Cliques', value: 400 },
  { name: 'Visualizações', value: 1000 },
]

const dadosCurtidasCompartilhamentos = [
  { name: 'Curtidas', value: 300 },
  { name: 'Compartilhamentos', value: 100 },
]

const CORES_CLIQUES_VISUALIZACOES = ['hsl(var(--chart-1))', 'hsl(var(--chart-2))']
const CORES_CURTIDAS_COMPARTILHAMENTOS = ['hsl(var(--chart-3))', 'hsl(var(--chart-4))']

interface GraficoPizzaProps {
  dados: { name: string; value: number }[];
  cores: string[];
}

const GraficoPizza = ({ dados, cores }: GraficoPizzaProps) => (
  <ResponsiveContainer width="50%" height={300}>
    <PieChart>
      <Tooltip />
      <Pie
        data={dados}
        cx="50%"
        cy="50%"
        innerRadius={60}
        outerRadius={80}
        fill="#8884d8"
        paddingAngle={5}
        dataKey="value"
      >
        {dados.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={cores[index % cores.length]} />
        ))}
        <Label
          value={dados.reduce((sum, entry) => sum + entry.value, 0)}
          position="center"
          className="text-2xl font-bold"
        />
      </Pie>
    </PieChart>
  </ResponsiveContainer>
)

export default function ChartInteractions() {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Estatísticas</CardTitle>
        <div className="flex flex-row gap-2">
          <div className="flex items-center gap-2">
            <span className="w-4 h-4" style={{ backgroundColor: CORES_CLIQUES_VISUALIZACOES[0] }}></span>
            <span>Cliques</span>
            <span className="w-4 h-4 ml-4" style={{ backgroundColor: CORES_CLIQUES_VISUALIZACOES[1] }}></span>
            <span>Visualizações</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-4 h-4" style={{ backgroundColor: CORES_CURTIDAS_COMPARTILHAMENTOS[0] }}></span>
            <span>Curtidas</span>
            <span className="w-4 h-4 ml-4" style={{ backgroundColor: CORES_CURTIDAS_COMPARTILHAMENTOS[1] }}></span>
            <span>Compartilhamentos</span>
          </div>
        </div>
      </CardHeader>
      <CardContent className="flex flex-col items-center gap-4 md:flex-row">
        <GraficoPizza dados={dadosCliquesVisualizacoes} cores={CORES_CLIQUES_VISUALIZACOES} />
        <GraficoPizza dados={dadosCurtidasCompartilhamentos} cores={CORES_CURTIDAS_COMPARTILHAMENTOS} />
      
      </CardContent>
    </Card>
  )
}
