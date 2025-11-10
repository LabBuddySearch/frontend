import { FC } from "react";

interface Props {
  id: string;
  isSelected: boolean;
  onClick: () => void;
}

export const CardMini: FC<Props> = ({ id, isSelected, onClick }: Props) => {
  return (
    <div
      onClick={onClick}
      className={`h-48 w-36 bg-[#FFFFF5] shadow-md border border-[${
        isSelected ? "#FF684D" : "#FFB4A7"
      }] p-3 rounded-xl flex flex-col cursor-pointer`}
    >
      <h2 className="text-base font-bold text-black text-center leading-tight break-words">
        Лабораторная работа №1
      </h2>

      <div className="mt-auto text-center">
        <p className="text-sm text-gray-600">МТУСИ</p>
        <p className="text-sm text-gray-600">Физика</p>
        <p className="text-sm text-gray-600">Лабораторная работа</p>
      </div>
    </div>
  );
};
