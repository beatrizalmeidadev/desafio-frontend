import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Container, TextField, Button, MenuItem, Box, Typography, Paper, Stack } from "@mui/material";
import { useProdutos } from "../hooks/useProdutos";

export default function Cadastro() {
  const navigate = useNavigate();
  const location = useLocation();
  const { grupos = [], adicionarProduto, atualizarProduto } = useProdutos();

  const produtoEditar = location.state?.produto || null;

  const [nome, setNome] = useState("");
  const [idGrupo, setIdGrupo] = useState("");
  const [precoVenda, setPrecoVenda] = useState("");
  const [quantidadeEstoque, setQuantidadeEstoque] = useState("");

  useEffect(() => {
    if (produtoEditar) {
      setNome(produtoEditar.nome);
      setIdGrupo(produtoEditar.idGrupo || "");
      setPrecoVenda(produtoEditar.precoVenda || "");
      setQuantidadeEstoque(produtoEditar.quantidadeEstoque || "");
    }
  }, [produtoEditar]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!nome || !idGrupo || !precoVenda) return alert("Preencha os campos obrigatórios!");

    const produtoData = { nome, idGrupo, precoVenda, quantidadeEstoque };

    if (produtoEditar) {
      atualizarProduto(produtoEditar.id, produtoData);
    } else {
      adicionarProduto(produtoData);
    }

    navigate("/produtos");
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Paper sx={{ p: 4 }}>
        <Typography variant="h5" mb={3} sx={{ textAlign: "center" }}>
          {produtoEditar ? "Editar Produto" : "Cadastrar Produto"}
        </Typography>

        <Box component="form" onSubmit={handleSubmit}>
          <Stack spacing={2}>
            <TextField label="Nome" value={nome} onChange={(e) => setNome(e.target.value)} required />
            <TextField select label="Grupo" value={idGrupo} onChange={(e) => setIdGrupo(e.target.value)} required>
              {grupos.map((g) => (
                <MenuItem key={g.id} value={g.id}>{g.nome}</MenuItem>
              ))}
            </TextField>
            <TextField label="Preço de Venda" type="number" value={precoVenda} onChange={(e) => setPrecoVenda(e.target.value)} required />
            <TextField label="Quantidade em Estoque" type="number" value={quantidadeEstoque} onChange={(e) => setQuantidadeEstoque(e.target.value)} />
            <Button type="submit" variant="contained" color="primary">
              {produtoEditar ? "Atualizar Produto" : "Cadastrar Produto"}
            </Button>
          </Stack>
        </Box>
      </Paper>
    </Container>
  );
}