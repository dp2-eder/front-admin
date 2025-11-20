import type { MenuOptionGroup } from "../../types/types";

type ProductSectionDisplayProps = {
  section: MenuOptionGroup;
};

export const ProductSectionDisplay = ({
  section,
}: ProductSectionDisplayProps) => {
  const inputType = section.seleccion_maxima === 1 ? "radio" : "checkbox";

  return (
    <div className="w-full bg-white rounded-xl border border-solid border-[#99a1ae] p-4">
      <div className="flex justify-between items-center mb-3">
        <h3 className="text-lg font-semibold text-[#0E0E2C]">
          {section.nombre_tipo}
        </h3>
        <span className="text-xs text-gray-500">
          {section.seleccion_minima > 0 ? "Obligatorio" : "Opcional"}
          {section.seleccion_maxima
            ? ` (Max: ${section.seleccion_maxima})`
            : ""}
        </span>
      </div>

      <div className="max-h-60 overflow-y-auto">
        {section.opciones.map((option) => (
          <div
            key={option.id}
            className="flex justify-between items-center py-2 border-b border-solid border-[#d0d5db] last:border-b-0"
          >
            <div className="flex items-center gap-3">
              <input
                type={inputType}
                name={`section-${section.id_tipo_opcion}`}
                id={option.id}
                disabled={!option.activo}
                defaultChecked={false}
                className="h-4 w-4 border-gray-400 text-blue-600 focus:ring-blue-500"
              />
              <label
                htmlFor={option.id}
                className={`text-sm ${option.activo ? "text-black" : "text-gray-400"}`}
              >
                {option.nombre}
              </label>
            </div>
            <span className="text-sm text-gray-600">
              {Number(option.precio_adicional) > 0
                ? `+$${option.precio_adicional}`
                : "Gratis"}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
