import { FC, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CardForm } from "@/components/CardForm";
import { cardService } from "@/services/cardService";

const MyCardsCreatePage: FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (data: any) => {
    setLoading(true);
    setError("");

    try {
      console.log('=== ДАННЫЕ ИЗ LOCALSTORAGE ===');
      const authorId = localStorage.getItem('authorId');

      if (!authorId) {
        throw new Error('Не авторизован — войдите заново');
      }

      const courseNumber = parseInt(data.course) || 1;

      const cardData = {
        authorId: authorId,
        type: data.workType,
        subject: data.subject,
        title: data.title,
        course: courseNumber,
        description: data.description,
        study: data.university,
        city: data.city
      };

      console.log('Отправка данных карточки:', cardData);

      const response = await cardService.createCard(cardData);
      console.log('Карточка создана:', response);
      
      navigate("/my-cards");
    } catch (err) {
      console.error('Ошибка создания карточки:', err);
      setError(err instanceof Error ? err.message : "Произошла ошибка при создании карточки");
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    navigate("/my-cards");
  };

  return (
    <>
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4 mx-6 mt-4">
          {error}
          <div className="mt-2">
            <button 
              onClick={() => navigate("/login")}
              className="text-sm underline hover:no-underline"
            >
              Войти заново
            </button>
          </div>
        </div>
      )}
      <CardForm
        onSubmit={handleSubmit}
        onCancel={handleCancel}
        isEditing={false}
        loading={loading}
      />
    </>
  );
};

export default MyCardsCreatePage;