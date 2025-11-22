import { FC } from "react";

import { Card } from "@/components/Card";
import { ModalCard } from "@/components/ModalCard";

interface Props {
  modalCardId: string | null;
  setModalCardId: (id: string | null) => void;
}

export const CardsList: FC<Props> = ({ modalCardId, setModalCardId }: Props) => {
  return (
    <div className="relative flex flex-wrap justify-center bg-[#FFFFF5] py-3 pl-[6px] gap-16 max-h-[calc(100vh-76px)] overflow-y-auto [scrollbar-gutter:stable] custom-scrollbar">
      {modalCardId && <ModalCard modalCardId={modalCardId} onClose={() => setModalCardId(null)}/>}
      <Card onClick={() => setModalCardId("1")} />
      <Card onClick={() => setModalCardId("2")} />
      <Card onClick={() => setModalCardId("3")} />
      <Card onClick={() => setModalCardId("4")} />
      <Card onClick={() => setModalCardId("5")} />
      <Card onClick={() => setModalCardId("6")} />
      <Card onClick={() => setModalCardId("7")} />
      <Card onClick={() => setModalCardId("8")} />
      <Card onClick={() => setModalCardId("9")} />
      <Card onClick={() => setModalCardId("10")} />
      <Card onClick={() => setModalCardId("11")} />
    </div>
  );
};
