"use Client";

type ButtonProp = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  text: string;
};

export default function BaseButton({ text, className, ...props }: ButtonProp) {
  return (
    <button
      className={`w-full h-12 text-lg capitalize border rounded-md bg-fk-primary text-fk-background  hover:bg-fk-green-hover active:bg-fk-green-hover  transition-all ${
        className ?? ""
      }`}
      {...props}
    >
      {text}
    </button>
  );
}
