import Image from "next/image";
import Link from "next/link";

export type ProductType = {
  nome: string;
  categoria: string;
  descricao: string;
  unidade: string;
  estoque: number;
  produtor_id: string;
  cidades: string[];
  bestbefore: boolean;
  validade: string;
  imagem_url: string[];
  preco: number;
  id: string;
};
type ProductItemProps = {
  product: ProductType;
};

export function ProductItem({ product }: ProductItemProps) {
  return (
    <Link href={`/product/${product.id}`}>
      <div className="rounded-lg shadow-md overflow-hidden mb-4 text-black  border p-2 pb-4 border-fk-primary/60 gap-2  flex flex-col h-80 justify-between">
        <div className="relative w-full h-40 self-center flex items-center justify-center">
          <Image
            className="object-cover rounded-sm "
            src={product.imagem_url[0]}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            fill
            alt={product.nome}
          />
        </div>
        <div>
          <h3 className="text-lg font-semibold  line-clamp-1 text-ellipsis">
            {product.nome}
          </h3>
          <p className="text-md   text-ellipsis line-clamp-2">
            {product.descricao}
          </p>
        </div>
        <div>
          <p className="text-xl text-black font-bold mt-1 justify-end">
            R$ {product.preco.toFixed(2)}
          </p>
        </div>
      </div>
    </Link>
  );
}
