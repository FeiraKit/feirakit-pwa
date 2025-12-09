"use client";

import { useEffect, useRef, useState } from "react";
import { FaCheck, FaLocationDot, FaX } from "react-icons/fa6";
import { TbFaceIdError } from "react-icons/tb";

import { useProductConfig } from "../../hooks/useProductConfig";
import { Spin } from "./loadings/skeleton";

type SelectCityProps = {
  currentCity: string;
  setCurrentCity: (city: string) => void;
};

export function SelectCity({ currentCity, setCurrentCity }: SelectCityProps) {
  const { configs, loading, error } = useProductConfig();
  const [availableCities, setAvailableCities] = useState<string[]>([]);
  const [showList, setShowList] = useState<boolean>(false);
  const WrapperCityDiv = useRef<HTMLDivElement>(null);
  const InputCity = useRef<HTMLInputElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent | TouchEvent) {
      if (
        WrapperCityDiv.current &&
        !WrapperCityDiv.current.contains(event.target as Node)
      ) {
        setShowList(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, []);

  const filterCities = (search: string) => {
    if (!configs) {
      return;
    }
    const cities = configs.cidades.map((item) => item);
    const filtered = cities.filter((city: string) =>
      city.toLowerCase().includes(search.toLowerCase())
    );
    setAvailableCities(filtered);
  };
  useEffect(() => {
    if (!configs) return;
    setAvailableCities(configs.cidades);
  }, [configs]);

  return (
    <div
      className="text-gray-600 max-w-full flex flex-col items-start-safe  border-fk-primary/30  rounded-md w-full   cursor-pointer mt-2 items-center   relative "
      onFocus={() => setShowList(true)}
      ref={WrapperCityDiv}
    >
      <div className="w-full flex items-center-safe ">
        {(currentCity !== "" || InputCity.current?.value !== "") && (
          <div
            className="mr-2"
            onClick={() => {
              setCurrentCity("");
              InputCity.current!.value = "";
              setShowList(false);
            }}
          >
            <FaX className="h-3 w-3 " />
          </div>
        )}
        <FaLocationDot />

        <input
          ref={InputCity}
          defaultValue={currentCity ? currentCity : ""}
          onChange={(e) => filterCities(e.currentTarget.value)}
          className="ml-2 text-xl outline-0 ring-0"
          placeholder="Selecione sua cidade"
        />
      </div>

      {showList && (
        <div className="w-full flex flex-col items-start-safe justify-between max-w-lg text-lg gap-1 border border-t-0  border-fk-primary/30 mt-2 max-h-50 overflow-y-scroll px-2 pb-4  rounded-b-md">
          <div
            className="absolute top-0 right-0"
            onClick={() => setShowList(false)}
          >
            <FaX className="h-6 w-6 text-fk-primary/80 active:text-fk-primary/60" />
          </div>
          {loading && (
            <div className="w-full flex flex-col text-center text-gray-400 py-4">
              <Spin
                className="w-8 h-8 self-center"
                custonBorder="order-fk-primary dark:border-fk-primary"
              />
            </div>
          )}

          {availableCities.map((city) => (
            <div
              key={city}
              className="border-b w-full border-fk-primary/20 py-1 flex justify-between items-center text-gray-800 active:bg-fk-primary/10 px-2 rounded-md"
              onClick={() => {
                if (city === currentCity) {
                  setCurrentCity("");
                  InputCity.current!.value = "";
                  return;
                }
                InputCity.current!.value = city;
                setCurrentCity(city);
              }}
            >
              {city}
              {city === currentCity && <FaCheck />}
            </div>
          ))}

          {!loading && error && (
            <div className="flex justify-center items-center gap-2 w-full text-center text-gray-400 py-4">
              <TbFaceIdError className="text-red-300" size={32} /> erro ao
              carregar configurações
            </div>
          )}

          {!loading && !error && availableCities.length === 0 && (
            <div className="w-full text-center text-gray-400 py-4">
              Nenhum produto nesta cidade
            </div>
          )}
        </div>
      )}
    </div>
  );
}
