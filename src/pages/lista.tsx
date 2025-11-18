import { useState } from "react";
import { useNavigate } from "react-router-dom";
import DINELine2 from "../assets/DINE-LINE-2.png";
import DINELine6 from "../assets/DINE-LINE-6.png";
import image26 from "../assets/image-26.png";
import vector from "../assets/vector.svg";
import image1 from "../assets/down.svg";
import { LoginInput } from "../components/ui/LoginInput";
import { menuData, type MenuCategory } from "../mockData/menuData";

type MenuItemCardProps = {
  title: string;
  imageSrc?: string | null;
  onClick: () => void;
};

type MenuCategoryHeaderProps = {
  title: string;
  onClick: () => void;
};

type MenuCategorySectionProps = {
  category: MenuCategory;
  onClick: () => void;
  onCardClick: (id: string) => void;
};

const Header = () => {
  const navigate = useNavigate();
  return (
    <header className="sticky top-0 w-full h-[131px] shadow-lg z-50 bg-white">
      <div className="absolute top-0 left-0 w-full h-[61px] bg-[#004166]" />
      <div className="relative max-w-7xl mx-auto h-full flex items-center justify-between px-8">
        <div className="w-48" />
        <img
          className="absolute top-[5px] left-1/2 -translate-x-1/2 w-[120px] h-[120px] object-cover z-10"
          alt="Dine LINE"
          src={DINELine2}
        />
        <div className="absolute top-0 right-8 h-[61px] flex items-center gap-8">
          <button
            onClick={() => navigate("/login")}
            className="[font-family:'Inter-Bold',Helvetica] font-bold text-white text-xl text-center whitespace-nowrap hover:opacity-80 transition-opacity"
          >
            Cerrar sesión
          </button>
          <img
            className="w-8 h-8 cursor-pointer"
            alt="Vector Icon"
            src={vector}
          />
        </div>
      </div>
    </header>
  );
};

const Footer = () => {
  return (
    <footer className="relative w-full h-[489px] mt-20">
      <img
        className="absolute bottom-0 left-0 w-full h-[308px] object-cover"
        alt="Footer background"
        src={image26}
      />
      <img
        className="absolute top-[117px] left-1/2 -translate-x-1/2 w-[120px] h-[140px] object-cover"
        alt="Dine LINE"
        src={DINELine6}
      />
    </footer>
  );
};

const MenuItemCard = ({ title, imageSrc, onClick }: MenuItemCardProps) => {
  return (
    <div
      onClick={onClick}
      className="relative flex items-center justify-center h-60 w-full rounded-[30px] p-4 cursor-pointer transition-transform hover:scale-105 overflow-hidden shadow-lg group bg-[#004166]"
    >
      {imageSrc ? (
        <>
          <img
            src={imageSrc}
            alt={title}
            className="absolute inset-0 w-full h-full object-cover transition-transform group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-black bg-opacity-40" />
        </>
      ) : (
        <div className="absolute inset-0 w-full h-full bg-" />
      )}
      <h3 className="relative z-10 [font-family:'Montserrat-Bold',Helvetica] font-bold text-white text-3xl text-center">
        {title}
      </h3>
    </div>
  );
};

const MenuCategoryHeader = ({ title, onClick }: MenuCategoryHeaderProps) => {
  return (
    <div
      onClick={onClick}
      className="flex justify-between items-center w-full h-28 bg-[#ECF1F4] rounded-[30px] shadow-lg p-8 cursor-pointer hover:bg-opacity-90 transition-all"
    >
      <h2 className="[font-family:'Inter-ExtraBold',Helvetica] font-extrabold text-[#0E0E2C] text-[40px] text-center">
        {title}
      </h2>
      <img
        src={image1}
        alt="Expandir"
        className="w-10 h-10 transform rotate-180"
      />
    </div>
  );
};

const MenuCategorySection = ({
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
          {category.title}
        </h2>
        <img src={image1} alt="Colapsar" className="w-10 h-10" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {category.items.map((item) => (
          <MenuItemCard
            key={item.id}
            title={item.title}
            imageSrc={item.image}
            onClick={() => onCardClick(item.id)}
          />
        ))}
      </div>
    </section>
  );
};

export const DesktopListaDe = () => {
  const [openCategory, setOpenCategory] = useState<string | null>("Entradas");
  const navigate = useNavigate();

  const handleProductClick = (id: string) => {
    navigate(`/producto/${id}`);
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#fafcfe]">
      <Header />

      <main className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
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
      </main>

      <Footer />
    </div>
  );
};
