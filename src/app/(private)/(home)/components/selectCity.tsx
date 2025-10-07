"use client";
import { useEffect, useRef, useState } from "react";
import { FaCheck, FaLocationDot } from "react-icons/fa6";

const cities = [
  "São Paulo",
  "Rio de Janeiro",
  "Belo Horizonte",
  "Salvador",
  "Curitiba",
  "Porto Alegre",
  "Recife",
  "Fortaleza",
  "Brasília",
  "Manaus",
];

export function SelectCity() {
  const [currentCity, setCurrentCity] = useState<string>("");
  const [availableCities, setAvailableCities] = useState<string[]>(cities);
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
    const filtered = cities.filter((city) =>
      city.toLowerCase().includes(search.toLowerCase())
    );
    setAvailableCities(filtered);
  };

  return (
    <div
      className="text-gray-600 max-w-full flex flex-col items-start-safe  border-fk-primary/30  rounded-md w-full   cursor-pointer mt-2 items-center   "
      onFocus={() => setShowList(true)}
      ref={WrapperCityDiv}
    >
      <div className="w-full flex items-center-safe ">
        <FaLocationDot />
        <input
          ref={InputCity}
          onChange={(e) => filterCities(e.target.value)}
          className="ml-2 text-xl outline-0 ring-0"
          placeholder="Selecione sua cidade"
        />
      </div>

      {showList && (
        <div className="w-full flex flex-col items-start-safe justify-between max-w-lg text-lg gap-1 border border-t-0  border-fk-primary/30 mt-2 max-h-50 overflow-y-scroll px-2 pb-4  rounded-b-md">
          {availableCities.map((city) => (
            <div
              key={city}
              className="border-b w-full border-fk-primary/20 py-1 flex justify-between items-center text-gray-800 active:bg-fk-primary/10 px-2 rounded-md"
              onClick={() => {
                if (city === currentCity) {
                  setCurrentCity("");
                  return;
                }
                setCurrentCity(city);
              }}
            >
              {city}
              {city === currentCity && <FaCheck />}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
