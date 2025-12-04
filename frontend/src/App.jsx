import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./routers/AppRoutes";
import AuthProvider from "./context/AuthContext";

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </BrowserRouter>
  );
}
