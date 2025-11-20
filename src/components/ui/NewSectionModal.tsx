import { useState, useEffect } from "react";
import type { MenuOptionGroup } from "../../types/types";

type ComplementoForm = {
  id: number;
  nombre: string;
  precio: string;
};

type NuevaSeccionModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onSave: (newSection: MenuOptionGroup) => void;
};

export const NuevaSeccionModal = ({
  isOpen,
  onClose,
  onSave,
}: NuevaSeccionModalProps) => {
  const [nombreSeccion, setNombreSeccion] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [seleccionMinima, setSeleccionMinima] = useState(0);
  const [seleccionMaxima, setSeleccionMaxima] = useState(1);
  const [ordenTipo, setOrdenTipo] = useState(1);

  const [complementos, setComplementos] = useState<ComplementoForm[]>([]);

  useEffect(() => {
    if (isOpen) {
      setNombreSeccion("");
      setDescripcion("");
      setSeleccionMinima(0);
      setSeleccionMaxima(1);
      setOrdenTipo(1);
      setComplementos([]);
    }
  }, [isOpen]);

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

  const handleDeleteComplemento = (id: number) => {
    setComplementos(complementos.filter((c) => c.id !== id));
  };

  const handleSubmit = () => {
    if (!nombreSeccion.trim())
      return alert("El nombre de la sección es obligatorio");
    if (seleccionMinima > seleccionMaxima)
      return alert("La selección mínima no puede ser mayor a la máxima");
    if (complementos.some((c) => !c.nombre.trim()))
      return alert("Todas las opciones deben tener nombre");

    const newSection: MenuOptionGroup = {
      id_tipo_opcion: `temp-${Date.now()}`,
      nombre_tipo: nombreSeccion,
      descripcion_tipo: descripcion,
      seleccion_minima: seleccionMinima,
      seleccion_maxima: seleccionMaxima,
      orden_tipo: ordenTipo,
      opciones: complementos.map((c, index) => ({
        id: `temp-opt-${Date.now()}-${index}`,
        nombre: c.nombre,
        precio_adicional: c.precio || "0",
        activo: true,
        orden: index + 1,
      })),
    };

    onSave(newSection);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm p-4">
      <div className="bg-white rounded-[20px] shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col">
        <div className="p-6 border-b border-gray-100 bg-[#FAFCFE]">
          <h2 className="text-2xl font-bold text-center text-[#0E0E2C]">
            Nueva Sección de Opciones
          </h2>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-6 scrollbar-thin">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
              <label className="block text-sm font-bold text-gray-700 mb-1">
                Nombre de la Sección
              </label>
              <input
                type="text"
                value={nombreSeccion}
                onChange={(e) => setNombreSeccion(e.target.value)}
                placeholder="Ej: Salsas, Bebidas, Nivel de Picante"
                className="w-full h-12 px-4 bg-white rounded-xl border border-[#99a1ae] focus:ring-2 focus:ring-[#004166] outline-none transition-all"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-bold text-gray-700 mb-1">
                Descripción (Opcional)
              </label>
              <textarea
                value={descripcion}
                onChange={(e) => setDescripcion(e.target.value)}
                placeholder="Ej: Elige tus salsas favoritas..."
                rows={2}
                className="w-full p-4 bg-white rounded-xl border border-[#99a1ae] focus:ring-2 focus:ring-[#004166] outline-none resize-none transition-all"
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">
                Selección Mínima
              </label>
              <input
                type="number"
                min="0"
                value={seleccionMinima}
                onChange={(e) =>
                  setSeleccionMinima(parseInt(e.target.value) || 0)
                }
                className="w-full h-12 px-4 bg-white rounded-xl border border-[#99a1ae] focus:ring-2 focus:ring-[#004166] outline-none"
              />
              <span className="text-xs text-gray-500 ml-1">0 = Opcional</span>
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">
                Selección Máxima
              </label>
              <input
                type="number"
                min="1"
                value={seleccionMaxima}
                onChange={(e) =>
                  setSeleccionMaxima(parseInt(e.target.value) || 1)
                }
                className="w-full h-12 px-4 bg-white rounded-xl border border-[#99a1ae] focus:ring-2 focus:ring-[#004166] outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">
                Orden de Visualización
              </label>
              <input
                type="number"
                min="1"
                value={ordenTipo}
                onChange={(e) => setOrdenTipo(parseInt(e.target.value) || 1)}
                className="w-full h-12 px-4 bg-white rounded-xl border border-[#99a1ae] focus:ring-2 focus:ring-[#004166] outline-none"
              />
            </div>
          </div>

          <hr className="border-gray-200" />

          <div>
            <div className="flex justify-between items-end mb-3">
              <h3 className="text-lg font-bold text-[#0E0E2C]">
                Opciones / Complementos
              </h3>
              <span className="text-xs text-gray-500">
                Se mostrarán en este orden
              </span>
            </div>

            <div className="space-y-3 bg-gray-50 p-4 rounded-xl border border-dashed border-gray-300">
              {complementos.map((comp, index) => (
                <div
                  key={comp.id}
                  className="flex gap-3 items-center bg-white p-3 rounded-lg shadow-sm border border-gray-100 group hover:border-gray-300 transition-all"
                >
                  <div className="flex items-center justify-center h-8 w-8 bg-gray-100 rounded-full text-xs font-bold text-gray-500">
                    {index + 1}
                  </div>

                  <div className="flex-grow">
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
                      placeholder="Nombre (ej: Mayonesa)"
                      className="w-full px-2 py-1 border-b border-gray-200 focus:border-[#004166] outline-none text-sm bg-transparent"
                    />
                  </div>

                  <div className="w-24 relative">
                    <span className="absolute left-0 top-1 text-gray-400 text-sm">
                      $
                    </span>
                    <input
                      type="number"
                      value={comp.precio}
                      onChange={(e) =>
                        handleComplementoChange(
                          comp.id,
                          "precio",
                          e.target.value,
                        )
                      }
                      placeholder="0.00"
                      className="w-full pl-4 pr-2 py-1 border-b border-gray-200 focus:border-[#004166] outline-none text-sm text-right bg-transparent"
                    />
                  </div>

                  <button
                    onClick={() => handleDeleteComplemento(comp.id)}
                    className="text-gray-300 hover:text-red-500 hover:bg-red-50 p-1.5 rounded-full transition-colors"
                    title="Eliminar opción"
                  >
                    ✕
                  </button>
                </div>
              ))}

              {complementos.length === 0 && (
                <div className="text-center py-4">
                  <p className="text-sm text-gray-400 mb-2">
                    No has agregado opciones a esta sección.
                  </p>
                </div>
              )}

              <button
                onClick={handleAddComplemento}
                className="w-full py-3 border-2 border-dashed border-[#004166] text-[#004166] rounded-lg font-bold hover:bg-[#004166] hover:text-white transition-all flex items-center justify-center gap-2 shadow-sm hover:shadow-md"
              >
                <span className="text-xl leading-none mb-0.5">+</span> Agregar
                Opción
              </button>
            </div>
          </div>
        </div>

        <div className="p-6 border-t border-gray-100 bg-gray-50 flex justify-end gap-4">
          <button
            onClick={onClose}
            className="px-6 py-2 bg-white border border-gray-300 rounded-lg shadow-sm text-gray-700 font-bold hover:bg-gray-100 transition-colors"
          >
            Cancelar
          </button>
          <button
            onClick={handleSubmit}
            className="px-8 py-2 bg-[#004166] text-white rounded-lg shadow-lg font-bold hover:opacity-90 transition-transform active:scale-95"
          >
            Guardar Sección
          </button>
        </div>
      </div>
    </div>
  );
};
