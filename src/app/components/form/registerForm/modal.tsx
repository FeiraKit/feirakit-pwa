import BaseButton from "../../baseButton";

type ModalProps = {
  text: string;
  title: string;
  onClose: () => void;
};

export default function Modal({ text, title, onClose }: ModalProps) {
  return (
    <div className="flex w-full h-full max-h-full absolute justify-center items-center -mt-10">
      <div className=" w-[80vw] h-[80vh] overflow-y-scroll   bottom-auto bg-fk-background p-2">
        <h2 className="text-fk-primary font-extrabold text-xl text-center">
          {title}
        </h2>
        <p className="text-black mt-1 leading-relaxed whitespace-pre-line">
          {text}
        </p>
        <BaseButton text="Entendi" onClick={() => onClose()} />
      </div>
    </div>
  );
}
