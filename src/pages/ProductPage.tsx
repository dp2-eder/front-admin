import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getProductDetails } from "../services/menuService";
import type { MenuItem } from "../types/types";
import image30 from "../assets/image-30.png";
import backArrowIcon from "../assets/back.svg";
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

  const [product, setProduct] = useState<MenuItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      if (!productId) return;
      try {
        setLoading(true);
        const data = await getProductDetails(productId);
        setProduct(data);
      } catch (err) {
        setError("Error al cargar el producto.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId]);

  if (loading) {
    return (
      <AdminLayout>
        <div className="min-h-screen flex items-center justify-center">
          <p className="text-xl text-[#004166] font-bold">
            Cargando producto...
          </p>
        </div>
      </AdminLayout>
    );
  }

  if (error || !product) {
    return (
      <div className="flex flex-col min-h-screen bg-white">
        <AdminLayout>
          <h1 className="text-2xl font-bold text-center text-red-600 mt-10">
            {error || "Producto no encontrado"}
          </h1>
          <div className="flex justify-center mt-4">
            <button
              onClick={() => navigate("/admin/lista")}
              className="px-4 py-2 bg-[#004166] text-white rounded-lg"
            >
              Volver a la lista
            </button>
          </div>
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
              src={product.imagen_path ? product.imagen_path : image30}
              alt={product.nombre}
            />
            <FileUploader />
            <AllergenList selectedAllergens={product.alergenos} />
          </div>

          <div className="lg:col-span-1 flex flex-col gap-8 pt-2">
            <FormInput label="Nombre" defaultValue={product.nombre} />
            <FormTextarea
              label="Descripción"
              defaultValue={product.descripcion || ""}
            />
            <FormInput
              label="Precio"
              defaultValue={product.precio_base.toString()}
            />

            <div className="flex items-center gap-2">
              <span
                className={`h-3 w-3 rounded-full ${product.disponible ? "bg-green-500" : "bg-red-500"}`}
              ></span>
              <span className="text-sm font-medium">
                {product.disponible ? "Disponible" : "No disponible"}
              </span>
            </div>
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
                {product.tipos_opciones && product.tipos_opciones.length > 0 ? (
                  product.tipos_opciones.map((section) => (
                    <ProductSectionDisplay
                      key={section.id_tipo_opcion}
                      section={section}
                    />
                  ))
                ) : (
                  <p className="text-center w-full text-gray-500 py-4">
                    No hay secciones configuradas.
                  </p>
                )}
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
