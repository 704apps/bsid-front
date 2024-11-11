'use client'

import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { AudioLines, ChevronDown, Menu, X } from "lucide-react"
import { useState } from 'react'
import {
  Cloud,
  // CreditCard,
  // Github,
  // Keyboard,
  LifeBuoy,
  LogOut,
  // Mail,
  // MessageSquare,
  // Plus,
  // PlusCircle,
  // Settings,
  User,
  // UserPlus,
  // Users,
} from "lucide-react"
 
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  // DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  // DropdownMenuSub,
  // DropdownMenuSubContent,
  // DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"


export default function DashboardHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen)

  return (
    <header className="bg-background border-b">
      <div className="container mx-auto">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <AudioLines className="h-8 w-8 text-primary" />
              <span className="ml-2 text-xl font-bold text-primary">BSID</span>
            </Link>
          </div>
          <nav className="hidden md:flex space-x-4">
            <Link href="/campanhas" className="text-muted-foreground hover:text-primary">Campanhas</Link>
            <Link href="/analytics" className="text-muted-foreground hover:text-primary">Analytics</Link>
            <Link href="/recursos" className="text-muted-foreground hover:text-primary">Recursos</Link>
            <Link href="/precos" className="text-muted-foreground hover:text-primary">Preços</Link>
          </nav>
          <div className="hidden md:flex md:items-center md:gap-4">
            <Link href="/painel/nova-assinatura">
              <Button>Nova assinatura</Button>
            </Link>
            <PerfilDropdownMenu />
          </div>
          <div className="md:hidden">
            <Button variant="ghost" size="icon" onClick={toggleMenu}>
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>
      </div>
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link href="/campanhas" className="block px-3 py-2 text-base font-medium text-muted-foreground hover:text-primary">Campanhas</Link>
            <Link href="/analytics" className="block px-3 py-2 text-base font-medium text-muted-foreground hover:text-primary">Analytics</Link>
            <Link href="/recursos" className="block px-3 py-2 text-base font-medium text-muted-foreground hover:text-primary">Recursos</Link>
            <Link href="/precos" className="block px-3 py-2 text-base font-medium text-muted-foreground hover:text-primary">Preços</Link>
            <Link href="/" className="block px-3 py-2 text-base font-medium text-muted-foreground hover:text-primary">Sair</Link>
            <div className="mt-4 px-3">
              <Link href="/painel/nova-assinatura">
                <Button className="w-full">Nova assinatura</Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}

export function PerfilDropdownMenu() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className='hover:bg-transparent focus-visible:ring-transparent'>
          <AvatarComponente />
          <ChevronDown />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>Meus dados</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <User />
            <span>Perfil</span>
            <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
          </DropdownMenuItem>
          {/* <DropdownMenuItem>
            <CreditCard />
            <span>Billing</span>
            <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Settings />
            <span>Settings</span>
            <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Keyboard />
            <span>Keyboard shortcuts</span>
            <DropdownMenuShortcut>⌘K</DropdownMenuShortcut>
          </DropdownMenuItem> */}
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        {/* <DropdownMenuGroup>
          <DropdownMenuItem>
            <Users />
            <span>Team</span>
          </DropdownMenuItem>
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>
              <UserPlus />
              <span>Invite users</span>
            </DropdownMenuSubTrigger>
            <DropdownMenuPortal>
              <DropdownMenuSubContent>
                <DropdownMenuItem>
                  <Mail />
                  <span>Email</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <MessageSquare />
                  <span>Message</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <PlusCircle />
                  <span>More...</span>
                </DropdownMenuItem>
              </DropdownMenuSubContent>
            </DropdownMenuPortal>
          </DropdownMenuSub>
          <DropdownMenuItem>
            <Plus />
            <span>New Team</span>
            <DropdownMenuShortcut>⌘+T</DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuGroup> */}
        <DropdownMenuSeparator />
        {/* <DropdownMenuItem>
          <Github />
          <span>GitHub</span>
        </DropdownMenuItem> */}
        <DropdownMenuItem>
          <LifeBuoy />
          <span>Suporte</span>
        </DropdownMenuItem>
        <DropdownMenuItem disabled>
          <Cloud />
          <span>API</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <LogOut />
          <span>Sair</span>
          <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export function AvatarComponente() {
  return (
    <Avatar>
      <AvatarImage src="" alt="@shadcn" />
      <AvatarFallback>CN</AvatarFallback>
    </Avatar>
  )
}
