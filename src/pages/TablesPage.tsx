import { useState, useEffect } from "react";
import { AdminLayout } from "../components/ui/AdminLayout";
import { getActiveSessions, closeSession } from "../services/sessionService";
import type { TableSession } from "../types/types";
import { syncMesas } from "../services/syncService";

export const TableSessionsPage = () => {
  const [sessions, setSessions] = useState<TableSession[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [processingId, setProcessingId] = useState<string | null>(null);
  const [isSyncing, setIsSyncing] = useState(false);

  const fetchSessions = async () => {
    try {
      setLoading(true);
      const data = await getActiveSessions();
      setSessions(data.sesiones);
      setError(null);
    } catch (err) {
      setError("No se pudieron cargar las sesiones activas.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSessions();
  }, []);

  const handleCloseSession = async (sessionId: string, tableId: string) => {
    if (
      !window.confirm(
        `¿Estás seguro de que deseas cerrar la sesión de la Mesa ${tableId}?`,
      )
    ) {
      return;
    }

    try {
      setProcessingId(sessionId);
      await closeSession(sessionId);
      await fetchSessions();
    } catch (err) {
      alert("Error al cerrar la sesión. Inténtalo de nuevo." + err);
    } finally {
      setProcessingId(null);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString("es-PE", {
      dateStyle: "short",
      timeStyle: "short",
    });
  };

  const handleSyncMesas = async () => {
    try {
      setIsSyncing(true);
      await syncMesas();
      await fetchSessions();
      alert('Se sincronizaron las mesas correctamente');
    } catch (error) {
      setError("Error al sincronizar las mesas: " + error);
    } finally {
      setIsSyncing(false);
    }
  };

  if (loading && sessions.length === 0) {
    return (
      <AdminLayout>
        <div className="flex min-h-[50vh] items-center justify-center text-[#004166] text-xl font-bold">
          Cargando sesiones...
        </div>
      </AdminLayout>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-[#fafcfe]">
      <AdminLayout>
        <div className="relative flex items-center justify-center mb-8">
          <h1 className="text-[45px] font-bold text-[#0E0E2C] text-center">
            Mesas activas
          </h1>

          <button
            onClick={() => handleSyncMesas()}
            disabled={isSyncing}
            className={`absolute right-0 py-3 px-6 bg-[#004166] text-white rounded-lg font-bold shadow-md transition-all
              ${
                isSyncing
                  ? "opacity-70 cursor-not-allowed bg-[#002f4a]"
                  : "hover:bg-[#002f4a]"
              }`}
          >
            {isSyncing ? "Sincronizando..." : "Sincronizar mesas"}
          </button>
        </div>

        {error && (
          <div className="mb-6 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded text-center">
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sessions.map((session) => (
            <div
              key={session.id}
              className="bg-white rounded-[20px] shadow-lg border border-gray-200 overflow-hidden flex flex-col"
            >
              <div className="bg-[#004166] p-4 text-center">
                <h2 className="text-2xl font-bold text-white">
                  Mesa {session.numero_mesa}
                </h2>
              </div>

              <div className="p-6 flex-1 flex flex-col gap-4">
                <div className="flex justify-between border-b border-gray-100 pb-2">
                  <span className="text-gray-500 font-medium">Inicio:</span>
                  <span className="text-[#0E0E2C] font-semibold">
                    {formatDate(session.fecha_inicio)}
                  </span>
                </div>

                <div className="flex justify-between border-b border-gray-100 pb-2">
                  <span className="text-gray-500 font-medium">Estado:</span>
                  <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs font-bold uppercase">
                    {session.estado}
                  </span>
                </div>

                <div className="mt-auto pt-4">
                  <button
                    onClick={() =>
                      handleCloseSession(session.id, session.id_mesa)
                    }
                    disabled={processingId === session.id}
                    className={`w-full py-3 rounded-xl font-bold text-white shadow-md transition-all
                      ${
                        processingId === session.id
                          ? "bg-gray-400 cursor-not-allowed"
                          : "bg-red-600 hover:bg-red-700 active:scale-95"
                      }`}
                  >
                    {processingId === session.id
                      ? "Cerrando..."
                      : "Cerrar Mesa"}
                  </button>
                </div>
              </div>
            </div>
          ))}

          {sessions.length === 0 && !loading && (
            <div className="col-span-full text-center py-20 bg-white rounded-[30px] shadow-sm border border-gray-100">
              <p className="text-2xl text-gray-400 font-medium">
                No hay sesiones activas en este momento.
              </p>
            </div>
          )}
        </div>
      </AdminLayout>
    </div>
  );
};