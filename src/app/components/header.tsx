import Image from "next/image";

import BackButton from "./backButon";

type HeaderProps = {
  showBackButton: boolean;
};

export function Header({ showBackButton }: HeaderProps) {
  return (
    <header className="w-full h-16 flex items-center justify-center ">
      {showBackButton && <BackButton />}

      <Image
        className="drop-shadow-md contrast-100"
        src="/logo.png"
        alt="Feira Kit"
        width={180}
        height={38}
        priority
      />
    </header>
  );
}
