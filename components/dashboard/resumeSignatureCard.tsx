import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Download } from "lucide-react"

export default function ResumeSignatureCard() {
  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex flex-row justify-between items-center rounded-lg">
          <CardTitle className="text-2xl font-bold">Titulo</CardTitle>
          <div className="flex items-center">
            <a
              href={''}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center bg-gray-500 text-white py-2 px-4 rounded"
            >
              <Download className="text-lg mr-2" />
              Arquivo de áudio
            </a>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col">
          <div>
            <span className="font-bold">Criado em: 12/12/2024</span>
            
            <span className="font-bold">Atualizado em: 12/12/2024</span>
          </div>

          <div>
            <span className="font-bold">Link de redirecionamento: </span>
            <a href={""} className="text-blue-500">
              Link aqui
            </a>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
