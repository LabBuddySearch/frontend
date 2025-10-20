import React from 'react';
import LabsterLogo from '../assets/labster-logo.png';

function Login() {
  return (
    <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#FFFFF5' }}>
      <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md">
        <div className="flex justify-center mb-6">
          <img
            src={LabsterLogo}
            alt="Labster"
            className="h-16 w-16"
          />
        </div>
        <h1 className="text-2xl font-bold text-center mb-2">Регистрация</h1>
        <form className="space-y-4">
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="text-sm font-medium text-gray-700">Логин</label>
            </div>
            <input
              type="email"
              placeholder="Email"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700 mb-2 block">Пароль</label>
            <input
              type="password"
              placeholder="Пароль"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
           <div>
            <label className="text-sm font-medium text-gray-700 mb-2 block">Повторите пароль</label>
            <input
              type="repeat_password"
              placeholder="Повторите пароль"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button
            type="submit"
            className="w-full text-white py-2 rounded-md hover:bg-orange-600 transition"
            style={{ backgroundColor: '#FF684D' }}
          >
            Зарегистрироваться
          </button>
        </form>
        <p className="text-center mt-4">
          Есть аккаунт?{' '}
          <a href="/login" className="text-blue-500 hover:underline">
            Войти
          </a>
        </p>
      </div>
    </div>
  );
}

export default Login;