import { FC, useState } from "react";
import { useNavigate } from "react-router-dom";

import { Button } from "@/components/Button";
import { MenuDropdown } from "@/components/MenuDropdown";

const SettingsPage: FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<"profile" | "password">("profile");
  const [profileData, setProfileData] = useState({
    login: "",
    university: "",
    city: "",
    course: "",
    contacts: [""]
  });
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: ""
  });

  const universities = [
    "МГУ им. М.В. Ломоносова",
    "СПБГУ",
    "МФТИ",
    "ВШЭ",
    "МГТУ им. Баумана",
    "МГИМО",
    "РЭУ им. Плеханова",
    "МАИ",
    "МИФИ",
    "РГГУ"
  ];

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

  const courses = ["1 курс", "2 курс", "3 курс", "4 курс", "5 курс", "6 курс"];

  const handleProfileSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Сохранены данные профиля:", profileData);
  };

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Смена пароля:", passwordData);
  };

  const addContactField = () => {
    if (profileData.contacts.length < 3) {
      setProfileData(prev => ({
        ...prev,
        contacts: [...prev.contacts, ""]
      }));
    }
  };

  const updateContact = (index: number, value: string) => {
    setProfileData(prev => ({
      ...prev,
      contacts: prev.contacts.map((contact, i) => i === index ? value : contact)
    }));
  };

  const removeContact = (index: number) => {
    if (profileData.contacts.length > 1) {
      setProfileData(prev => ({
        ...prev,
        contacts: prev.contacts.filter((_, i) => i !== index)
      }));
    }
  };

  return (
    <div className="min-h-screen flex bg-[#FFFFF5]">
      <aside className="w-96 min-w-96 border-r border-gray-200">
        <MenuDropdown />
      </aside>
      <main className="flex-1">
        <header className="h-[76px] flex justify-between items-center px-6">
          <h1 className="text-2xl">Настройки</h1>
          <div className="flex gap-4">
            <Button onClick={() => navigate("/")}>На главную</Button>
          </div>
        </header>

        <div className="p-6">
          <div className="flex border-b border-gray-200 mb-6">
            <button
              onClick={() => setActiveTab("profile")}
              className={`px-4 py-2 font-medium text-lg border-b-2 transition-colors ${
                activeTab === "profile"
                  ? "border-[#FF684D] text-[#FF684D]"
                  : "border-transparent text-gray-500 hover:text-gray-700"
              }`}
            >
              Профиль
            </button>
            <button
              onClick={() => setActiveTab("password")}
              className={`px-4 py-2 font-medium text-lg border-b-2 transition-colors ${
                activeTab === "password"
                  ? "border-[#FF684D] text-[#FF684D]"
                  : "border-transparent text-gray-500 hover:text-gray-700"
              }`}
            >
              Пароль
            </button>
          </div>

          {activeTab === "profile" && (
            <div className="max-w-2xl">
              <h2 className="text-xl font-semibold text-gray-900 mb-2">
                Личные данные
              </h2>
              <p className="text-gray-600 mb-6">
                Можете сменить данные
              </p>

              <form onSubmit={handleProfileSubmit} className="space-y-6">
                <div>
                  <label className="block text-lg font-semibold text-gray-900 mb-2">
                    Логин
                  </label>
                  <input
                    type="text"
                    value={profileData.login}
                    onChange={(e) => setProfileData(prev => ({ ...prev, login: e.target.value }))}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:border-[#FF684D] focus:outline-none"
                    placeholder="Введите логин"
                  />
                </div>

                <div>
                  <label className="block text-lg font-semibold text-gray-900 mb-2">
                    Вуз/колледж
                  </label>
                  <select
                    value={profileData.university}
                    onChange={(e) => setProfileData(prev => ({ ...prev, university: e.target.value }))}
                    className="w-full p-3 border border-gray-300 rounded-lg bg-white focus:border-[#FF684D] focus:outline-none"
                  >
                    <option value="">Выберите учебное заведение</option>
                    {universities.map(uni => (
                      <option key={uni} value={uni}>{uni}</option>
                    ))}
                  </select>
                </div>


                <div>
                  <label className="block text-lg font-semibold text-gray-900 mb-2">
                    Город
                  </label>
                  <select
                    value={profileData.city}
                    onChange={(e) => setProfileData(prev => ({ ...prev, city: e.target.value }))}
                    className="w-full p-3 border border-gray-300 rounded-lg bg-white focus:border-[#FF684D] focus:outline-none"
                  >
                    <option value="">Выберите город</option>
                    {cities.map(city => (
                      <option key={city} value={city}>{city}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-lg font-semibold text-gray-900 mb-2">
                    Курс
                  </label>
                  <select
                    value={profileData.course}
                    onChange={(e) => setProfileData(prev => ({ ...prev, course: e.target.value }))}
                    className="w-full p-3 border border-gray-300 rounded-lg bg-white focus:border-[#FF684D] focus:outline-none"
                  >
                    <option value="">Выберите курс</option>
                    {courses.map(course => (
                      <option key={course} value={course}>{course}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-lg font-semibold text-gray-900 mb-2">
                    Способы связи
                  </label>
                  <div className="space-y-3">
                    {profileData.contacts.map((contact, index) => (
                      <div key={index} className="flex gap-2">
                        <input
                          type="text"
                          value={contact}
                          onChange={(e) => updateContact(index, e.target.value)}
                          className="flex-1 p-3 border border-gray-300 rounded-lg focus:border-[#FF684D] focus:outline-none"
                          placeholder="Email, телефон, телеграмм или др."
                        />
                        {profileData.contacts.length > 1 && (
                          <button
                            type="button"
                            onClick={() => removeContact(index)}
                            className="px-4 py-2 border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-50 transition-colors"
                          >
                            ×
                          </button>
                        )}
                      </div>
                    ))}
                    {profileData.contacts.length < 3 && (
                      <button
                        type="button"
                        onClick={addContactField}
                        className="flex items-center gap-2 px-4 py-2 border border-dashed border-gray-300 rounded-lg text-gray-500 hover:border-gray-400 hover:text-gray-600 transition-colors"
                      >
                        <span>+</span>
                        Добавить способ связи
                      </button>
                    )}
                  </div>
                </div>

                <div className="flex gap-4 pt-4">
                  <button
                    type="button"
                    onClick={() => navigate("/")}
                    className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    Отмена
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2 bg-[#FF684D] text-white rounded-lg hover:bg-[#E55A40] transition-colors"
                  >
                    Сохранить
                  </button>
                </div>
              </form>
            </div>
          )}

          {activeTab === "password" && (
            <div className="max-w-2xl">
              <h2 className="text-xl font-semibold text-gray-900 mb-2">
                Изменение пароля
              </h2>
              <p className="text-gray-600 mb-6">
                Подберите или сгенерируйте сложный пароль, чтобы обеспечить безопасную работу
              </p>

              <form onSubmit={handlePasswordSubmit} className="space-y-6">
                <div>
                  <label className="block text-lg font-semibold text-gray-900 mb-2">
                    Текущий пароль
                  </label>
                  <input
                    type="password"
                    value={passwordData.currentPassword}
                    onChange={(e) => setPasswordData(prev => ({ ...prev, currentPassword: e.target.value }))}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:border-[#FF684D] focus:outline-none"
                    placeholder="Введите текущий пароль"
                  />
                </div>

                <div>
                  <label className="block text-lg font-semibold text-gray-900 mb-2">
                    Новый пароль
                  </label>
                  <input
                    type="password"
                    value={passwordData.newPassword}
                    onChange={(e) => setPasswordData(prev => ({ ...prev, newPassword: e.target.value }))}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:border-[#FF684D] focus:outline-none"
                    placeholder="Введите новый пароль"
                  />
                </div>

                <div>
                  <label className="block text-lg font-semibold text-gray-900 mb-2">
                    Повторите пароль
                  </label>
                  <input
                    type="password"
                    value={passwordData.confirmPassword}
                    onChange={(e) => setPasswordData(prev => ({ ...prev, confirmPassword: e.target.value }))}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:border-[#FF684D] focus:outline-none"
                    placeholder="Повторите новый пароль"
                  />
                </div>

                <div className="pt-4">
                  <button
                    type="submit"
                    className="px-6 py-2 bg-[#FF684D] text-white rounded-lg hover:bg-[#E55A40] transition-colors"
                  >
                    Сменить пароль
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default SettingsPage;