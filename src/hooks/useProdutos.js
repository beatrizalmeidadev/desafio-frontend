// useProdutos.js
import { useState, useEffect } from "react";
import { toast } from "react-toastify";

export function useProdutos() {
  const [produtos, setProdutos] = useState([]);
  const [grupos, setGrupos] = useState([]);
  const [busca, setBusca] = useState("");
  const [paginaAtual, setPaginaAtual] = useState(1);
  const [ordenacao, setOrdenacao] = useState({ campo: "", direcao: "asc" });

  const itensPorPagina = 5;

  const carregarDados = async () => {
    try {
      const resProdutos = await fetch(
        "https://my-json-server.typicode.com/Sifat-devs/db-desafio-frontend/produtos_cadastrados"
      );
      const dataProdutos = await resProdutos.json();

      const produtosLocal = JSON.parse(localStorage.getItem("produtos")) || [];
      setProdutos([...dataProdutos, ...produtosLocal]);

      const resGrupos = await fetch(
        "https://my-json-server.typicode.com/Sifat-devs/db-desafio-frontend/grupos"
      );
      const dataGrupos = await resGrupos.json();
      setGrupos(dataGrupos);
    } catch (err) {
      console.error("Erro ao carregar dados", err);
    }
  };

  useEffect(() => {
    carregarDados();
    window.addEventListener("focus", carregarDados);
    return () => window.removeEventListener("focus", carregarDados);
  }, []);

  const getNomeGrupo = (idGrupo) => {
    const grupo = grupos.find((g) => g.id === Number(idGrupo));
    return grupo ? grupo.nome : "Sem grupo";
  };

  const adicionarProduto = (produtoData) => {
    const produtosLocal = JSON.parse(localStorage.getItem("produtos")) || [];
    const novoProduto = { id: Date.now(), ...produtoData };
    produtosLocal.push(novoProduto);
    localStorage.setItem("produtos", JSON.stringify(produtosLocal));
    setProdutos((prev) => [...prev, novoProduto]);
    toast.success("Produto adicionado");
  };

  const atualizarProduto = (id, produtoData) => {
    const produtosLocal = JSON.parse(localStorage.getItem("produtos")) || [];
    const index = produtosLocal.findIndex((p) => p.id === id);
    if (index !== -1) {
      produtosLocal[index] = { id, ...produtoData };
      localStorage.setItem("produtos", JSON.stringify(produtosLocal));
      setProdutos((prev) =>
        prev.map((p) => (p.id === id ? { id, ...produtoData } : p))
      );
      toast.success("Produto atualizado");
    }
  };

  const handleDelete = (id) => {
    const produtosLocal = JSON.parse(localStorage.getItem("produtos")) || [];
    const atualizados = produtosLocal.filter((p) => p.id !== id);
    localStorage.setItem("produtos", JSON.stringify(atualizados));
    setProdutos((prev) => prev.filter((p) => p.id !== id));
    toast.success("Produto excluído");
  };

  const handleOrdenar = (campo) => {
    const direcao =
      ordenacao.campo === campo && ordenacao.direcao === "asc" ? "desc" : "asc";
    setOrdenacao({ campo, direcao });
  };

  // Filtra e ordena
  const produtosFiltrados = produtos
    .filter((p) =>
      p.nome.toLowerCase().includes(busca.toLowerCase()) ||
      getNomeGrupo(p.idGrupo).toLowerCase().includes(busca.toLowerCase())
    )
    .sort((a, b) => {
      if (!ordenacao.campo) return 0;
      let valorA =
        ordenacao.campo === "grupo" ? getNomeGrupo(a.idGrupo) : a[ordenacao.campo];
      let valorB =
        ordenacao.campo === "grupo" ? getNomeGrupo(b.idGrupo) : b[ordenacao.campo];

      if (typeof valorA === "string") {
        return ordenacao.direcao === "asc"
          ? valorA.localeCompare(valorB)
          : valorB.localeCompare(valorA);
      }
      return ordenacao.direcao === "asc" ? valorA - valorB : valorB - valorA;
    });

  // Calcula paginação
  const totalPaginas = Math.max(1, Math.ceil(produtosFiltrados.length / itensPorPagina));

  // Garante que paginaAtual nunca seja maior que totalPaginas
  useEffect(() => {
    if (paginaAtual > totalPaginas) {
      setPaginaAtual(totalPaginas);
    }
  }, [totalPaginas, paginaAtual]);

  const inicio = (paginaAtual - 1) * itensPorPagina;
  const produtosPaginados = produtosFiltrados.slice(inicio, inicio + itensPorPagina);

  return {
    produtosPaginados,
    grupos,
    getNomeGrupo,
    adicionarProduto,
    atualizarProduto,
    handleDelete,
    handleOrdenar,
    busca,
    setBusca,
    paginaAtual,
    setPaginaAtual,
    totalPaginas,
  };
}