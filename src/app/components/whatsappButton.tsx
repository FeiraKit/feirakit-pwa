"use client";
import { Productdetails } from "@/stores/useProductStore";
import { FaWhatsapp } from "react-icons/fa";
import { useAuthStore, User } from "@/stores/useAuthStore";
import { link } from "fs";

type WhatsappButtonProps = {
  quantity: number;
  product: Productdetails;
};

const createOrderMessage = (
  product: Productdetails,
  quantity: number,
  customer: User
) => {
  const productName = product.nome;
  const productPrice = product.preco;
  const totalPrice = (productPrice * quantity).toFixed(2);
  const customerName = customer.nome;
  const custoemerAddress = `${customer.endereco.rua}, ${customer.endereco.numero}, ${customer.endereco.bairro}, ${customer.endereco.cidade} - ${customer.endereco.estado}, CEP: ${customer.endereco.cep}`;

  const Message = `🛍️ *Pedido Feira Kit* \n
    *******************\n
    Gostaria de comprar *${quantity} ${
    quantity > 1 ? `${product.unidade}s` : `${product.unidade}`
  }* do produto *${product.nome}*.\n
    *******************\n
    *Detalhes do Pedido:*\n
    - Produto: ${productName}\n
    - Quantidade: ${quantity}\n
    - Preço Total: R$ ${totalPrice}\n
    *******************\n
    👤 Cliente: ${customerName}
    📍 Endereço: ${custoemerAddress}\n
    Obrigado! 🙏 Aguardo a confirmação do pedido.
    `;

  const encodedMessage = encodeURIComponent(Message);
  //   mudar pro numero do vendedor em prod
  const phoneNumber = "5533987395971";
  OrderProduct(
    `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${encodedMessage}`
  );
};

const OrderProduct = (link: string) => {
  window.open(link, "_blank");
};

export function WhatsappButton({ quantity, product }: WhatsappButtonProps) {
  const User = useAuthStore((state) => state.usuario);

  return (
    <button
      className="w-full py-2 font-semibold bg-fk-green leading-relaxed active:bg-fk-green-hover rounded-xl text-2xl flex items-center justify-center gap-2 text-white shadow-lg shadow-fk-green/50"
      onClick={() => createOrderMessage(product, quantity, User!)}
    >
      <FaWhatsapp /> Comprar
    </button>
  );
}
