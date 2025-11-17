import React, { useState } from "react";
import DINELine2 from "./DINE-LINE-2.png";
import DINELine6 from "./DINE-LINE-6.png";
import image26 from "./image-26.png";
import image1 from "./image.svg";
import vector from "./vector.svg";
import { LoginInput } from "./LoginInput";

const Header = () => {
  return (
    <header className="sticky top-0 w-full h-[131px] shadow-lg z-50 bg-white">
      <div className="absolute top-0 left-0 w-full h-[61px] bg-azul-principal" />
      <div className="relative max-w-7xl mx-auto h-full flex items-center justify-between px-8">
        <div className="w-48" />
        <img
          className="absolute top-[5px] left-1/2 -translate-x-1/2 w-[120px] h-[120px] object-cover z-10"
          alt="Dine LINE"
          src={DINELine2}
        />

        <div className="absolute top-0 right-8 h-[61px] flex items-center gap-8">
          <button className="[font-family:'Inter-Bold',Helvetica] font-bold text-white text-xl text-center whitespace-nowrap hover:opacity-80 transition-opacity">
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

const MenuItemCard = ({ title, imageSrc }) => {
  return (
    <div className="relative flex items-center justify-center h-60 w-full rounded-[30px] p-4 cursor-pointer transition-transform hover:scale-105 overflow-hidden shadow-lg group">
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
        <div className="absolute inset-0 w-full h-full bg-azul-principal" />
      )}

      <h3 className="relative z-10 [font-family:'Montserrat-Bold',Helvetica] font-bold text-white text-3xl text-center">
        {title}
      </h3>
    </div>
  );
};

const MenuCategoryHeader = ({ title, onClick }) => {
  return (
    <div
      onClick={onClick}
      className="flex justify-between items-center w-full h-28 bg-accent rounded-[30px] shadow-lg p-8 cursor-pointer hover:bg-opacity-90 transition-all"
    >
      <h2 className="[font-family:'Inter-ExtraBold',Helvetica] font-extrabold text-onyx-letras text-[40px] text-center">
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

const MenuCategorySection = ({ title, items, onClick }) => {
  return (
    <section className="w-full bg-accent rounded-[30px] shadow-lg p-8">
      <div
        onClick={onClick}
        className="flex justify-between items-center border-b border-gray-300 pb-4 mb-8 cursor-pointer"
      >
        <h2 className="[font-family:'Inter-ExtraBold',Helvetica] font-extrabold text-onyx-letras text-[40px] text-center">
          {title}
        </h2>
        <img src={image1} alt="Colapsar" className="w-10 h-10" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {items.map((item) => (
          <MenuItemCard
            key={item.title}
            title={item.title}
            imageSrc={item.image}
          />
        ))}
      </div>
    </section>
  );
};

const menuData = {
  entradas: [
    { title: "Langostinos en Panko", image: "image.png" },
    { title: "Causa de Pollo" },
    { title: "Causa de Pulpo al olivo" },
    { title: "Conchitas a la parmesana" },
    { title: "Leche de tigre" },
    { title: "Ocopa" },
    { title: "Papa a la huancaína" },
    { title: "Papa rellena" },
    { title: "Tamal verde" },
  ],
  otrasCategorias: [
    "Arroces",
    "Ceviches",
    "Sopas",
    "Fondos",
    "Combos Marinos",
    "Bebidas Sin Alcohol",
    "Bebidas Con Alcohol",
    "Adicionales",
  ],
};

export const DesktopListaDe = () => {
  const [openCategory, setOpenCategory] = useState("Entradas");

  return (
    <div className="flex flex-col min-h-screen bg-[#fafcfe]">
      <Header />

      <main className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-[45px] font-bold text-onyx-letras text-center mb-8">
          Nuestro Menú
        </h1>

        <div className="w-full max-w-lg mx-auto mb-12">
          <LoginInput />
        </div>

        <div className="flex flex-col gap-12">
          {openCategory === "Entradas" ? (
            <MenuCategorySection
              title="Entradas"
              items={menuData.entradas}
              onClick={() => setOpenCategory(null)}
            />
          ) : (
            <MenuCategoryHeader
              title="Entradas"
              onClick={() => setOpenCategory("Entradas")}
            />
          )}

          {menuData.otrasCategorias.map((title) =>
            openCategory === title ? (
              <MenuCategorySection
                key={title}
                title={title}
                items={[]}
                onClick={() => setOpenCategory(null)}
              />
            ) : (
              <MenuCategoryHeader
                key={title}
                title={title}
                onClick={() => setOpenCategory(title)}
              />
            ),
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};
