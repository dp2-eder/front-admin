import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AdminLayout } from "../components/ui/AdminLayout";
import { MenuCategoryHeader } from "../components/ui/MenuCategoryHeader";
import { MenuCategorySection } from "../components/ui/MenuCategorySection";
import { getMenuCards } from "../services/menuService";
import type { CategoryWithProductsCard } from "../types/types";

export const ListPage = () => {
  const navigate = useNavigate();

  const [categories, setCategories] = useState<CategoryWithProductsCard[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [openCategoryId, setOpenCategoryId] = useState<string | null>(null);

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        setLoading(true);
        const data = await getMenuCards();
        setCategories(data.items);

        if (data.items.length > 0) {
          setOpenCategoryId(data.items[0].id);
        }
      } catch (err) {
        setError("Error al cargar el menú. Intenta recargar la página: " + err);
      } finally {
        setLoading(false);
      }
    };

    fetchMenu();
  }, []);

  const handleProductClick = (id: string) => {
    navigate(`/admin/producto/${id}`);
  };

  const toggleCategory = (id: string) => {
    setOpenCategoryId((prev) => (prev === id ? null : id));
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#fafcfe]">
        <div className="text-2xl font-bold text-[#004166]">
          Cargando menú...
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#fafcfe]">
        <div className="text-red-600 text-xl">{error}</div>
      </div>
    );
  }
  return (
    <div className="flex flex-col min-h-screen bg-[#fafcfe]">
      <AdminLayout>
        <h1 className="text-[45px] font-bold text-[#0E0E2C] text-center mb-8">
          Nuestro Menú
        </h1>

        <div className="flex flex-col gap-12 pb-10">
          {categories.map((category) =>
            openCategoryId === category.id ? (
              <MenuCategorySection
                key={category.id}
                category={category}
                onClick={() => toggleCategory(category.id)}
                onCardClick={handleProductClick}
              />
            ) : (
              <MenuCategoryHeader
                key={category.id}
                title={category.nombre}
                onClick={() => toggleCategory(category.id)}
              />
            ),
          )}

          {categories.length === 0 && (
            <p className="text-center text-gray-500 text-xl">
              No hay categorías disponibles.
            </p>
          )}
        </div>
      </AdminLayout>
    </div>
  );
};
