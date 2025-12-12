import z from "zod";

export const addProductSchema = z.object({
  nome: z.string().min(4, { error: "Informe um título para o produto " }),
  preco: z.number().min(0.01, { error: "Informe o valor para o produto" }),
  estoque: z
    .number({ error: "Quantos Produtos estarão disponíveis?" })
    .int({ error: "Quantos Produtos estarão disponíveis?" })
    .min(0, { error: "Quantos Produtos estarão disponíveis?" }),
  categoria: z.string().min(1, { error: "Informe a categoria deste produto " }),
  descricao: z.string().min(5, { error: "Fale sobre o produto" }),
  unidade: z.string().min(1, { error: "Como esse produto é vendido?" }),
  cidades: z
    .array(z.string({ error: "Em que cidade este Produto estará disponível?" }))
    .nonempty({ error: "Em que cidade este Produto estará disponível?" }),
  bestbefore: z.boolean().optional(),
  produtor_id: z.string(),
  validade: z.string(),
  imagem_url: z
    .any()
    .refine((v) => Array.isArray(v) && v.length >= 1, {
      message: "Adicione pelo menos uma foto do produto",
    })
    .transform((v) => v as string[]),
});

export type addProductFormData = z.infer<typeof addProductSchema>;
