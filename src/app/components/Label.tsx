type LabelProps = React.LabelHTMLAttributes<HTMLLabelElement> & {
  text: string;
};

export function Label({ text, ...props }: LabelProps) {
  return (
    <label className=" ml-2 text-xl text-gray-800" {...props}>
      {text}
    </label>
  );
}
