import { FC } from "react";

interface Props {
  modalCardId: string | null;
  onClose: () => void;
}

export const ModalCard: FC<Props> = ({ modalCardId, onClose }: Props) => {
  const handleClose = () => {
    onClose();
  };

  return (
    <div className="fixed top-[calc(calc(100vh-540px)/2)] h-[540px] w-[calc(100vw-424px)] bg-[#FFFFF5] border border-[#FF684D] rounded-3xl overflow-hidden p-4 shadow-[0_0_20px_rgba(255,104,77,0.7)]">
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
      
      <div className="h-full w-full">
        {modalCardId}
      </div>
    </div>
  );
};