import { FC } from "react";
import { CardData } from "@/types/card";

interface Props {
  onClose: () => void;
  cardData: CardData;
  isFromMiniList?: boolean;
  onLike?: () => void;
  onUnlike?: () => void;
}

export const ModalCard: FC<Props> = ({ 
  cardData, 
  onClose, 
  isFromMiniList = false,
  onLike,
  onUnlike 
}: Props) => {
  const handleClose = () => {
    onClose();
  };

  const handleLikeAction = () => {
    if (isFromMiniList && onUnlike) {
      onUnlike();
    } else if (!isFromMiniList && onLike) {
      onLike();
    }
    onClose();
  };

  return (
    <div className="fixed bottom-11 right-6 h-[600px] w-[calc(100vw-424px)] bg-[#FFFFF5] border border-[#FF684D] rounded-3xl overflow-hidden p-4 shadow-[0_0_20px_rgba(255,104,77,0.7)]">
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
                {cardData.files.length > 0 ? (
                  <ul className="text-sm text-gray-600">
                    {cardData.files.map((file, index) => (
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
                <p className="text-sm text-gray-600">{cardData.contact}</p>
              </div>
            </div>

            <div className="space-y-2">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-1">Автор</h3>
                <div className="bg-gray-100 rounded-lg p-2">
                  <p className="text-sm text-gray-600 text-start">{cardData.author}</p>
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-1">Опубликовано</h3>
                <p className="text-base text-gray-900 font-light">{cardData.date}</p>
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