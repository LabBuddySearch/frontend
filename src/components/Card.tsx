import { FC } from "react";
import { CardData } from "@/types/card";

interface CardProps {
  onClick?: () => void;
  cardData: CardData;
}

export const Card: FC<CardProps> = ({ cardData, onClick }) => {
  return (
    <div 
    onClick={onClick}
    className="h-96 w-72 bg-[#FFFFF5] shadow-md border border-[#FFB4A7] p-4 rounded-xl flex flex-col"
    >
      <h2 className="text-xl font-bold text-black text-center">
        {cardData.title}
      </h2>
      <p className="text-lg text-gray-700 mt-2 text-center">{cardData.subject}</p>
      <p className="text-lg text-gray-700 text-center">{cardData.type}</p>
      <div className="max-h-[150px] mt-4 rounded-md flex-grow overflow-y-auto custom-scrollbar">
        <p className="text-base font-light px-2 mt-2 text-gray-700">
         {cardData.description}
        </p>
      </div>
      <div className="mt-auto text-right">
        <p className="text-base text-gray-900 font-light">{cardData.university}</p>
        <p className="text-base text-gray-900 font-light">{cardData.course}</p>
        <p className="text-base text-gray-900 font-light">{cardData.date}</p>
      </div>
    </div>
  );
};
