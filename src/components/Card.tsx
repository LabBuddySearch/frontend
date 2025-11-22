import { FC } from "react";

interface CardProps {
  onClick?: () => void;
}

export const Card: FC<CardProps> = ({ onClick }) => {
  return (
    <div 
    onClick={onClick}
    className="h-96 w-72 bg-[#FFFFF5] shadow-md border border-[#FFB4A7] p-4 rounded-xl flex flex-col"
    >
      <h2 className="text-xl font-bold text-black text-center">
        Лабораторная работа №1
      </h2>
      <p className="text-lg text-gray-700 mt-2 text-center">Физика</p>
      <p className="text-lg text-gray-700 text-center">Лабораторная работа</p>
      <div className="max-h-[150px] mt-4 rounded-md flex-grow overflow-y-auto custom-scrollbar">
        <p className="text-base font-light px-2 mt-2 text-gray-700">
          Исследование закона Архимеда с использованием лабораторного
          оборудования. В ходе эксперимента измеряется выталкивающая сила,
          действующая на тело, погружённое в жидкость, и проверяется
          соответствие теоретическим расчётам. Эксперимент включает
          использование различных жидкостей и тел с разной плотностью, чтобы
          подтвердить зависимость силы Архимеда от плотности жидкости и объёма
          тела.
        </p>
      </div>
      <div className="mt-auto text-right">
        <p className="text-base text-gray-900 font-light">МГУ</p>
        <p className="text-base text-gray-900 font-light">2 курс</p>
        <p className="text-base text-gray-900 font-light">20.10.2025</p>
      </div>
    </div>
  );
};
