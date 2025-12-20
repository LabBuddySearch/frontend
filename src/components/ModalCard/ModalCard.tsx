import { FC } from "react";
import { CardData } from "@/types/card";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { likeService } from "@/services/likeService";

interface Props {
  onClose: () => void;
  cardData: CardData;
  isFromMiniList?: boolean;
  onLike?: () => void;
  onUnlike?: () => void;
  onLikeToggle?: () => void;
}

export const ModalCard: FC<Props> = ({ 
  cardData, 
  onClose, 
  isFromMiniList = false,
  onLike,
  onUnlike,
  onLikeToggle
}: Props) => {
  const handleClose = () => {
    onClose();
  };

  const borderColor = useLocalStorage(`card_color_${cardData.id}`, "#FF684D");
  const rawShadow = useLocalStorage(`card_shadow_${cardData.id}`, "0_0_20px_rgba(255,104,77,0.7)");

  const handleLikeAction = async () => {
    try {
      if (isFromMiniList) {
        await likeService.dislikeCard(cardData.id);
        if (onUnlike) onUnlike();
      } else {
        await likeService.likeCard(cardData.id);
        if (onLike) onLike();
      }
      
      if (onLikeToggle) {
        onLikeToggle();
      }
      
      onClose();
    } catch (err) {
      console.error('Ошибка при лайке/дизлайке:', err);
      alert('Не удалось выполнить действие. Попробуйте снова.');
    }
  };

  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('ru-RU', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
      });
    } catch (error) {
      console.error('Ошибка форматирования даты:', error);
      return dateString; 
    }
  };

  const files = cardData.files || [];

  const shadowStyle = rawShadow 
    ? { boxShadow: rawShadow.replace(/_/g, " ") }
    : { boxShadow: "0 0 20px rgba(255,104,77,0.7)" };

  return (
    <div 
      className="fixed bottom-11 right-6 h-[600px] w-[calc(100vw-424px)] bg-[#FFFFF5] border rounded-3xl overflow-hidden p-4"
      style={{
        borderColor: borderColor || "#FF684D",
        ...shadowStyle
      }}
    >
      <button
        onClick={handleClose}
        className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center bg-[#FFFFF5] border border-[#FF684D] rounded-full hover:bg-[#FFF0ED] transition-colors duration-200 z-10"
        aria-label="Закрыть модальное окно"
      >
        <svg 
          width="14" 
          height="14" 
          viewBox="0 0 14 14" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
        >
          <path 
            d="M1 1L13 13M13 1L1 13" 
            stroke="#FF684D" 
            strokeWidth="2" 
            strokeLinecap="round"
          />
        </svg>
      </button>
      
      <div className="h-full w-full flex flex-col">
        <div className="border-b border-gray-200 pb-4 mb-4">
          <h2 className="text-2xl font-bold text-black text-center">
            {cardData.title}
          </h2>
          <div className="flex justify-center gap-4 mt-2">
            <p className="text-lg text-gray-700">{cardData.subject}</p>
            <p className="text-lg text-gray-700">{cardData.type}</p>
          </div>
        </div>

        <div className="flex-1 grid grid-cols-2 gap-6 min-h-0">
          <div className="col-span-1 flex flex-col min-h-0">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Описание</h3>
            <div className="flex-1 overflow-y-auto custom-scrollbar pr-2 min-h-0">
              <p className="text-xl font-light text-gray-700">
                {cardData.description}
              </p>
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Файлы</h3>
              <div className="bg-gray-100 rounded-lg p-3">
                {files.length > 0 ? (
                  <ul className="text-sm text-gray-600">
                    {files.map((file, index) => (
                      <li key={index}>{file}</li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-sm text-gray-600 text-center">Нет файлов</p>
                )}
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Способы связи</h3>
              <div className="bg-gray-100 rounded-lg p-3">
                <p className="text-sm text-gray-600 text-center">
                  {cardData.contact ? cardData.contact : 'Нет контактов для связи'}
                </p>
              </div>
            </div>

            <div className="space-y-2">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-1">Автор</h3>
                <div className="bg-gray-100 rounded-lg p-2">
                  {/* Автор берется из cardData.authorName */}
                  <p className="text-sm text-gray-600 text-start">
                    {cardData.authorName || "Неизвестный автор"}
                  </p>
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-1">Опубликовано</h3>
                <p className="text-base text-gray-900 font-light">
                  {formatDate(cardData.createdAt)}
                </p>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={handleLikeAction}
                className={`w-full py-3 rounded-lg transition-colors ${
                  isFromMiniList 
                    ? "bg-gray-500 text-white hover:bg-gray-600" 
                    : "bg-[#FF684D] text-white hover:bg-[#E55A40]"
                }`}
              >
                {isFromMiniList ? "Убрать из лайкнутых" : "Лайкнуть"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};