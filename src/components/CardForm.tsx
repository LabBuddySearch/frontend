import { FC, useState } from "react";

interface CardFormData {
  workType: string;
  subject: string;
  title: string;
  description: string;
  files: File[];
  university: string;
  city: string;
  course: string;
  color: string;
  shadow: string;
}

interface CardFormProps {
  initialData?: Partial<CardFormData>;
  isEditing?: boolean;
  onSubmit: (data: CardFormData) => void;
  onCancel: () => void;
  loading?: boolean;
}

const workTypes = [
  "Контрольная работа",
  "Самостоятельная работа",
  "Лабораторная работа",
  "Курсовая работа",
  "Зачет",
  "Экзамен",
  "Диплом"
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

const colorOptions = [
  { border: "#FFB4A7", shadow: "rgba(255, 180, 167, 0.3)" },
  { border: "#FFD166", shadow: "rgba(255, 209, 102, 0.3)" },
  { border: "#06D6A0", shadow: "rgba(6, 214, 160, 0.3)" },
  { border: "#118AB2", shadow: "rgba(17, 138, 178, 0.3)" },
  { border: "#073B4C", shadow: "rgba(7, 59, 76, 0.3)" },
  { border: "#EF476F", shadow: "rgba(239, 71, 111, 0.3)" },
  { border: "#7209B7", shadow: "rgba(114, 9, 183, 0.3)" },
  { border: "#F72585", shadow: "rgba(247, 37, 133, 0.3)" },
  { border: "#4CC9F0", shadow: "rgba(76, 201, 240, 0.3)" },
  { border: "#4361EE", shadow: "rgba(67, 97, 238, 0.3)" }
];

export const CardForm: FC<CardFormProps> = ({
  initialData = {},
  isEditing = false,
  onSubmit,
  onCancel,
  loading = false
}) => {
  const [formData, setFormData] = useState<CardFormData>({
    workType: "",
    subject: "",
    title: "",
    description: "",
    files: [],
    university: "",
    course: "",
    city: "",
    color: "#FFB4A7",
    shadow: "rgba(255, 180, 167, 0.3)",
    ...initialData
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFormData(prev => ({
        ...prev,
        files: Array.from(e.target.files!)
      }));
    }
  };

  const handleColorChange = (color: string, shadow: string) => {
    setFormData(prev => ({ ...prev, color, shadow }));
  };

  return (
    <div className="h-[calc(100vh-76px)] p-6">
      <form onSubmit={handleSubmit} className="h-full grid grid-cols-2 gap-8">
        <div className="space-y-6 overflow-y-auto pr-4">
          <div>
            <label className="block text-lg font-semibold text-gray-900 mb-2">
              Тип работы
            </label>
            <select
              value={formData.workType}
              onChange={(e) => setFormData(prev => ({ ...prev, workType: e.target.value }))}
              className="w-full p-3 border border-gray-300 rounded-lg bg-white focus:border-[#FF684D] focus:outline-none"
            >
              <option value="">Выберите тип работы</option>
              {workTypes.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-lg font-semibold text-gray-900 mb-2">
              Предмет
            </label>
            <input
              type="text"
              value={formData.subject}
              onChange={(e) => setFormData(prev => ({ ...prev, subject: e.target.value }))}
              className="w-full p-3 border border-gray-300 rounded-lg focus:border-[#FF684D] focus:outline-none"
              placeholder="Введите предмет"
            />
          </div>

          <div>
            <label className="block text-lg font-semibold text-gray-900 mb-2">
              Название
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
              className="w-full p-3 border border-gray-300 rounded-lg focus:border-[#FF684D] focus:outline-none"
              placeholder="Введите название работы"
            />
          </div>

          <div>
            <label className="block text-lg font-semibold text-gray-900 mb-2">
              Описание
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              rows={6}
              className="w-full p-3 border border-gray-300 rounded-lg focus:border-[#FF684D] focus:outline-none resize-none custom-scrollbar"
              placeholder="Введите описание работы"
            />
          </div>

          <div>
            <label className="block text-lg font-semibold text-gray-900 mb-2">
              Файлы
            </label>
            <div className="relative">
              <input
                type="file"
                multiple
                onChange={handleFileChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:border-[#FF684D] focus:outline-none opacity-0 absolute z-10 cursor-pointer"
              />
              <div className="w-full p-3 border border-gray-300 rounded-lg bg-white flex items-center gap-2">
                <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
                </svg>
                <span className="text-gray-500">
                  {formData.files.length > 0 
                    ? `Выбрано файлов: ${formData.files.length}`
                    : "Прикрепите файлы"
                  }
                </span>
              </div>
            </div>
          </div>

          <div>
            <label className="block text-lg font-semibold text-gray-900 mb-2">
              Вуз/колледж
            </label>
            <input
              type="text"
              value={formData.university}
              onChange={(e) => setFormData(prev => ({ ...prev, university: e.target.value }))}
              className="w-full p-3 border border-gray-300 rounded-lg focus:border-[#FF684D] focus:outline-none"
              placeholder="Введите название учебного заведения"
            />
          </div>
          <div>
            <label className="block text-lg font-semibold text-gray-900 mb-2">
              Город
            </label>
            <select
              value={formData.city}
              onChange={(e) => setFormData(prev => ({ ...prev, city: e.target.value }))}
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
              value={formData.course}
              onChange={(e) => setFormData(prev => ({ ...prev, course: e.target.value }))}
              className="w-full p-3 border border-gray-300 rounded-lg bg-white focus:border-[#FF684D] focus:outline-none"
            >
              <option value="">Выберите курс</option>
              {courses.map(course => (
                <option key={course} value={course}>{course}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex flex-col">
          <div 
            className="h-96 w-72 bg-[#FFFFF5] shadow-md border p-4 rounded-xl flex flex-col mx-auto mb-8 transition-all duration-200"
            style={{ 
              borderColor: formData.color,
              boxShadow: `0 4px 20px ${formData.shadow}`
            }}
          >
            <h2 className="text-xl font-bold text-black text-center">
              {formData.title || "Название работы"}
            </h2>
            <p className="text-lg text-gray-700 mt-2 text-center">{formData.subject || "Предмет"}</p>
            <p className="text-lg text-gray-700 text-center">{formData.workType || "Тип работы"}</p>
            <div className="max-h-[150px] mt-4 rounded-md flex-grow overflow-y-auto custom-scrollbar">
              <p className="text-base font-light px-2 mt-2 text-gray-700">
                {formData.description || "Описание работы будет отображаться здесь"}
              </p>
            </div>
            <div className="mt-auto text-right">
              <p className="text-base text-gray-900 font-light">{formData.university || "Учебное заведение"}</p>
              <p className="text-base text-gray-900 font-light">{formData.course || "Курс"}</p>
              <p className="text-base text-gray-900 font-light">{new Date().toLocaleDateString()}</p>
            </div>
          </div>
          <div className="flex flex-col items-center gap-2">
            <div className="grid grid-cols-5 gap-6">
                {colorOptions.map((colorOption) => (
                <button
                    key={colorOption.border}
                    type="button"
                    onClick={() => handleColorChange(colorOption.border, colorOption.shadow)}
                    className={`w-8 h-10 rounded-md border-2 transition-all ${
                    formData.color === colorOption.border 
                        ? 'border-gray-800 scale-110' 
                        : 'border-gray-300 hover:scale-105'
                    }`}
                    style={{ backgroundColor: colorOption.border }}
                    title={`Цвет: ${colorOption.border}`}
                />
                ))}
            </div>
          </div>

          <div className="flex gap-4 justify-center mt-8">
            <button
              type="button"
              onClick={onCancel}
              className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Отмена
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-[#FF684D] text-white rounded-lg hover:bg-[#E55A40] transition-colors"
            >
              {isEditing ? "Сохранить" : "Добавить"}
              {loading ? "Сохранение..." : (isEditing ? "Сохранить" : "Добавить")}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};