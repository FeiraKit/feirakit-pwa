import z from "zod";

export const registerSchema = z
  .object({
    nome: z
      .string()
      .min(2, { message: "Nome deve ter no mínimo 3 caracteres" }),
    email: z.email({ message: "E-mail inválido" }),
    senha: z.string().min(6, "Senha deve ter pelo menos 6 caracteres"),
    confirmasenha: z.string().min(6, "Senha deve ter pelo menos 6 caracteres"),
    telefone: z.string().min(10, "Telefone inválido"),
    endereco: z.object({
      rua: z.string().min(1, "informe o nome da rua"),
      numero: z.string().min(1, "informe o numero"),
      bairro: z.string().min(1, "informe o nome do bairro"),
      cep: z.string().min(8, "informe um CEP válido"),
      complemento: z.string().optional(),
      cidade: z.string().min(1, "informe o nome da cidade"),
      estado: z.string().min(2, "informe o nome do estado"),
    }),
    acceptTerm: z.boolean().refine((val) => val, "Você deve aceitar os termos"),
    acceptPolicy: z
      .boolean()
      .refine((val) => val, "Você deve aceitar a política"),
  })
  .refine((data) => data.senha === data.confirmasenha, {
    message: "As senhas não coincidem",
    path: ["confirmasenha"],
  });

export type RegisterFormData = z.infer<typeof registerSchema>;

export type CreateUserDTO = {
  nome: string;
  email: string;
  telefone: string;
  senha: string;
  endereco: {
    rua: string;
    numero: string;
    bairro: string;
    cep: string;
    complemento: string;
    cidade: string;
    estado: string;
  };
};

export type LoginDTO = {
  email: string;
  senha: string;
};

export const updateUserSchema = z.object({
  nome: z.string().min(2, { message: "Nome deve ter no mínimo 3 caracteres" }),
  email: z.email({ message: "E-mail inválido" }),
  telefone: z.string().min(10, "Telefone inválido"),
  endereco: z.object({
    rua: z.string().min(1, "informe o nome da rua"),
    numero: z.string().min(1, "informe o numero"),
    bairro: z.string().min(1, "informe o nome do bairro"),
    cep: z.string().min(8, "informe um CEP válido"),
    complemento: z.string().optional(),
    cidade: z.string().min(1, "informe o nome da cidade"),
    estado: z.string().min(2, "informe o nome do estado"),
  }),
});

export type updateUserFormData = z.infer<typeof updateUserSchema>;
