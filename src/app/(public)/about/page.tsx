import { Header } from "@/app/components/header";

export default function About() {
  return (
    <div className="flex flex-col justify-between  items-center min-h-dvh h-dvh max-h-dvh w-screen max-w-screen px-8 pt-2 bg-fk-background/90 overflow-hidden">
      <Header showBackButton />
      <section className="flex flex-col max-w-screen min-h-dvh overflow-scroll pb-30">
        <h2 className="text-fk-primary font-extrabold text-xl text-center">
          Sobre o Feira-Kit
        </h2>
        <p className="text-black mt-1 leading-relaxed whitespace-pre-line text-justify">
          O Feira Kit nasceu com a missão de transformar a maneira como a
          comunidade local acessa e adquire produtos, diretamente dos produtores
          da região. Em um mundo cada vez mais conectado, acreditamos que a
          tecnologia pode ser uma grande aliada para fomentar o comércio justo,
          sustentável e de qualidade.
          <br /> Nossa plataforma oferece uma feira livre virtual, onde
          produtores de alimentos frescos, produtos artesanais, e outros itens
          locais podem expor suas criações e oferecer a conveniência de compras
          online. A ideia é garantir que os consumidores possam adquirir uma
          variedade de produtos autênticos e de qualidade, sem sair de casa, ao
          mesmo tempo em que apoiam os pequenos produtores e artesãos locais.
          <br /> A Nossa Proposta,o <strong>Feira Kit</strong> foi pensado para
          ser mais que um simples e-commerce. Queremos criar um espaço de
          encontro entre pessoas que valorizam a produção local e o consumo
          consciente. <br />
          Com a plataforma, buscamos:
        </p>
        <ul className="text-black mt-1 leading-relaxed whitespace-pre-line text-justify">
          <li>
            <strong>Apoiar os pequenos produtores e artesãos locais:</strong>{" "}
            Muitos produtores e artesãos enfrentam dificuldades para expor seus
            produtos de forma eficiente e alcançar um público maior. O Fera Kit
            surge para ajudar esses profissionais a expandirem suas vendas, com
            uma vitrine virtual acessível e intuitiva.
          </li>
          <br />
          <li>
            <strong>Garantir qualidade e autenticidade:</strong> Ao comprar
            diretamente dos produtores e artesãos locais, você tem a certeza de
            que está adquirindo produtos frescos, autênticos e de qualidade, sem
            intermediários que impactem no preço ou na originalidade dos itens.
          </li>
          <br />
          <li>
            <strong>Variedade de produtos:</strong> No Feira Kit, você
            encontrará uma ampla gama de produtos, desde alimentos frescos e
            orgânicos até artesanato, roupas, cosméticos naturais e outros itens
            locais. Cada produto tem um toque especial, representando a cultura
            e o trabalho único de nossa região.
          </li>
          <br />
          <li>
            <strong>Facilidade e praticidade:</strong> Através de um sistema de
            compras online fácil de navegar, o Feira Kit proporciona uma
            experiência simples e eficiente. Os consumidores podem fazer suas
            compras a qualquer momento, de qualquer lugar, com entrega rápida e
            sem complicação.
          </li>
        </ul>
        <br />
        <p className="text-black mt-1 leading-relaxed whitespace-pre-line text-justify">
          Por Que Escolher o Feira Kit?
          <br /> Em um cenário onde a compra direta de produtos locais se torna
          cada vez mais valorizada, o Feira Kit oferece não apenas um meio de
          compra mais prático, mas também um vínculo mais forte com os
          produtores e artesãos da nossa comunidade, que são os verdadeiros
          protagonistas de nossa plataforma. Além disso, ao comprar no Feira
          Kit, você contribui para a economia local e participa ativamente da
          valorização de práticas sustentáveis. Seja você um consumidor que
          busca qualidade, autenticidade e frescor ou um produtor/artesão que
          quer expandir seus negócios, o Feira Kit é o espaço ideal para todos.
          Vamos juntos fortalecer nossa comunidade, apoiar quem produz e criar
          um mercado justo e sustentável para todos.
        </p>
      </section>
    </div>
  );
}
