import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import image30 from "../assets/image-30.png";
import backArrowIcon from "../assets/back.svg";
import { Button } from "../components/ui/Button";
import {
  ALLERGENS,
  findProductById,
  type ProductSection,
} from "../mockData/menuData";
import { NuevaSeccionModal } from "../components/ui/NewSectionModal";
import { AdminLayout } from "../components/ui/AdminLayout";

type FormInputProps = {
  label: string;
  type?: string;
  defaultValue: string;
};

type FormTextareaProps = {
  label: string;
  defaultValue: string;
};

type ImagePreviewProps = {
  src: string;
  alt: string;
};

type ProductSectionDisplayProps = {
  section: ProductSection;
};

const FormInput = ({ label, type = "text", defaultValue }: FormInputProps) => (
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

const FormTextarea = ({ label, defaultValue }: FormTextareaProps) => (
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
      <span className="bg-[#004166] text-white text-xs font-medium px-2 py-0.5 rounded-md">
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

const ImagePreview = ({ src, alt }: ImagePreviewProps) => (
  <div className="w-full aspect-square rounded-[20px] border border-solid border-black overflow-hidden">
    <img className="w-full h-full object-cover" alt={alt} src={src} />
  </div>
);

const FileUploader = () => (
  <div className="flex items-center gap-3 w-full">
    <div className="flex-grow h-10 px-3 py-2 bg-white rounded-md border border-solid border-slate-500">
      <span className="text-slate-400 text-sm">No se ha seleccionado...</span>
    </div>

    <Button
      className="!h-10 !flex-shrink-0 !bg-[#004166] !w-auto text-white rounded-2xl"
      property1="default"
      text="Subir"
    />
  </div>
);

const ProductSectionDisplay = ({ section }: ProductSectionDisplayProps) => {
  return (
    <div className="w-full bg-white rounded-xl border border-solid border-[#99a1ae] p-4">
      <h3 className="text-lg font-semibold mb-3 text-[#0E0E2C]">
        {section.title}
      </h3>
      <div className="max-h-60 overflow-y-auto">
        {section.options.map((option) => (
          <div
            key={option.id}
            className="flex justify-between items-center py-2 border-b border-solid border-[#d0d5db] last:border-b-0"
          >
            <div className="flex items-center gap-3">
              <input
                type={section.type}
                name={`section-${section.id}`}
                id={option.id}
                className="h-4 w-4 border-gray-400 text-blue-600 focus:ring-blue-500"
              />
              <label htmlFor={option.id} className="text-sm text-black">
                {option.name}
              </label>
            </div>
            <span className="text-sm text-gray-600">{option.price}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export const Desktop = () => {
  const navigate = useNavigate();
  const { productId } = useParams<{ productId: string }>();
  const product = findProductById(productId || "");
  const [isModalOpen, setIsModalOpen] = useState(false);

  if (!product) {
    return (
      <div className="flex flex-col min-h-screen bg-white">
        <AdminLayout>
          <h1 className="text-2xl font-bold text-center">
            Producto no encontrado
          </h1>
          <button
            onClick={() => navigate("/lista")}
            className="flex items-center gap-2 text-lg font-semibold text-gray-700 mb-8 hover:text-black"
          >
            <img className="w-6 h-6" alt="Volver" src={backArrowIcon} />
            Volver a la lista
          </button>
        </AdminLayout>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <AdminLayout>
        <button
          onClick={() => navigate("/lista")}
          className="flex items-center gap-2 text-lg font-semibold text-gray-700 mb-8 hover:text-black"
        >
          <img className="w-6 h-6" alt="Volver" src={backArrowIcon} />
          Volver
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-1 flex flex-col gap-8">
            <ImagePreview
              src={product.image ? product.image : image30}
              alt={product.title}
            />
            <FileUploader />
            <AllergenList />
          </div>

          <div className="lg:col-span-1 flex flex-col gap-8 pt-2">
            <FormInput label="Nombre" defaultValue={product.title} />
            <FormTextarea
              label="Descripción"
              defaultValue={product.description}
            />
            <FormInput label="Precio" defaultValue={product.price} />
          </div>
          <div className="lg:col-span-1 flex flex-col pt-2">
            <div className="border border-[#99a1ae] rounded-2xl">
              <div className="flex justify-between items-center p-6">
                <h2 className="text-2xl font-bold text-[#0E0E2C]">Secciones</h2>
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="px-5 py-2 bg-[#004166] rounded-lg shadow-lg text-[#FAFCFE] text-sm font-semibold hover:opacity-90 transition-opacity"
                >
                  Agregar Sección
                </button>
              </div>
              <div className="p-2 flex-1 flex flex-col items-start gap-8 pr-2 h-[650px] overflow-y-auto">
                {product.sections.map((section) => (
                  <ProductSectionDisplay key={section.id} section={section} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </AdminLayout>

      <NuevaSeccionModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
};
