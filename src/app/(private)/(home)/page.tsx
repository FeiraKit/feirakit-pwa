import { Header } from "@/app/components/header";
import Input from "@/app/components/Input";
import { FaBars, FaSearch } from "react-icons/fa";
import { SelectCity } from "./components/selectCity";

const PRODUCTS = [
  {
    nome: "Café Orgânico Premium",
    categoria: "Bebidas",
    descricao:
      "Café 100% arábica cultivado em pequenas fazendas sustentáveis, sabor intenso e aroma marcante.",
    unidade: "500g",
    estoque: 25,
    produtor_id: "prod-001",
    cidades: ["Belo Horizonte", "São Paulo"],
    bestbefore: true,
    validade: "2026-03-15",
    imagem_url: ["https://picsum.photos/seed/cafe/400/300"],
    preco: 32.9,
    id: "prod001",
  },
  {
    nome: "Geleia Artesanal de Morango",
    categoria: "Alimentos",
    descricao:
      "Feita com morangos frescos e açúcar orgânico. Sem conservantes, ideal para cafés da manhã.",
    unidade: "250g",
    estoque: 40,
    produtor_id: "prod-002",
    cidades: ["Curitiba", "Florianópolis"],
    bestbefore: true,
    validade: "2025-12-01",
    imagem_url: ["https://picsum.photos/seed/geleia/400/300"],
    preco: 18.5,
    id: "prod002",
  },
  {
    nome: "Mel Silvestre Puro",
    categoria: "Alimentos",
    descricao:
      "Mel extraído de flores silvestres com sabor autêntico e propriedades antioxidantes.",
    unidade: "500ml",
    estoque: 15,
    produtor_id: "prod-003",
    cidades: ["Brasília", "Goiânia"],
    bestbefore: true,
    validade: "2027-01-30",
    imagem_url: ["https://picsum.photos/seed/mel/400/300"],
    preco: 27.0,
    id: "prod003",
  },
  {
    nome: "Queijo Minas Frescal",
    categoria: "Laticínios",
    descricao:
      "Queijo fresco e leve, produzido artesanalmente com leite de fazenda. Ideal para o café da manhã.",
    unidade: "400g",
    estoque: 10,
    produtor_id: "prod-004",
    cidades: ["Belo Horizonte", "São Paulo"],
    bestbefore: true,
    validade: "2025-10-30",
    imagem_url: ["https://picsum.photos/seed/queijo/400/300"],
    preco: 22.9,
    id: "prod004",
  },
  {
    nome: "Azeite de Oliva Extra Virgem",
    categoria: "Temperos",
    descricao:
      "Azeite 100% natural, acidez controlada e aroma frutado. Ideal para saladas e massas.",
    unidade: "500ml",
    estoque: 30,
    produtor_id: "prod-005",
    cidades: ["Porto Alegre", "Curitiba"],
    bestbefore: true,
    validade: "2027-06-10",
    imagem_url: ["https://picsum.photos/seed/azeite/400/300"],
    preco: 45.0,
    id: "prod005",
  },
  {
    nome: "Sabonete Vegano de Lavanda",
    categoria: "Higiene",
    descricao:
      "Feito com óleos vegetais e fragrância natural de lavanda. Livre de parabenos e sulfatos.",
    unidade: "120g",
    estoque: 60,
    produtor_id: "prod-006",
    cidades: ["São Paulo", "Curitiba"],
    bestbefore: true,
    validade: "2026-09-01",
    imagem_url: ["https://picsum.photos/seed/sabonete/400/300"],
    preco: 9.9,
    id: "prod006",
  },
  {
    nome: "Suco Natural de Laranja",
    categoria: "Bebidas",
    descricao:
      "Suco 100% natural, sem adição de açúcar. Rico em vitamina C e ideal para o café da manhã.",
    unidade: "1L",
    estoque: 50,
    produtor_id: "prod-007",
    cidades: ["Salvador", "Fortaleza"],
    bestbefore: true,
    validade: "2025-11-15",
    imagem_url: ["https://picsum.photos/seed/suco/400/300"],
    preco: 12.5,
    id: "prod007",
  },
  {
    nome: "Biscoito Integral de Aveia e Mel",
    categoria: "Snacks",
    descricao:
      "Crocrante, leve e saudável, feito com aveia integral e mel natural.",
    unidade: "200g",
    estoque: 45,
    produtor_id: "prod-008",
    cidades: ["Recife", "João Pessoa"],
    bestbefore: true,
    validade: "2026-01-05",
    imagem_url: ["https://picsum.photos/seed/biscoito/400/300"],
    preco: 15.9,
    id: "prod008",
  },
  {
    nome: "Molho de Tomate Artesanal",
    categoria: "Temperos",
    descricao:
      "Molho preparado com tomates frescos e temperos naturais. Sem corantes nem conservantes.",
    unidade: "340g",
    estoque: 35,
    produtor_id: "prod-009",
    cidades: ["São Paulo", "Campinas"],
    bestbefore: true,
    validade: "2025-12-20",
    imagem_url: ["https://picsum.photos/seed/molho/400/300"],
    preco: 14.2,
    id: "prod009",
  },
  {
    nome: "Chá de Camomila Natural",
    categoria: "Bebidas",
    descricao:
      "Camomila desidratada, ideal para relaxar e melhorar o sono. Cultivo orgânico.",
    unidade: "50g",
    estoque: 80,
    produtor_id: "prod-010",
    cidades: ["Curitiba", "Florianópolis"],
    bestbefore: true,
    validade: "2026-04-10",
    imagem_url: ["https://picsum.photos/seed/cha/400/300"],
    preco: 8.9,
    id: "prod010",
  },
];

export default function SignIn() {
  return (
    <div className="flex flex-col   items-center min-h-screen h-screen max-h-screen w-screen max-w-screen px-6 pt-2 pb-30 bg-fk-background/90">
      <Header showBackButton={false} />
      <div className="w-full flex items-center-safe justify-between max-w-lg gap-3">
        <Input
          LeftIcon={<FaSearch />}
          imputClass="bg-gray-400/60"
          placeholder="Pesquisar"
        />
        <button className="text-fk-primary active:text-fk-primary/40">
          <FaBars className="h-8 w-8" />
        </button>
      </div>
      <SelectCity />

      {PRODUCTS.map((product) => (
        <div key={product.id} className="text-black">
          {product.nome}
        </div>
      ))}
    </div>
  );
}
