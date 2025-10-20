import React from 'react';

function Card() {
  return (
    <div
      className="w-72 bg-[#FFFFF5] shadow-md border border-[#FFB4A7] p-4 rounded-xl flex flex-col"
      style={{ aspectRatio: '0.75' }}
    >
      <h2 className="text-xl font-bold text-black text-center">Лабораторная работа №1</h2>
      <p className="text-lg text-gray-800 mt-2 text-center">Физика</p>
      <p className="text-lg text-gray-800 text-center">Лабораторная работа</p>
      <div
        className="mt-4 rounded-md flex-grow overflow-y-auto custom-scrollbar"
        style={{ maxHeight: '150px' }}
      >
        <p className="text-base px-2 mt-2 text-gray-500">
          Исследование закона Архимеда с использованием лабораторного оборудования. 
          В ходе эксперимента измеряется выталкивающая сила, действующая на тело, 
          погружённое в жидкость, и проверяется соответствие теоретическим расчётам. 
          Эксперимент включает использование различных жидкостей и тел с разной плотностью, 
          чтобы подтвердить зависимость силы Архимеда от плотности жидкости и объёма тела.
        </p>
      </div>
      <div className="mt-auto text-right">
        <p className="text-sm text-gray-600">МГУ</p>
        <p className="text-sm text-gray-600">2 курс</p>
        <p className="text-sm text-gray-600">20.10.2025</p>
      </div>
    </div>
  );
}

export default Card;