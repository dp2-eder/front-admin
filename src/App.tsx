import { Routes, Route, Navigate } from "react-router-dom";
import { LoginPage } from "./pages/LoginPage";
import { ListPage } from "./pages/ListPage";
import { ProductPage } from "./pages/ProductPage";
import { AuthProvider } from "./context/AuthProvider";
import { ProtectedRoute } from "./components/routes/ProtectedRoute";

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/admin/login" element={<LoginPage />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/admin/lista" element={<ListPage />} />
          <Route path="/admin/producto/:productId" element={<ProductPage />} />
          <Route
            path="/admin/producto"
            element={<Navigate to="/admin/lista" replace />}
          />
        </Route>
        <Route
          path="/admin/"
          element={<Navigate to="/admin/login" replace />}
        />
      </Routes>
    </AuthProvider>
  );
}

export default App;
