import { FC, useState } from "react";
import { useNavigate } from "react-router-dom";

import labsterLogo from "@/assets/labster-logo.png";
import { UnderlinedLink } from "@/components/UnderlinedLink";
import { authService } from "@/services/authService";

const AuthPage: FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    name: "",
    city: "",
    study: ""
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const cities = [
    "Москва",
    "Санкт-Петербург",
    "Новосибирск",
    "Екатеринбург",
    "Казань",
    "Нижний Новгород",
    "Челябинск",
    "Самара",
    "Омск",
    "Ростов-на-Дону",
    "Уфа",
    "Красноярск",
    "Воронеж",
    "Пермь",
    "Волгоград"
  ];

  const studies = [
    "МГУ им. М.В. Ломоносова",
    "СПБГУ",
    "МФТИ",
    "ВШЭ",
    "МГТУ им. Баумана",
    "МГИМО",
    "РЭУ им. Плеханова",
    "МАИ",
    "МИФИ",
    "РГГУ",
    "Другой ВУЗ",
    "Колледж"
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (formData.password !== formData.confirmPassword) {
      setError("Пароли не совпадают");
      setLoading(false);
      return;
    }

    if (!formData.name || !formData.city || !formData.study) {
      setError("Заполните все поля");
      setLoading(false);
      return;
    }

    try {
      const userData = await authService.register({
        email: formData.email,
        password: formData.password,
        name: formData.name,
        city: formData.city,
        study: formData.study
      });


      localStorage.setItem('authorId', userData.id);
      localStorage.setItem('userName', userData.name);
      localStorage.setItem('user', JSON.stringify(userData));
      navigate("/");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Произошла ошибка при регистрации");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FFFFF5]">
      <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md">
        <div className="flex justify-center mb-6">
          <img src={labsterLogo} alt="Labster" className="h-16 w-16" />
        </div>
        <h1 className="text-2xl font-bold text-center mb-2">Регистрация</h1>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-sm font-medium text-gray-700 mb-2 block">
              Имя
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Введите ваше имя"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700 mb-2 block">
              Email
            </label>
            <input
              type="text"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Введите Ваш email"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700 mb-2 block">
              Город
            </label>
            <select
              name="city"
              value={formData.city}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
              required
            >
              <option value="">Выберите город</option>
              {cities.map(city => (
                <option key={city} value={city}>{city}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700 mb-2 block">
              Учебное заведение
            </label>
            <select
              name="study"
              value={formData.study}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
              required
            >
              <option value="">Выберите учебное заведение</option>
              {studies.map(study => (
                <option key={study} value={study}>{study}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700 mb-2 block">
              Пароль
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Введите пароль"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700 mb-2 block">
              Подтверждение пароля
            </label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Повторите пароль"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#FF684D] text-white py-2 rounded-md hover:bg-orange-600 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Регистрация..." : "Зарегистрироваться"}
          </button>
        </form>
        <div className="text-center mt-4">
          Есть аккаунт?{" "}
          <UnderlinedLink onClick={() => navigate("/login")}>
            Войти
          </UnderlinedLink>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;