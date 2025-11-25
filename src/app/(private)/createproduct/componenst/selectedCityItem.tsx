type SelectCityItemProps = {
  city: string;
  handleCity: (cities: string[]) => void;
  selectedCities: string[];
};

export function SelectedCityItem({
  city,
  handleCity,
  selectedCities,
}: SelectCityItemProps) {
  const removeCity = (city: string) => {
    const newCities = selectedCities.filter((c) => c !== city);
    handleCity(newCities);
  };

  return (
    <div className="flex items-center bg-gray-200 rounded-full px-3 py-1 m-1 gap-2">
      <button
        className="text-sm text-gray-500 hover:text-gray-700 active:text-gray-700"
        onClick={() => removeCity(city)}
      >
        X
      </button>
      <span className="text-sm mr-2">{city}</span>
    </div>
  );
}
