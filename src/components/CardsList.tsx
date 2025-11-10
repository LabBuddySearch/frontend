import { FC } from "react";

import { Card } from "@/components/Card";
import { ModalCard } from "@/components/ModalCard";

interface Props {
  modalCardId: string | null;
}

export const CardsList: FC<Props> = ({ modalCardId }: Props) => {
  return (
    <div className="relative flex flex-wrap justify-center bg-[#FFFFF5] py-3 pl-[6px] gap-16 max-h-[calc(100vh-76px)] overflow-y-auto [scrollbar-gutter:stable] custom-scrollbar">
      {modalCardId && <ModalCard modalCardId={modalCardId} />}
      <Card />
      <Card />
      <Card />
      <Card />
      <Card />
      <Card />
      <Card />
      <Card />
      <Card />
      <Card />
      <Card />
    </div>
  );
};
