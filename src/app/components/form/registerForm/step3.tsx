"use client";

import { FaWhatsapp } from "react-icons/fa6";

import Input from "../../Input";
import { PatternFormat } from "react-number-format";
import { useFormContext } from "react-hook-form";
import { RegisterFormData } from "@/types/forms/userTypes";

type Step3Props = {
  openTermsModal: () => void;
  openPolicyModal: () => void;
};

export default function Step3({ openTermsModal, openPolicyModal }: Step3Props) {
  const {
    register,
    setValue,
    getValues,
    formState: { errors },
  } = useFormContext<RegisterFormData>();
  return (
    <div className="flex flex-col  w-full ">
      <label className="mt-8" htmlFor="nome">
        Whatsapp:
      </label>

      <PatternFormat
        {...register("telefone")}
        format="(##) #####-####"
        placeholder="(99) 99999-9999"
        value={getValues("telefone")}
        LeftIcon={<FaWhatsapp />}
        customInput={Input}
        onValueChange={(values) => {
          // atualiza o RHF
          setValue("telefone", values.value, { shouldValidate: true });
        }}
      />
      {errors.telefone && (
        <span className="text-xs text-fk-error-text">
          {errors.telefone.message as string}
        </span>
      )}

      <div className="flex gap-1">
        <input type="checkbox" {...register("acceptTerm")} />
        <p>
          Aceito os{" "}
          <button className="text-fk-primary" onClick={() => openTermsModal()}>
            Termos e Condições
          </button>
        </p>
      </div>
      {errors.acceptTerm && (
        <span className="text-xs text-fk-error-text">
          {errors.acceptTerm.message as string}
        </span>
      )}

      <div className="flex gap-1">
        <input type="checkbox" {...register("acceptPolicy")} />
        <p>
          Aceito a{" "}
          <button className="text-fk-primary" onClick={() => openPolicyModal()}>
            Políticas de privacidade
          </button>
        </p>
      </div>
      {errors.acceptPolicy && (
        <span className="text-xs text-fk-error-text">
          {errors.acceptPolicy.message as string}
        </span>
      )}
    </div>
  );
}
