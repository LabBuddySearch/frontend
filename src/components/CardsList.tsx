import { FC, useState, useEffect } from "react";
import { Card } from "@/components/Card";
import { ModalCard } from "@/components/ModalCard";
import { cardService } from "@/services/cardService";
import { CardData } from "@/types/card";

interface Props {
  modalCardId: string | null;
  setModalCardId: (id: string | null) => void;
}

export const CardsList: FC<Props> = ({ modalCardId, setModalCardId }: Props) => {
  const [cards, setCards] = useState<CardData[]>([]);
  const [currentCard, setCurrentCard] = useState<CardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    loadCards();
  }, []);

  const loadCards = async () => {
    try {
      setLoading(true);
      const cardsData = await cardService.getAllCards();
      setCards(cardsData);
    } catch (err) {
      console.error('Ошибка загрузки карточек:', err);
      setError(err instanceof Error ? err.message : "Ошибка загрузки карточек");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (modalCardId) {
      const foundCard = cards.find(card => card.id === modalCardId);
      setCurrentCard(foundCard || null);
    }
  }, [modalCardId, cards]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-lg">Загрузка карточек...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-red-600">{error}</div>
      </div>
    );
  }

  return (
    <div className="relative flex flex-wrap justify-center bg-[#FFFFF5] py-3 pl-[6px] gap-16 max-h-[calc(100vh-76px)] overflow-y-auto [scrollbar-gutter:stable] custom-scrollbar">
      {modalCardId && currentCard && (
        <ModalCard 
          cardData={currentCard} 
          onClose={() => setModalCardId(null)}
          isFromMiniList={false}
          onLike={() => {
            console.log("Like card:", currentCard.id);
          }}
        />
      )}
      {cards.map(card => (
        <Card 
          key={card.id}
          cardData={card}
          onClick={() => setModalCardId(card.id)}
        />
      ))}
    </div>
  );
};