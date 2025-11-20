import { useState, useEffect } from "react";
import { getAllAllergens } from "../../services/menuService";
import type { Alergeno, ProductAlergeno } from "../../types/types";

type AllergenListProps = {
  selectedAllergens?: ProductAlergeno[];
};

export const AllergenList = ({ selectedAllergens = [] }: AllergenListProps) => {
  const [availableAllergens, setAvailableAllergens] = useState<Alergeno[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAllergens = async () => {
      try {
        const data = await getAllAllergens();
        setAvailableAllergens(data.items.filter((a) => a.activo));
      } catch (error) {
        console.error("Error cargando alérgenos", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAllergens();
  }, []);

  if (loading) {
    return <div className="p-4 border rounded-xl">Cargando alérgenos...</div>;
  }

  return (
    <div className="w-full bg-white rounded-xl border border-solid border-[#99a1ae] p-4">
      <div className="flex justify-between items-center mb-3">
        <h3 className="text-lg font-semibold">Alérgenos</h3>
        <span className="bg-[#004166] text-white text-xs font-medium px-2 py-0.5 rounded-md">
          Informativo
        </span>
      </div>

      <div className="max-h-80 overflow-y-auto">
        {availableAllergens.map((allergen) => {
          const isChecked = selectedAllergens.some(
            (selected) => selected.id === allergen.id,
          );

          return (
            <div
              key={allergen.id}
              className="flex items-center gap-3 py-2 border-b border-solid border-[#d0d5db] last:border-b-0"
            >
              <input
                type="checkbox"
                id={`allergen-${allergen.id}`}
                checked={isChecked}
                className="h-4 w-4 rounded border-gray-400 text-blue-600 focus:ring-blue-500 pointer-events-none"
              />
              <label
                htmlFor={`allergen-${allergen.id}`}
                className="text-sm text-black"
              >
                {allergen.nombre}
              </label>
            </div>
          );
        })}

        {availableAllergens.length === 0 && (
          <p className="text-sm text-gray-500 text-center py-2">
            No hay alérgenos configurados.
          </p>
        )}
      </div>
    </div>
  );
};
