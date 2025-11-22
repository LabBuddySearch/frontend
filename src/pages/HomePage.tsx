import { FC, useEffect, useState } from "react";

import { CardsList } from "@/components/CardsList";
import { MenuDropdown } from "@/components/MenuDropdown";
import { MinicardsList } from "@/components/MinicardsList";
import { ModalCard } from "@/components/ModalCard";
import { cardService } from "@/services/cardService";
import { CardData } from "@/types/card";

const HomePage: FC = () => {
  const [modalCardId, setModalCardId] = useState<string | null>(null);
  const [currentCard, setCurrentCard] = useState<CardData | null>(null);
  const [isFromMiniList, setIsFromMiniList] = useState(false);
  const [allCards, setAllCards] = useState<CardData[]>([]);

  useEffect(() => {
    loadAllCards();
  }, []);

  const loadAllCards = async () => {
    try {
      const cards = await cardService.getAllCards();
      setAllCards(cards);
    } catch (error) {
      console.error('Ошибка загрузки карточек:', error);
    }
  };

  useEffect(() => {
    if (modalCardId) {
      const foundCard = allCards.find(card => card.id === modalCardId);
      setCurrentCard(foundCard || null);
    }
  }, [modalCardId, allCards]);

  const handleLike = () => {
    console.log("Добавить в лайкнутые:", modalCardId);
    // Вызов API для добавления в лайки
    setModalCardId(null);
  };

  const handleUnlike = () => {
    console.log("Удалить из лайкнутых:", modalCardId);
    // Вызов API для удаления из лайков
    setModalCardId(null);
  };

  const handleCloseModal = () => {
    setModalCardId(null);
    setCurrentCard(null);
  };

  return (
    <div className="min-h-screen flex bg-[#FFFFF5]">
      <aside className="w-96 min-w-96 border-r border-gray-200">
        <MenuDropdown />
        <MinicardsList
          modalCardId={modalCardId}
          setModalCardId={(id) => {
            setModalCardId(id);
            setIsFromMiniList(true);
          }}
        />
      </aside>
      <main className="flex-1">
        <header className="h-[76px]">Фильтры</header>
        <CardsList 
          modalCardId={modalCardId} 
          setModalCardId={(id) => {
            setModalCardId(id);
            setIsFromMiniList(false);
          }}
        />
      </main>

      {modalCardId && currentCard && (
        <ModalCard 
          cardData={currentCard} 
          onClose={handleCloseModal}
          isFromMiniList={isFromMiniList}
          onLike={handleLike}
          onUnlike={handleUnlike}
        />
      )}
    </div>
  );
};

export default HomePage;