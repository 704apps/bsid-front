import { z } from "zod";

const MAX_SIZE = 5 * 1024 * 1024; // 5 MB

export const SignatureSchema = z.object({
  title: z.string().min(2, "Nome deve ter pelo menos 2 caracteres"),
  shortDescription: z.string().min(2, "Descrição curta deve ter pelo menos 2 caracteres"),
  description: z.string().min(10, "Descrição deve ter pelo menos 10 caracteres"),
  linkRedirect: z.string().url("Link de redirecionamento deve ser uma URL válida"),
  
  // Validação para logo e banner
  logo: z.instanceof(File)
    .refine((file) => ["image/jpeg", "image/png"].includes(file.type), {
      message: "A logo deve ser um arquivo JPEG, JPG ou PNG",
    })
    .refine((file) => file.size <= MAX_SIZE, {
      message: "A logo deve ter no máximo 5 MB",
    }),
  
  banner: z.instanceof(File)
    .refine((file) => ["image/jpeg", "image/png"].includes(file.type), {
      message: "O banner deve ser um arquivo JPEG, JPG ou PNG",
    })
    .refine((file) => file.size <= MAX_SIZE, {
      message: "O banner deve ter no máximo 5 MB",
    }),
});

export type SignatureType = z.infer<typeof SignatureSchema>;
