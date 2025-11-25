"use client";

import { Controller, useFormContext } from "react-hook-form";
import { addProductFormData } from "../../page";

import { Label } from "@/app/components/Label";
import { MultipleSelect } from "@/app/components/multipleSelect";
import { useProductConfigStore } from "@/stores/useProductConfigStore";
import { useState } from "react";
import { SelectedCityItem } from "../selectedCityItem";

export function Step3() {
  const {
    control,
    getValues,
    setValue,
    formState: { errors },
  } = useFormContext<addProductFormData>();
  const availableCities = useProductConfigStore(
    (state) => state.availableCities
  );

  const [selectedCities, setSelectedCities] = useState<string[]>(
    getValues("cidades")
  );

  const onRemoveCity = (newCities: string[]) => {
    setSelectedCities(newCities);
    setValue("cidades", newCities, { shouldValidate: true });
  };
  return (
    <div className="flex flex-1 flex-col ">
      <h1 className=" text-xl text-black/90">
        Em Quais cidades seu produto estará disponível?
      </h1>
      <section className="flex flex-1 flex-col ">
        <div className="flex flex-col">
          <Label text={`escolha uma ou mais cidades`} />
          <p className=" text-gray-600 text-sm justify-center text-center">{`${
            selectedCities.length
          } cidade${selectedCities.length > 1 ? "s" : ""}  selecionada${
            selectedCities.length > 1 ? "s" : ""
          } `}</p>
          {errors.cidades && (
            <span className="text-red-600 text-sm mt-1">
              {errors.cidades.message}
            </span>
          )}
          <Controller
            name="cidades"
            control={control}
            render={({ field }) => (
              <MultipleSelect
                selectedCities={selectedCities}
                citiesOptions={availableCities}
                setSelectedCities={setSelectedCities}
                RHFonChange={field.onChange}
              />
            )}
          />

          {selectedCities.map((city) => (
            <SelectedCityItem
              key={city}
              city={city}
              handleCity={onRemoveCity}
              selectedCities={selectedCities}
            />
          ))}
        </div>
      </section>
    </div>
  );
}
