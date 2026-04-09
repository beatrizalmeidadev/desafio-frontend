import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Header from "./Header";
import Produtos from "./pages/Produtos";
import Faturamento from "./pages/Faturamento";
import Cadastro from "./pages/Cadastro";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Navigate to="/produtos" />} />
        <Route path="/produtos" element={<Produtos />} />
        <Route path="/faturamento" element={<Faturamento />} />
        <Route path="/cadastro" element={<Cadastro />} />
      </Routes>
      <ToastContainer />
    </BrowserRouter>
  );
}

export default App;