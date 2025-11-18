import { Routes, Route, Navigate } from "react-router-dom";
import { LoginPage } from "./pages/LoginPage";
import { ListPage } from "./pages/ListPage";
import { ProductPage } from "./pages/ProductPage";

function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/lista" element={<ListPage />} />
      <Route path="/producto/:productId" element={<ProductPage />} />
      <Route path="/producto" element={<Navigate to="/lista" replace />} />
      <Route path="/" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}

export default App;
