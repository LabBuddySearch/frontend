import { FC } from "react";
import { useNavigate } from "react-router-dom";

import labsterLogo from "@/assets/labster-logo.png";
import { UnderlinedLink } from "@/components/UnderlinedLink";

const LoginPage: FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FFFFF5]">
      <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md">
        <div className="flex justify-center mb-6">
          <img src={labsterLogo} alt="Labster" className="h-16 w-16" />
        </div>
        <h1 className="text-2xl font-bold text-center mb-2">Вход в Labster</h1>
        <p className="text-gray-600 text-center mb-6">
          Введите логин и пароль, чтобы войти
        </p>
        <form className="space-y-4">
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="text-sm font-medium text-gray-700">Логин</label>
              <UnderlinedLink
                onClick={() => navigate("/forgot-password")}
                className="text-sm"
              >
                Забыли пароль?
              </UnderlinedLink>
            </div>
            <input
              type="email"
              placeholder="Введите логин"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700 mb-2 block">
              Пароль
            </label>
            <input
              type="password"
              placeholder="Введите пароль"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button
            type="submit"
            className="w-full text-white py-2 rounded-md hover:bg-orange-600 transition bg-[#FF684D]"
          >
            Войти
          </button>
        </form>
        <p className="text-center mt-4">
          Нет аккаунта?{" "}
          <UnderlinedLink onClick={() => navigate("/auth")}>
            Зарегистрироваться
          </UnderlinedLink>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
