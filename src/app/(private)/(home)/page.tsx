import { Header } from "@/app/components/header";

import { Feed } from "./components/feed";

export default function SignIn() {
  return (
    <div className="flex flex-col  items-center min-h-screen h-screen max-h-screen w-screen max-w-screen px-6 pt-2 pb-30 bg-fk-background/90">
      <Header showBackButton={false} showMenuButton />
      <Feed />
    </div>
  );
}
