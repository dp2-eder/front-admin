import { ALLERGENS } from "../../mockData/menuData";

export const AllergenList = () => (
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
