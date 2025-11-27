import { useState, useEffect, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  getCategoryDetails,
  getProductImageUrl,
  uploadCategoryImage,
  updateCategory,
} from "../services/menuService";
import image30 from "../assets/image-30.png";
import backArrowIcon from "../assets/back.svg";
import { AdminLayout } from "../components/ui/AdminLayout";
import { FormTextarea } from "../components/ui/FormTextarea";
import { ImagePreview } from "../components/ui/ImagePreview";
import { FileUploader } from "../components/ui/FileUploader";

export const CategoryPage = () => {
  const navigate = useNavigate();
  const { categoryId } = useParams<{ categoryId: string }>();

  const [category, setCategory] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState<{ descripcion: string }>({
    descripcion: "",
  });

  const fetchCategory = useCallback(async () => {
    if (!categoryId) return;
    try {
      const data = await getCategoryDetails(categoryId);
      setCategory(data);
      setFormData({ descripcion: data.descripcion || "" });
    } catch (err) {
      setError("Error al cargar la categoría.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [categoryId]);

  useEffect(() => {
    setLoading(true);
    fetchCategory();
  }, [fetchCategory]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSaveChanges = async () => {
    if (!categoryId) return;

    try {
      setLoading(true);
      await updateCategory(categoryId, { descripcion: formData.descripcion });
      navigate("/admin/lista");
    } catch (error) {
      console.error("Error al guardar categoría:", error);
      alert(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading)
    return (
      <AdminLayout>
        <div className="flex min-h-[50vh] items-center justify-center text-[#004166] text-xl font-bold">
          Cargando categoría...
        </div>
      </AdminLayout>
    );
  if (error || !category)
    return (
      <AdminLayout>
        <div className="flex min-h-[50vh] items-center justify-center text-red-500 text-xl font-bold">
          Error
        </div>
      </AdminLayout>
    );

  const displayImageUrl = getProductImageUrl(category.imagen_path) || image30;

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
            <ImagePreview src={displayImageUrl} alt={category.nombre || 'Categoría'} />
            <FileUploader
              entityId={category.id}
              uploadFunction={uploadCategoryImage}
              onUploadSuccess={fetchCategory}
            />
          </div>

          <div className="lg:col-span-2 flex flex-col gap-8 pt-2">
            <div>
              <FormTextarea
                label="Descripción"
                name="descripcion"
                value={formData.descripcion}
                onChange={handleInputChange}
              />
            </div>

            <button
              onClick={handleSaveChanges}
              className="mt-4 w-full py-3 bg-[#004166] text-white rounded-lg font-bold hover:bg-[#002f4a] transition-colors shadow-md"
            >
              Guardar Cambios
            </button>
          </div>
        </div>
      </AdminLayout>
    </div>
  );
};

export default CategoryPage;
