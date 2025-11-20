import { useState, useEffect, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getProductDetails, getProductImageUrl } from "../services/menuService";
import type {
  MenuItem,
  ProductAlergeno,
  Alergeno,
  MenuOptionGroup,
} from "../types/types";
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

  const [formData, setFormData] = useState<{
    nombre: string;
    descripcion: string;
    precio_base: string;
    disponible: boolean;
    destacado: boolean;
    alergenos: ProductAlergeno[];
    tipos_opciones: MenuOptionGroup[];
  }>({
    nombre: "",
    descripcion: "",
    precio_base: "",
    disponible: false,
    destacado: false,
    alergenos: [],
    tipos_opciones: [],
  });

  const fetchProduct = useCallback(async () => {
    if (!productId) return;
    try {
      const data = await getProductDetails(productId);
      setProduct(data);

      setFormData((prev) => ({
        ...prev,
        nombre: data.nombre,
        descripcion: data.descripcion,
        precio_base: String(data.precio_base),
        disponible: data.disponible,
        destacado: data.destacado,
        alergenos: data.alergenos,
        tipos_opciones: data.tipos_opciones || [],
      }));
    } catch (err) {
      setError("Error al cargar el producto.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [productId]);

  useEffect(() => {
    setLoading(true);
    fetchProduct();
  }, [fetchProduct]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleToggleAvailable = () => {
    setFormData((prev) => ({ ...prev, disponible: !prev.disponible }));
  };

  const handleToggleFeatured = () => {
    setFormData((prev) => ({ ...prev, destacado: !prev.destacado }));
  };

  const handleAllergenToggle = (allergen: Alergeno, isChecked: boolean) => {
    setFormData((prev) => {
      if (isChecked) {
        const newAllergen: ProductAlergeno = {
          id: allergen.id,
          nombre: allergen.nombre,
        };
        return { ...prev, alergenos: [...prev.alergenos, newAllergen] };
      } else {
        return {
          ...prev,
          alergenos: prev.alergenos.filter((a) => a.id !== allergen.id),
        };
      }
    });
  };

  const handleAddSectionLocal = (newSection: MenuOptionGroup) => {
    setFormData((prev) => ({
      ...prev,
      tipos_opciones: [...prev.tipos_opciones, newSection],
    }));
  };

  const handleSaveChanges = async () => {
    console.log("Enviando payload completo al backend:", formData);

    try {
      // await updateProductComplete(productId, formData);
      navigate("/admin/lista");
      alert("Cambios guardados (simulado). Revisa la consola.");
    } catch (error) {
      console.error("Error al guardar", error);
      alert("Error al guardar cambios");
    }
  };

  if (loading)
    return (
      <AdminLayout>
        <div>Cargando...</div>
      </AdminLayout>
    );
  if (error || !product)
    return (
      <AdminLayout>
        <div>Error...</div>
      </AdminLayout>
    );

  const displayImageUrl = getProductImageUrl(product.imagen_path) || image30;

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
            <ImagePreview src={displayImageUrl} alt={product.nombre} />
            <FileUploader
              productId={product.id}
              onUploadSuccess={fetchProduct}
            />
            <AllergenList
              selectedAllergens={formData.alergenos}
              onToggle={handleAllergenToggle}
            />
          </div>

          <div className="lg:col-span-1 flex flex-col gap-8 pt-2">
            <FormInput
              label="Nombre"
              name="nombre"
              value={formData.nombre}
              onChange={handleInputChange}
            />
            <FormTextarea
              label="Descripción"
              name="descripcion"
              value={formData.descripcion}
              onChange={handleInputChange}
            />
            <FormInput
              label="Precio"
              name="precio_base"
              value={formData.precio_base}
              onChange={handleInputChange}
              type="number"
            />

            <div
              className="flex items-center gap-3 cursor-pointer select-none"
              onClick={handleToggleAvailable}
            >
              <div
                className={`w-6 h-6 rounded border flex items-center justify-center transition-colors ${formData.disponible ? "bg-green-500 border-green-500" : "border-gray-400"}`}
              >
                {formData.disponible && (
                  <svg
                    className="w-4 h-4 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="3"
                      d="M5 13l4 4L19 7"
                    ></path>
                  </svg>
                )}
              </div>
              <span className="text-sm font-medium text-gray-700">
                {formData.disponible
                  ? "Disponible para la venta"
                  : "No disponible"}
              </span>
            </div>

            <div
              className="flex items-center gap-3 cursor-pointer select-none"
              onClick={handleToggleFeatured}
            >
              <div
                className={`w-6 h-6 rounded border flex items-center justify-center transition-colors ${formData.destacado ? "bg-yellow-500 border-yellow-500" : "border-gray-400"}`}
              >
                {formData.destacado && (
                  <svg
                    className="w-4 h-4 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="3"
                      d="M5 13l4 4L19 7"
                    ></path>
                  </svg>
                )}
              </div>
              <span className="text-sm font-medium text-gray-700">
                {formData.destacado
                  ? "Producto Destacado"
                  : "Producto Estándar"}
              </span>
            </div>

            <button
              onClick={handleSaveChanges}
              className="mt-4 w-full py-3 bg-[#004166] text-white rounded-lg font-bold hover:bg-[#002f4a] transition-colors shadow-md"
            >
              Guardar Cambios
            </button>
          </div>

          <div className="lg:col-span-1 flex flex-col pt-2">
            <div className="border border-[#99a1ae] rounded-2xl bg-white">
              <div className="flex justify-between items-center p-6 border-b border-gray-100">
                <h2 className="text-2xl font-bold text-[#0E0E2C]">Secciones</h2>
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="px-5 py-2 bg-[#004166] rounded-lg shadow-lg text-[#FAFCFE] text-sm font-semibold hover:opacity-90 transition-opacity"
                >
                  Agregar Sección
                </button>
              </div>

              <div className="p-4 flex-1 flex flex-col items-start gap-6 pr-2 max-h-[650px] overflow-y-auto scrollbar-thin">
                {formData.tipos_opciones &&
                formData.tipos_opciones.length > 0 ? (
                  formData.tipos_opciones.map((section, index) => (
                    <ProductSectionDisplay
                      key={section.id_tipo_opcion || `new-section-${index}`}
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
        onSave={handleAddSectionLocal}
      />
    </div>
  );
};
