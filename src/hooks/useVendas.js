import { useState, useEffect } from "react";

export function useVendas() {
  const [vendas, setVendas] = useState([]);

  useEffect(() => {
    const carregarVendas = async () => {
      try {
        const res = await fetch(
          "https://my-json-server.typicode.com/Sifat-devs/db-desafio-frontend/vendas"
        );
        const data = await res.json();
        setVendas(data);
      } catch (error) {
        console.error("Erro ao carregar vendas", error);
      }
    };

    carregarVendas();
    window.addEventListener("focus", carregarVendas);

    return () => window.removeEventListener("focus", carregarVendas);
  }, []);

  return { vendas, setVendas };
}