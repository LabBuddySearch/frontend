import { FC, useEffect, useState, useCallback } from "react";

import { CardsList } from "@/components/CardsList";
import { MenuDropdown } from "@/components/MenuDropdown";
import { MinicardsList } from "@/components/MinicardsList";
import { ModalCard } from "@/components/ModalCard";
import { cardService } from "@/services/cardService";
import { CardData } from "@/types/card";
import { likeService } from "@/services/likeService";

const HomePage: FC = () => {
  const [modalCardId, setModalCardId] = useState<string | null>(null);
  const [currentCard, setCurrentCard] = useState<CardData | null>(null);
  const [isFromMiniList, setIsFromMiniList] = useState(false);
  const [allCards, setAllCards] = useState<CardData[]>([]);
  const [refreshKey, setRefreshKey] = useState(0);

  const loadAllCards = useCallback(async () => {
    try {
      const cards = await cardService.getAllCards();
      setAllCards(cards);
    } catch (error) {
      console.error("Ошибка загрузки карточек:", error);
    }
  }, []);

  useEffect(() => {
    loadAllCards();
  }, [loadAllCards, refreshKey]);

  useEffect(() => {
    if (modalCardId) {
      const foundCard = allCards.find((card) => card.id === modalCardId);
      setCurrentCard(foundCard || null);
    }
  }, [modalCardId, allCards]);
  const refreshAllCards = () => {
    setRefreshKey(prev => prev + 1);
  };

  const handleLike = async () => {
    if (!modalCardId) return;

    try {
      console.log("Добавить в лайкнутые:", modalCardId);
      await likeService.likeCard(modalCardId);
      refreshAllCards();
      const updatedCards = await cardService.getAllCards();
      const updatedCard = updatedCards.find(card => card.id === modalCardId);
      setCurrentCard(updatedCard || null);
      
      setModalCardId(null);
    } catch (error) {
      console.error("Ошибка при лайке:", error);
      alert("Не удалось лайкнуть карточку");
    }
  };

  const handleUnlike = async () => {
    if (!modalCardId) return;

    try {
      console.log("Удалить из лайкнутых:", modalCardId);
      await likeService.dislikeCard(modalCardId);
    
      refreshAllCards();
      if (isFromMiniList) {
        setModalCardId(null);
        setCurrentCard(null);
      } else {
        const updatedCards = await cardService.getAllCards();
        const updatedCard = updatedCards.find(card => card.id === modalCardId);
        setCurrentCard(updatedCard || null);
      }
    } catch (error) {
      console.error("Ошибка при удалении лайка:", error);
      alert("Не удалось убрать лайк");
    }
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
          refreshKey={refreshKey}
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
          refreshKey={refreshKey}
        />
      </main>

      {modalCardId && currentCard && (
        <ModalCard
          cardData={currentCard}
          onClose={handleCloseModal}
          isFromMiniList={isFromMiniList}
          onLike={handleLike}
          onUnlike={handleUnlike}
          onLikeToggle={refreshAllCards}
        />
      )}
    </div>
  );
};

export default HomePage;