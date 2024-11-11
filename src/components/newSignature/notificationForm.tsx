'use client'

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { SignatureSchema, SignatureType } from "@/lib/schemas/user.schema"
import { zodResolver } from "@hookform/resolvers/zod"
import { Noop, RefCallBack, useForm } from "react-hook-form"
import Image from "next/image"

type FileProp = { 
  onChange: (arg0: File | null) => void; 
  onBlur?: Noop; 
  value?: File; 
  disabled?: boolean | undefined; 
  name?: "logo" | "banner"; 
  ref?: RefCallBack 
}

export default function NotificationForm() {
  const [logoPreview, setLogoPreview] = useState<string | null>(null)
  const [bannerPreview, setBannerPreview] = useState<string | null>(null)

  const form = useForm<SignatureType>({
    resolver: zodResolver(SignatureSchema),
    defaultValues: {
      title: "",
      shortDescription: "",
      description: "",
      linkRedirect: "",
      logo: undefined,
      banner: undefined
    },
  })
 
  function onSubmit(values: SignatureType) {
    console.log(values)
  }

  function handleFileChange(event: React.ChangeEvent<HTMLInputElement>, field: FileProp, setPreview: (url: string | null) => void) {
    const file = event.target.files?.[0] || null
    field.onChange(file)
    if (file) {
      const previewUrl = URL.createObjectURL(file)
      setPreview(previewUrl)
    } else {
      setPreview(null)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Título</FormLabel>
              <FormControl>
                <Input placeholder="Título da assinatura" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="shortDescription"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Descrição curta</FormLabel>
              <FormControl>
                <Input placeholder="Descrição breve que aparecerá na notificação" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Descrição</FormLabel>
              <FormControl>
                <Input placeholder="Uma Descrição mais detalhada" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="linkRedirect"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Link Redirect</FormLabel>
              <FormControl>
                <Input type="url" placeholder="https://example.com" {...field} />
              </FormControl>
              <FormDescription>
                Link que irá redirecionar o usuário ao clicar na notificação
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex w-full justify-between">
          <FormField
            control={form.control}
            name="logo"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Logo</FormLabel>
                <FormControl>
                  <Input
                    type="file"
                    accept=".jpg,.jpeg,.png"
                    onChange={(e) => handleFileChange(e, field, setLogoPreview)}
                  />
                </FormControl>
                {logoPreview && (
                  <Image src={logoPreview} 
                    alt="Logo preview" 
                    className="mt-2 h-24 w-24 object-cover"
                    width={20}
                    height={20}
                  />
                )}
                <FormDescription>
                  Aceita: (JPEG, JPG, PNG)
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="banner"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Banner</FormLabel>
                <FormControl>
                  <Input
                    type="file"
                    accept=".jpg,.jpeg,.png"
                    onChange={(e) => handleFileChange(e, field, setBannerPreview)}
                  />
                </FormControl>
                {bannerPreview && (
                  <Image src={bannerPreview} 
                    alt="Banner preview"
                    width={100}
                    height={100}
                    className="mt-2 h-24 w-full object-cover"
                  />
                )}
                <FormDescription>
                  Aceita (JPEG, JPG, PNG)
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <Button type="submit">Avançar</Button>
      </form>
    </Form>
  )
}
