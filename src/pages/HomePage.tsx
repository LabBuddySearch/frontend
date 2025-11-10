import { FC, useState } from "react";

import { CardsList } from "@/components/CardsList";
import { MenuDropdown } from "@/components/MenuDropdown";
import { MinicardsList } from "@/components/MinicardsList";

const HomePage: FC = () => {
  const [modalCardId, setModalCardId] = useState<string | null>(null);

  return (
    <div className="min-h-screen flex bg-[#FFFFF5]">
      <aside className="w-96 min-w-96 border-r border-gray-200">
        <MenuDropdown />
        <MinicardsList
          modalCardId={modalCardId}
          setModalCardId={setModalCardId}
        />
      </aside>
      <main className="flex-1">
        <header className="h-[76px]">фильтры</header>
        <CardsList modalCardId={modalCardId} />
      </main>
    </div>
  );
};

export default HomePage;
