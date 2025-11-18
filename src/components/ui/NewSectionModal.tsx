import { useState } from "react";

type Complemento = {
  id: number;
  nombre: string;
  precio: string;
};

type NuevaSeccionModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export const NuevaSeccionModal = ({
  isOpen,
  onClose,
}: NuevaSeccionModalProps) => {
  const [nombreSeccion, setNombreSeccion] = useState("");
  const [complementos, setComplementos] = useState<Complemento[]>([]);

  const handleAddComplemento = () => {
    setComplementos([
      ...complementos,
      { id: Date.now(), nombre: "", precio: "" },
    ]);
  };

  const handleComplementoChange = (
    id: number,
    field: "nombre" | "precio",
    value: string,
  ) => {
    setComplementos(
      complementos.map((c) => (c.id === id ? { ...c, [field]: value } : c)),
    );
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md p-6">
        <h2 className="text-2xl font-bold text-center mb-6 text-[#0E0E2C]">
          Nueva Sección
        </h2>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Nombre De La Sección
            </label>
            <input
              type="text"
              value={nombreSeccion}
              onChange={(e) => setNombreSeccion(e.target.value)}
              placeholder="Añade más bebidas"
              className="w-full h-12 px-4 py-2 bg-white rounded-xl border border-solid border-[#99a1ae] text-black text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="border rounded-lg p-4 max-h-60 overflow-y-auto">
            <h3 className="text-lg font-semibold mb-2 text-[#0E0E2C]">
              Complementos
            </h3>
            <div className="space-y-4">
              {complementos.map((comp) => (
                <div key={comp.id} className="p-4 border rounded-lg space-y-2">
                  <div>
                    <label className="block text-xs font-medium text-gray-500">
                      Nombre Del Complemento
                    </label>
                    <input
                      type="text"
                      value={comp.nombre}
                      onChange={(e) =>
                        handleComplementoChange(
                          comp.id,
                          "nombre",
                          e.target.value,
                        )
                      }
                      className="w-full h-10 px-3 py-1 bg-white rounded-md border border-solid border-[#99a1ae] text-black text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-500">
                      Precio Del Complemento
                    </label>
                    <input
                      type="text"
                      value={comp.precio}
                      onChange={(e) =>
                        handleComplementoChange(
                          comp.id,
                          "precio",
                          e.target.value,
                        )
                      }
                      className="w-full h-10 px-3 py-1 bg-white rounded-md border border-solid border-[#99a1ae] text-black text-sm"
                    />
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={handleAddComplemento}
              className="mt-4 w-full flex items-center justify-center py-2 border border-dashed rounded-lg text-gray-500 hover:bg-gray-50"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 4v16m8-8H4"
                />
              </svg>
            </button>
          </div>
        </div>

        <div className="flex justify-end gap-4 mt-6">
          <button
            onClick={onClose}
            className="px-6 py-2 bg-white border border-gray-300 rounded-lg shadow-sm text-black font-semibold hover:bg-gray-50"
          >
            Cancelar
          </button>
          <button
            onClick={onClose}
            className="px-6 py-2 bg-[#004166] text-white rounded-lg shadow-sm font-semibold hover:opacity-90"
          >
            Guardar
          </button>
        </div>
      </div>
    </div>
  );
};
