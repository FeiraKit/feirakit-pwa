"use client";

import { useEffect, useRef, useState } from "react";
import { FaCheck, FaPlus } from "react-icons/fa";

type MultipleSelectProps = {
  RHFvalue?: string[] | undefined;
  RHFonChange?: (arg0: string[]) => void;
  citiesOptions: string[];
  selectedCities: string[];
  setSelectedCities: (cities: string[]) => void;
};

export function MultipleCitiesSelect({
  citiesOptions,
  selectedCities,
  setSelectedCities,
  RHFonChange,
}: MultipleSelectProps) {
  const [isSelectOptionsVisible, setIsSelectOptionsVisible] = useState(false);
  const [filteredCities, setFilteredCities] = useState<string[]>(citiesOptions);
  function toggleSelectOptionsVisibility() {
    setIsSelectOptionsVisible(!isSelectOptionsVisible);
  }

  function checkISCitySelected(city: string) {
    return selectedCities.includes(city);
  }

  function toggleSelectCity(city: string) {
    if (checkISCitySelected(city)) {
      const filtered = selectedCities.filter((c) => c !== city);
      setSelectedCities(filtered);
      if (RHFonChange) {
        RHFonChange([...filtered]);
      }
      return;
    }

    setSelectedCities([...selectedCities, city]);
    if (RHFonChange) {
      RHFonChange([...selectedCities, city]);
    }
  }

  const filterCities = (search: string) => {
    const cities = citiesOptions.map((item: string) => item);
    const filtered = cities.filter((city: string) =>
      city.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredCities(filtered);
    console.log(selectedCities);
  };

  return (
    <div className="flex flex-col p-4 rounded-md w-full">
      {!isSelectOptionsVisible && (
        <button
          className="flex gap-2 justify-center items-center  p-2 border-2 border-dashed border-gray-600 rounded-md text-gray-600 cursor-pointer hover:border-fk-primary hover:text-fk-primary transition-all w-full"
          onClick={() => {
            toggleSelectOptionsVisibility();
          }}
        >
          <span>
            <FaPlus />
          </span>{" "}
          Selecione
        </button>
      )}
      {isSelectOptionsVisible && (
        <section className="mb-4 flex flex-1 flex-col">
          <div className="w-full">
            <input
              onChange={(e) => filterCities(e.currentTarget.value)}
              className="border-fk-primary/30 border text-fk-primary outline-fk-primary rounded-md h-10 w-full   placeholder:text-gray-400 pl-2"
              placeholder="Selecione uma cidade"
            />
          </div>
          <div className=" flex flex-1 flex-col max-h-100 border-fk-primary/30 border mt-2 mb-4 rounded-md p-2 border-t-0 gap-2">
            {filteredCities.map((city) => (
              <div
                key={city}
                className="border-b w-full border-fk-primary/20 py-2 flex justify-between items-center text-gray-800 active:bg-fk-primary/10 px-2 rounded-md"
                onClick={() => {
                  toggleSelectCity(city);
                }}
              >
                {city}
                {checkISCitySelected(city) && <FaCheck />}
              </div>
            ))}
          </div>
          <div className="w-full">
            <button
              className={`flex gap-2 justify-center items-center  p-2 border-2 rounded-md text-gray-600 cursor-pointer hover:border-fk-primary hover:text-fk-primary active:border-fk-primary active:text-fk-primary transition-colors w-full ${
                selectedCities.length >= 1
                  ? "border-fk-primary"
                  : "border-gray-600"
              }`}
              onClick={() => {
                toggleSelectOptionsVisibility();
              }}
            >
              Pronto
            </button>
          </div>
        </section>
      )}
    </div>
  );
}
