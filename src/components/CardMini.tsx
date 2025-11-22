import { FC } from "react";
import { CardData } from "@/types/card";

interface Props {
  cardData: CardData;
  isSelected: boolean;
  onClick: () => void;
}

export const CardMini: FC<Props> = ({ 
  cardData,
  isSelected, 
  onClick
}: Props) => {
  return (
    <div
      onClick={onClick}
      className={`h-48 w-36 bg-[#FFFFF5] shadow-md border border-[${
        isSelected ? "#FF684D" : "#FFB4A7"
      }] p-3 rounded-xl flex flex-col cursor-pointer`}
    >
      <h2 className="text-base font-bold text-black text-center leading-tight break-words">
        {cardData.title}
      </h2>

      <div className="mt-auto text-center">
        <p className="text-sm text-gray-600">{cardData.university}</p>
        <p className="text-sm text-gray-600">{cardData.subject}</p>
        <p className="text-sm text-gray-600">{cardData.type}</p>
      </div>
    </div>
  );
};