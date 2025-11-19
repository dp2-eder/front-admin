import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import image30 from "../assets/image-30.png";
import backArrowIcon from "../assets/back.svg";
import { findProductById } from "../mockData/menuData";
import { NuevaSeccionModal } from "../components/ui/NewSectionModal";
import { AdminLayout } from "../components/ui/AdminLayout";
import { FormInput } from "../components/ui/FormInput";
import { FormTextarea } from "../components/ui/FormTextarea";
import { ImagePreview } from "../components/ui/ImagePreview";
import { FileUploader } from "../components/ui/FileUploader";
import { AllergenList } from "../components/ui/AllergenList";
import { ProductSectionDisplay } from "../components/ui/ProductSectionDisplay";

export const ProductPage = () => {
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
            onClick={() => navigate("/admin/lista")}
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
          onClick={() => navigate("/admin/lista")}
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
              <div className="p-2 flex-1 flex flex-col items-start gap-8 pr-2 max-h-[650px] overflow-y-auto scrollbar-none">
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
