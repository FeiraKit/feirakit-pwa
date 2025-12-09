"use client";

import Input from "../../Input";
import { PatternFormat } from "react-number-format";
import { BRAZILIAN_STATES } from "@/app/data/states";
import { useFormContext } from "react-hook-form";
import { RegisterFormData } from "@/types/forms/userTypes";
import { toastInfo } from "@/app/utils/toasthelper";
import { useState } from "react";
import { SpinProgress } from "../../loadings/skeleton";

export default function Step2({}) {
  const {
    register,
    setValue,
    getValues,

    formState: { errors },
  } = useFormContext<RegisterFormData>();
  const [IsLoadingCep, setIsLoadingCep] = useState<boolean>(false);
  const handleCepBlur = async (cep: string) => {
    setIsLoadingCep(true);
    const cleanCep = cep.replace(/\D/g, "");
    if (cleanCep.length !== 8) return;

    try {
      const res = await fetch(`https://viacep.com.br/ws/${cleanCep}/json/`);
      const data = await res.json();

      if (data.erro) {
        toastInfo("Confira o CEP Informado");
        setIsLoadingCep(false);

        return;
      }

      setValue("endereco.rua", data.logradouro || "", {
        shouldValidate: true,
        shouldDirty: true,
        shouldTouch: true,
      });
      setValue("endereco.bairro", data.bairro || "", {
        shouldValidate: true,
        shouldDirty: true,
        shouldTouch: true,
      });
      setValue("endereco.cidade", data.localidade || "", {
        shouldValidate: true,
        shouldDirty: true,
        shouldTouch: true,
      });
      setValue("endereco.estado", data.uf || "", {
        shouldValidate: true,
        shouldDirty: true,
        shouldTouch: true,
      });
      setIsLoadingCep(false);
    } catch (error) {
      setIsLoadingCep(false);
      console.error("Erro ao buscar CEP:", error);
    }
  };

  return (
    <div className="flex flex-col  w-full ">
      <label className="mt-8" htmlFor="zipcode">
        CEP:
      </label>

      <PatternFormat
        {...register("endereco.cep")}
        type="tel"
        onBlur={(e) => handleCepBlur(e.target.value)}
        format="#####-###"
        placeholder="digite seu cep"
        customInput={Input}
        rigthIcon={IsLoadingCep ? <SpinProgress className="w-6 h-6" /> : <></>}
        value={getValues("endereco.cep")}
        onValueChange={(values) => {
          // atualiza o RHF
          setValue("endereco.cep", values.value, { shouldValidate: true });
        }}
      />

      {errors.endereco?.cep && (
        <span className="text-xs text-fk-error-text">
          {errors.endereco.cep.message as string}
        </span>
      )}

      <div className="flex justify-between mt-2">
        <div className="w-8/12">
          <label className="mt-2" htmlFor="street">
            Rua:
          </label>
          <Input id="street" placeholder="rua" {...register("endereco.rua")} />

          {errors.endereco?.rua && (
            <span className="text-xs text-fk-error-text">
              {errors.endereco.rua.message as string}
            </span>
          )}
        </div>

        <div className="w-3/12">
          <label className="mt-2" htmlFor="number">
            Número:
          </label>
          <Input
            id="number"
            placeholder="numero"
            {...register("endereco.numero")}
          />
          {errors.endereco?.numero && (
            <span className="text-xs text-fk-error-text ">Número</span>
          )}
        </div>
      </div>

      <label className="mt-2" htmlFor="complement">
        Complemeto
      </label>
      <Input
        id="complement"
        placeholder="complemento"
        {...register("endereco.complemento")}
      />
      {errors.endereco?.complemento && (
        <span className="text-xs text-fk-error-text">
          {errors.endereco.complemento.message as string}
        </span>
      )}

      <label className="mt-2" htmlFor="city">
        Bairro / Comunidade
      </label>
      <Input
        id="district"
        placeholder="Bairro"
        {...register("endereco.bairro")}
      />
      {errors.endereco?.bairro && (
        <span className="text-xs text-fk-error-text">
          {errors.endereco.bairro.message as string}
        </span>
      )}

      <label className="mt-2" htmlFor="city">
        Cidade
      </label>
      <Input
        id="city"
        placeholder="Cidade"
        {...register("endereco.cidade")}
        disabled={true}
      />
      {errors.endereco?.cidade && (
        <span className="text-xs text-fk-error-text">
          {errors.endereco.cidade.message as string}
        </span>
      )}

      <label className="mt-2" htmlFor="state">
        Estado
      </label>
      <select
        id="state"
        {...register("endereco.estado")}
        disabled={true}
        className="border-2 border-fk-primary/30   text-fk-primary  h-10 rounded-md w-full  outline-fk-primary placeholder:text-fk-primary/80 px-2"
      >
        <option value="">Selecione um Estado</option>
        {BRAZILIAN_STATES.map((state) => (
          <option value={state.value} key={state.value}>
            {state.label}
          </option>
        ))}
      </select>
      {errors.endereco?.estado && (
        <span className="text-xs text-fk-error-text">
          {errors.endereco.estado.message as string}
        </span>
      )}
    </div>
  );
}
