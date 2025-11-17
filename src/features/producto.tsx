import React from "react";

import DINELine2 from "./DINE-LINE-2.png";
import DINELine6 from "./DINE-LINE-6.png";
import image26 from "./image-26.png";
import image30 from "./image-30.png";
import backArrowIcon from "./vector.svg";
import headerIcon from "./image.svg";
import { Button } from "./Button";

const ALLERGENS = [
  "Crustáceos",
  "Huevos",
  "Pescado",
  "Lácteos",
  "Frutos con cáscara",
  "Moluscos",
  "Apio",
  "Sésamo",
  "Gluten",
  "Cacahuates",
  "Salsa de soja",
  "Mostaza",
];

const FormInput = ({ label, type = "text", defaultValue }) => (
  <div className="w-full">
    <label className="block text-xl font-semibold text-black mb-2">
      {label}
    </label>
    <input
      type={type}
      defaultValue={defaultValue}
      className="w-full h-12 px-4 py-2 bg-white rounded-xl border border-solid border-[#99a1ae] text-black text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
  </div>
);

const FormTextarea = ({ label, defaultValue }) => (
  <div className="w-full">
    <label className="block text-xl font-semibold text-black mb-2">
      {label}
    </label>
    <textarea
      defaultValue={defaultValue}
      rows={4}
      className="w-full p-4 bg-white rounded-xl border border-solid border-[#99a1ae] text-[#495565] text-base resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
  </div>
);

const AllergenList = () => (
  <div className="w-full bg-white rounded-xl border border-solid border-[#99a1ae] p-4">
    <div className="flex justify-between items-center mb-3">
      <h3 className="text-lg font-semibold">Alérgenos</h3>
      <span className="bg-azul-principal text-white text-xs font-medium px-2 py-0.5 rounded-md">
        Opcional
      </span>
    </div>
    <div className="max-h-80 overflow-y-auto">
      {ALLERGENS.map((allergen) => (
        <div
          key={allergen}
          className="flex items-center gap-3 py-2 border-b border-solid border-[#d0d5db] last:border-b-0"
        >
          <input
            type="checkbox"
            id={`allergen-${allergen}`}
            className="h-4 w-4 rounded border-gray-400 text-blue-600 focus:ring-blue-500"
          />
          <label
            htmlFor={`allergen-${allergen}`}
            className="text-sm text-black"
          >
            {allergen}
          </label>
        </div>
      ))}
    </div>
  </div>
);

const ImagePreview = () => (
  <div className="w-full aspect-square rounded-[20px] border border-solid border-black overflow-hidden">
    <img
      className="w-full h-full object-cover"
      alt="Previsualización de producto"
      src={image30}
    />
  </div>
);

const FileUploader = () => (
  <div className="flex items-center gap-3 w-full">
    <div className="flex-grow h-10 px-3 py-2 bg-white rounded-md border border-solid border-slate-500">
      <span className="text-slate-400 text-sm">No se ha seleccionado...</span>
    </div>

    <Button
      className="!h-10 !flex-shrink-0 !bg-azul-principal !w-auto"
      property1="default"
      text="Subir"
    />
  </div>
);

const Header = () => (
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
        <button className="font-bold text-white text-xl text-center">
          Cerrar sesión
        </button>
        <img className="w-8 h-8" alt="Icon" src={headerIcon} />
      </div>
    </div>
  </header>
);

const Footer = () => (
  <footer className="relative w-full h-[476px] mt-20">
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

export const Desktop = () => {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Header />

      <main className="flex-grow w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <button className="flex items-center gap-2 text-lg font-semibold text-gray-700 mb-8 hover:text-black">
          <img className="w-6 h-6" alt="Volver" src={backArrowIcon} />
          Volver
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-1 flex flex-col gap-8">
            <ImagePreview />
            <FileUploader />
            <AllergenList />
          </div>

          <div className="lg:col-span-1 flex flex-col gap-8 pt-2">
            <FormInput label="Nombre" defaultValue="Ceviche de pescado" />
            <FormTextarea
              label="Descripción"
              defaultValue="Trozos de pescado con jugo de limón, cebolla, ají limo y sal, acompañados de choclo, camote y yuyo."
            />
            <FormInput label="Precio" defaultValue="S/39.90" />
          </div>

          <div className="lg:col-span-1 flex flex-col items-start pt-2">
            <button className="w-full max-w-xs h-12 px-6 bg-azul-principal rounded-[20px] shadow-lg text-light-cloud text-sm font-semibold hover:opacity-90 transition-opacity">
              Agregar Sección
            </button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};
