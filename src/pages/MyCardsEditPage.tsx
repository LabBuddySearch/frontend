import { FC } from "react";
import { useParams } from "react-router-dom";

const MyCardsEditPage: FC = () => {
  const { cardId } = useParams();

  return (
    <div className="h-[calc(100vh-76px)] flex flex-col justify-center items-center">
      edit card {cardId}
    </div>
  );
};

export default MyCardsEditPage;
