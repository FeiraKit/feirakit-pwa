import Image from "next/image";

import BackButton from "./backButon";

import { DrawerButton } from "./drawerButton";
import Link from "next/link";

type HeaderProps = {
  showBackButton: boolean;
  showMenuButton?: boolean;
  backToHome?: boolean;
};

export function Header({
  showBackButton,
  showMenuButton,
  backToHome,
}: HeaderProps) {
  return (
    <header className="w-full h-16 flex items-center justify-center relative">
      {showBackButton && (
        <div className="absolute left-0">
          <BackButton backtoHome={backToHome ? backToHome : false} />
        </div>
      )}
      <div>
        <Link href={"/"}>
          <Image
            className="drop-shadow-md contrast-100"
            src="/logo.png"
            alt="Feira Kit"
            width={180}
            height={38}
            priority
          />
        </Link>
      </div>

      {showMenuButton && <DrawerButton />}
    </header>
  );
}
