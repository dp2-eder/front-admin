import image1 from "../../assets/down.svg";
import { MenuItemCard } from "./MenuItemCard";
import type { CategoryWithProductsCard } from "../../types/types";

type MenuCategorySectionProps = {
  category: CategoryWithProductsCard;
  onClick: () => void;
  onCardClick: (id: string) => void;
};

export const MenuCategorySection = ({
  category,
  onClick,
  onCardClick,
}: MenuCategorySectionProps) => {
  return (
    <section className="w-full bg-[#ECF1F4] rounded-[30px] shadow-lg p-8">
      <div
        onClick={onClick}
        className="flex justify-between items-center border-b border-gray-300 pb-4 mb-8 cursor-pointer"
      >
        <h2 className="[font-family:'Inter-ExtraBold',Helvetica] font-extrabold text-[#0E0E2C] text-[40px] text-center">
          {category.nombre}
        </h2>
        <img src={image1} alt="Colapsar" className="w-10 h-10" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {category.productos.map((item) => (
          <MenuItemCard
            key={item.id}
            title={item.nombre}
            imageSrc={item.imagen_path}
            onClick={() => onCardClick(item.id)}
          />
        ))}
      </div>
    </section>
  );
};
