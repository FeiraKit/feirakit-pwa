type StepIndicatorProps = {
  customClass?: string;
  length: number;
  step: number;
  fillDots?: true;
};

export function StepIndicator({
  step,
  length,
  customClass,
}: StepIndicatorProps) {
  const steps = Array.from({ length });

  return (
    <div className="flex gap-2">
      {steps.map((_, index) => (
        <div
          key={index}
          className={`${
            step === index + 1 ? "w-6 bg-fk-primary" : "w-3 bg-gray-400"
          } h-3  rounded-full transition-all duration-75 ${
            customClass && customClass
          }`}
        />
      ))}
    </div>
  );
}
