import { FC } from "react";
import { useNavigate } from "react-router-dom";

import labsterQuestionMarks from "@/assets/labster-question-marks.png";
import { Button } from "@/components/Button";

const MyCardsPage: FC = () => {
  const navigate = useNavigate();

  return (
    <div className="h-[calc(100vh-76px)] flex flex-col justify-center items-center">
      <img
        src={labsterQuestionMarks}
        alt="Labster questions"
        className="w-[164px]"
      />
      <p className="text-lg text-center mb-4">
        Создайте новые карточки или нажмите на них, чтобы редактировать
      </p>
      <Button onClick={() => navigate("/my-cards/create")}>Создать</Button>
    </div>
  );
};

export default MyCardsPage;
