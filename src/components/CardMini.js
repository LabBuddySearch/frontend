import React from 'react';

function CardMini() {
  return (
    <div
      className="w-36 bg-[#FFFFF5] shadow-md border border-[#FFB4A7] p-3 rounded-xl flex flex-col"
      style={{ aspectRatio: '0.75' }}
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
}

export default CardMini;