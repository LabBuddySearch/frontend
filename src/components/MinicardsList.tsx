import { FC } from "react";
import { generatePath, useNavigate, useParams } from "react-router-dom";

import { CardMini } from "@/components/CardMini";
import { StarIcon } from "@/components/icons";
import { PATHS } from "@/router/paths";

interface Props {
  isMyCardsPage?: boolean;
  modalCardId?: string | null;
  setModalCardId?: (arg: string | null) => void;
}

export const MinicardsList: FC<Props> = ({
  isMyCardsPage = false,
  modalCardId,
  setModalCardId,
}: Props) => {
  const navigate = useNavigate();
  const { cardId } = useParams();

  const onCardClick = (cardId: string) => {
    isMyCardsPage
      ? navigate(generatePath(PATHS.MY_CARDS_EDIT, { cardId }))
      : setModalCardId && setModalCardId(cardId);
  };

  const arrOfMinicards = ["1", "2", "3", "4", "5", "6", "7", "8", "9"];

  return (
    <div>
      <div className="flex flex-row justify-center items-center gap-1 py-3">
        <p className="text-base">
          {isMyCardsPage ? "Мои карточки" : "Мои лайки"}
        </p>
        <StarIcon />
      </div>
      <div className="border-t border-gray-200 mx-4" />
      <div className="flex flex-wrap justify-center bg-[#FFFFF5] py-4 pl-[6px] gap-8 max-h-[calc(100vh-124.8px)] overflow-y-auto [scrollbar-gutter:stable] custom-scrollbar">
        {arrOfMinicards.map((id) => (
          <CardMini
            key={id}
            id={id}
            isSelected={id === cardId || id === modalCardId}
            onClick={() => onCardClick(id)}
          />
        ))}
      </div>
    </div>
  );
};
