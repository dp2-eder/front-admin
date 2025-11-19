import { Routes, Route, Navigate } from "react-router-dom";
import { LoginPage } from "./pages/LoginPage";
import { ListPage } from "./pages/ListPage";
import { ProductPage } from "./pages/ProductPage";

function App() {
  return (
    <Routes>
      <Route path="/admin/login" element={<LoginPage />} />
      <Route path="/admin/lista" element={<ListPage />} />
      <Route path="/admin/producto/:productId" element={<ProductPage />} />
      <Route
        path="/admin/producto"
        element={<Navigate to="/admin/lista" replace />}
      />
      <Route path="/admin/" element={<Navigate to="/admin/login" replace />} />
    </Routes>
  );
}

export default App;
