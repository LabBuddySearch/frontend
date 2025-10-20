import React from 'react';
import NotFoundImage from '../assets/not-found-image.png';

function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#FFFFF5' }}>
      <div className="flex flex-col md:flex-row items-center justify-center w-full max-w-4xl mx-auto">
        <div className="flex flex-col items-center justify-center md:w-1/3 p-6">
          <h1 className="text-8xl font-bold" style={{ color: '#D81212' }}>
            404
          </h1>
          <p className="text-2xl mt-4" style={{ color: '#D81212' }}>
            Страница не найдена
          </p>
          <a
            href="/"
            className="inline-block mt-6 px-6 py-2 text-white font-medium rounded-md hover:bg-orange-600 transition"
            style={{ backgroundColor: '#FF684D' }}
          >
            На главную
          </a>
        </div>
        <div className="flex items-center justify-center md:w-1/2 p-6">
          <img
            src={NotFoundImage}
            alt="Not Found"
            className="w-full max-w-xs"
          />
        </div>
      </div>
    </div>
  );
}

export default NotFound;