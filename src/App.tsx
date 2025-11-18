import { Routes, Route, Navigate } from "react-router-dom";
import { DesktopInicioDe } from "./pages/login";
import { DesktopListaDe } from "./pages/lista";
import { Desktop } from "./pages/producto";

function App() {
  return (
    <Routes>
      <Route path="/login" element={<DesktopInicioDe />} />
      <Route path="/lista" element={<DesktopListaDe />} />
      <Route path="/producto/:productId" element={<Desktop />} />
      <Route path="/producto" element={<Navigate to="/lista" replace />} />
      <Route path="/" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}

export default App;
