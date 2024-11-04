'use client'

import { useState } from "react"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"

interface ReaderData {
  nome: string
  fone: string
  email: string
  modeloDispositivo: string
  cidade: string
  pais: string
}

const readerData: ReaderData[] = [
  {
    nome: "João Silva",
    fone: "(11) 98765-4321",
    email: "joao.silva@email.com",
    modeloDispositivo: "iPhone 12",
    cidade: "São Paulo",
    pais: "Brasil",
  },
  {
    nome: "Maria Santos",
    fone: "(21) 99876-5432",
    email: "maria.santos@email.com",
    modeloDispositivo: "Samsung Galaxy S21",
    cidade: "Rio de Janeiro",
    pais: "Brasil",
  },
  {
    nome: "Carlos Oliveira",
    fone: "(31) 97654-3210",
    email: "carlos.oliveira@email.com",
    modeloDispositivo: "Google Pixel 5",
    cidade: "Belo Horizonte",
    pais: "Brasil",
  },
  // Add more sample data to test pagination
  ...Array(20).fill(null).map((_, i) => ({
    nome: `Usuário ${i + 4}`,
    fone: `(${Math.floor(Math.random() * 90) + 10}) 9${Math.floor(Math.random() * 9000) + 1000}-${Math.floor(Math.random() * 9000) + 1000}`,
    email: `usuario${i + 4}@email.com`,
    modeloDispositivo: ["iPhone", "Samsung", "Google Pixel", "Xiaomi", "Huawei"][Math.floor(Math.random() * 5)] + ` ${Math.floor(Math.random() * 10) + 1}`,
    cidade: ["São Paulo", "Rio de Janeiro", "Belo Horizonte", "Porto Alegre", "Curitiba"][Math.floor(Math.random() * 5)],
    pais: "Brasil"
  }))
]

export default function SignatureReadersTable() {
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 5
  const totalPages = Math.ceil(readerData.length / itemsPerPage)

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  const paginatedData = readerData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  )

  return (
    <Card className="w-full max-w-4xl">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">Quem leu sua assinatura</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nome</TableHead>
              <TableHead>Fone</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Modelo do dispositivo</TableHead>
              <TableHead>Cidade</TableHead>
              <TableHead>País</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedData.map((reader, index) => (
              <TableRow key={index}>
                <TableCell>{reader.nome}</TableCell>
                <TableCell>{reader.fone}</TableCell>
                <TableCell>{reader.email}</TableCell>
                <TableCell>{reader.modeloDispositivo}</TableCell>
                <TableCell>{reader.cidade}</TableCell>
                <TableCell>{reader.pais}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <div className="mt-4">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious 
                  onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
                  className={currentPage === 1 ? "pointer-events-none opacity-50" : ""}
                />
              </PaginationItem>
              {[...Array(totalPages)].map((_, i) => (
                <PaginationItem key={i}>
                  <PaginationLink 
                    onClick={() => handlePageChange(i + 1)}
                    isActive={currentPage === i + 1}
                  >
                    {i + 1}
                  </PaginationLink>
                </PaginationItem>
              ))}
              <PaginationItem>
                <PaginationNext 
                  onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
                  className={currentPage === totalPages ? "pointer-events-none opacity-50" : ""}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      </CardContent>
    </Card>
  )
}