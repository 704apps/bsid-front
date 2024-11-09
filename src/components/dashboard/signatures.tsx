import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { ChevronRight } from "lucide-react"

// Tipo para os itens da lista
type AssinaturaItem = {
  id: string
  titulo: string
  dataCriacao: string
  link: string
}

// Componente principal
export default function SignaturesList() {
  // Dados de exemplo (você pode substituir isso por dados reais vindos de uma API ou props)
  const assinaturas: AssinaturaItem[] = [
    { id: "1", titulo: "Assinatura Básica", dataCriacao: "2023-05-01", link: "/assinatura/basica" },
    { id: "2", titulo: "Assinatura Premium", dataCriacao: "2023-05-15", link: "/assinatura/premium" },
    { id: "3", titulo: "Assinatura Pro", dataCriacao: "2023-06-01", link: "/assinatura/pro" },
    { id: "4", titulo: "Assinatura Empresarial", dataCriacao: "2023-06-15", link: "/assinatura/empresarial" },
  ]

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">Assinaturas</CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="pr-4">
          {assinaturas.map((item) => (
            <Card key={item.id} className="mb-4 hover:bg-accent transition-colors">
              <a href={item.link} className="block">
                <CardContent className="p-4">
                  <h3 className="text-lg font-semibold mb-2">{item.titulo}</h3>
                  <p className="text-muted-foreground mb-4">
                    Criado em: {new Date(item.dataCriacao).toLocaleDateString()}
                  </p>
                  <div className="flex items-center text-primary">
                    <span>Ver assinatura</span>
                    <ChevronRight className="ml-1 h-4 w-4" />
                  </div>
                </CardContent>
              </a>
            </Card>
          ))}
        </ScrollArea>
      </CardContent>
    </Card>
  )
}