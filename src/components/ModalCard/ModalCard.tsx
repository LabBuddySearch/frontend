import { FC } from "react";

interface Props {
  modalCardId: string | null;
}

export const ModalCard: FC<Props> = ({ modalCardId }: Props) => {
  return (
    <div className="fixed top-[calc(calc(100vh-540px)/2)] h-[540px] w-[calc(100vw-424px)] bg-[#FFFFF5] border border-[#FF684D] rounded-3xl overflow-hidden p-4">
      {modalCardId}
    </div>
  );
};
