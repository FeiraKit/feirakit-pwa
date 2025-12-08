import { Header } from "@/app/components/header";

import { Feed } from "./components/feed";

export default function SignIn() {
  return (
    <div className="flex flex-col  items-center h-dvh max-h-dvh w-screen max-w-screen px-6 pt-2 pb-1 bg-fk-background/90">
      <Header showBackButton={false} showMenuButton />
      <Feed />
    </div>
  );
}
