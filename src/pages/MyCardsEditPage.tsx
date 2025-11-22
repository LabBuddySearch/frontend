import { FC, useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { CardForm } from "@/components/CardForm";
import { cardService } from "@/services/cardService";
import { CardData } from "@/types/card";

const MyCardsEditPage: FC = () => {
  const navigate = useNavigate();
  const { cardId } = useParams();
  const [cardData, setCardData] = useState<CardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (cardId) {
      loadCardData(cardId);
    } else {
      setLoading(false);
    }
  }, [cardId]);

  const loadCardData = async (id: string) => {
    try {
      setLoading(true);
      const userCards = await cardService.getUserCards();
      const foundCard = userCards.find(card => card.id === id);
      
      if (foundCard) {
        setCardData(foundCard);
      } else {
        setError("Карточка не найдена");
      }
    } catch (err) {
      console.error('Ошибка загрузки карточки:', err);
      setError(err instanceof Error ? err.message : "Ошибка загрузки карточки");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (data: any) => {
    try {
      if (cardId) {
        const backendData = {
          workType: data.workType,
          subject: data.subject,
          title: data.title,
          description: data.description,
          university: data.university,
          course: data.course,
          city: data.city
        };

        await cardService.updateCard(cardId, backendData);
        navigate("/my-cards");
      }
    } catch (err) {
      console.error('Ошибка обновления карточки:', err);
      alert('Ошибка при обновлении карточки');
    }
  };

  const handleCancel = () => {
    navigate("/my-cards");
  };

  if (loading) {
    return (
      <div className="h-[calc(100vh-76px)] flex flex-col justify-center items-center">
        <div className="text-lg">Загрузка...</div>
      </div>
    );
  }

  if (error || !cardData) {
    return (
      <div className="h-[calc(100vh-76px)] flex flex-col justify-center items-center">
        <div className="text-lg text-red-600">{error || "Карточка не найдена"}</div>
        <button
          onClick={() => navigate("/my-cards")}
          className="mt-4 px-6 py-2 bg-[#FF684D] text-white rounded-lg hover:bg-[#E55A40] transition-colors"
        >
          Вернуться к моим карточкам
        </button>
      </div>
    );
  }

  const initialData = {
    title: cardData.title,
    subject: cardData.subject,
    workType: cardData.type,
    description: cardData.description,
    university: cardData.university,
    course: cardData.course,
    city: cardData.сity || ""
  };

  return (
    <CardForm
      initialData={initialData}
      onSubmit={handleSubmit}
      onCancel={handleCancel}
      isEditing={true}
    />
  );
};

export default MyCardsEditPage;