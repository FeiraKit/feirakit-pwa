import { FaMinus, FaPlus } from "react-icons/fa6";

type QuantitySelectorProps = {
  quantity: number;
  onIncrease: () => void;
  onDecrease: () => void;
  unityType?: string;
};

export function QuantitySelector({
  quantity,
  onIncrease,
  onDecrease,
  unityType,
}: QuantitySelectorProps) {
  return (
    <div className="flex flex-col items-center justify-center ">
      <p className="text-lg text-gray-700">Quantidade:</p>
      <div className="flex justify-center ">
        <button
          onClick={onDecrease}
          className=" text-fk-primary px-3 py-1  active:opacity-50"
        >
          <FaMinus className="text-2xl" />
        </button>

        <span className="text-2xl text-fk-primary font-bold">{quantity}</span>

        <button
          onClick={onIncrease}
          className=" text-fk-primary px-3 py-1  active:opacity-50"
        >
          <FaPlus className="text-2xl" />
        </button>
      </div>
      <p className="text-lg text-fk-primary -mt-2">
        {quantity === 1 ? `${unityType}` : `${unityType}s`}
      </p>
    </div>
  );
}
