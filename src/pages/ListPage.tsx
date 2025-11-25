import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AdminLayout } from "../components/ui/AdminLayout";
import { MenuCategoryHeader } from "../components/ui/MenuCategoryHeader";
import { MenuCategorySection } from "../components/ui/MenuCategorySection";
import { getMenuCards } from "../services/menuService";
import type { CategoryWithProductsCard } from "../types/types";
import { syncPlatos } from "../services/syncService";

export const ListPage = () => {
  const navigate = useNavigate();

  const [categories, setCategories] = useState<CategoryWithProductsCard[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [openCategoryId, setOpenCategoryId] = useState<string | null>(null);


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


  useEffect(() => {
    fetchMenu();
  }, []);

  const handleProductClick = (id: string) => {
    navigate(`/admin/producto/${id}`);
  };

  const toggleCategory = (id: string) => {
    setOpenCategoryId((prev) => (prev === id ? null : id));
  };

  const handleSyncPlatos = async () => {
    try{
      await syncPlatos();
      fetchMenu();
    } catch(error) {
      setError("Error al sincronizar los platos: " + error);
    } finally {
      alert('Se sincronizaron los platos');
    }
  }

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex min-h-[50vh] items-center justify-center text-[#004166] text-xl font-bold">
          Cargando menú...
        </div>
      </AdminLayout>
      
    );
  }

  if (error) {
    return (
      <AdminLayout>
        <div className="flex min-h-screen items-center justify-center bg-[#fafcfe]">
          <div className="text-red-600 text-xl">{error}</div>
        </div>
      </AdminLayout>
    );
  }
  return (
    <div className="flex flex-col min-h-screen bg-[#fafcfe]">
      <AdminLayout>
        <div className="relative flex items-center justify-center mb-8">
          <h1 className="text-[45px] font-bold text-[#0E0E2C] text-center">
            Nuestro Menú
          </h1>

          <button
            onClick={() => handleSyncPlatos()}
            className="absolute right-0 py-3 px-6 bg-[#004166] text-white rounded-lg font-bold hover:bg-[#002f4a] transition-colors shadow-md"
          >
            Sincronizar platos
          </button>
        </div>

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
