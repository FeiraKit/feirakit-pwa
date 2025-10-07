import { Header } from "@/app/components/header";
import Input from "@/app/components/Input";
import { FaBars, FaSearch } from "react-icons/fa";
import { SelectCity } from "./components/selectCity";

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
    </div>
  );
}
