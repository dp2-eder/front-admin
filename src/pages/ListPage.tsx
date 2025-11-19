import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { LoginInput } from "../components/ui/LoginInput";
import { menuData } from "../mockData/menuData";
import { AdminLayout } from "../components/ui/AdminLayout";
import { MenuCategoryHeader } from "../components/ui/MenuCategoryHeader";
import { MenuCategorySection } from "../components/ui/MenuCategorySection";

export const ListPage = () => {
  const [openCategory, setOpenCategory] = useState<string | null>("Entradas");
  const navigate = useNavigate();

  const handleProductClick = (id: string) => {
    navigate(`/admin/producto/${id}`);
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#fafcfe]">
      <AdminLayout>
        <h1 className="text-[45px] font-bold text-[#0E0E2C] text-center mb-8">
          Nuestro Menú
        </h1>

        <div className="w-full max-w-lg mx-auto mb-12">
          <LoginInput />
        </div>

        <div className="flex flex-col gap-12">
          {menuData.map((category) =>
            openCategory === category.title ? (
              <MenuCategorySection
                key={category.title}
                category={category}
                onClick={() => setOpenCategory(null)}
                onCardClick={handleProductClick}
              />
            ) : (
              <MenuCategoryHeader
                key={category.title}
                title={category.title}
                onClick={() => setOpenCategory(category.title)}
              />
            ),
          )}
        </div>
      </AdminLayout>
    </div>
  );
};
