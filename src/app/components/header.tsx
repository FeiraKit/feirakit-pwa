import Image from "next/image";

import BackButton from "./backButon";
import { FaBars } from "react-icons/fa6";

type HeaderProps = {
  showBackButton: boolean;
  showMenuButton?: boolean;
};

export function Header({ showBackButton, showMenuButton }: HeaderProps) {
  return (
    <header className="w-full h-16 flex items-center justify-center relative ">
      {showBackButton && (
        <div className="absolute left-0">
          <BackButton />
        </div>
      )}
      <div>
        <Image
          className="drop-shadow-md contrast-100"
          src="/logo.png"
          alt="Feira Kit"
          width={180}
          height={38}
          priority
        />
      </div>

      {showMenuButton && (
        <button className="text-fk-primary active:text-fk-primary/40 absolute right-6">
          <FaBars className="h-8 w-8" />
        </button>
      )}
    </header>
  );
}
