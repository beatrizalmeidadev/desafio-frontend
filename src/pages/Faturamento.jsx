import { useState } from "react";
import {
  Container,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Box,
  Typography
} from "@mui/material";
import { useVendas } from "../hooks/useVendas"; 

function Faturamento() {
  const { vendas } = useVendas();
  const [busca, setBusca] = useState("");
  const [paginaAtual, setPaginaAtual] = useState(1);
  const [ordenacao, setOrdenacao] = useState({ campo: "", direcao: "asc" });

  const itensPorPagina = 5;

  const vendasFiltradas = vendas?.filter((v) =>
    String(v.idPedido).includes(busca)
  ) || [];

  const handleOrdenar = (campo) => {
    const direcao =
      ordenacao.campo === campo && ordenacao.direcao === "asc" ? "desc" : "asc";
    setOrdenacao({ campo, direcao });
  };

  let vendasOrdenadas = [...vendasFiltradas];
  if (ordenacao.campo) {
    vendasOrdenadas.sort((a, b) => {
      let valorA = a[ordenacao.campo];
      let valorB = b[ordenacao.campo];

      if (typeof valorA === "string") {
        return ordenacao.direcao === "asc"
          ? valorA.localeCompare(valorB)
          : valorB.localeCompare(valorA);
      }

      return ordenacao.direcao === "asc" ? valorA - valorB : valorB - valorA;
    });
  }

  const totalPaginas = Math.ceil(vendasOrdenadas.length / itensPorPagina);
  const inicio = (paginaAtual - 1) * itensPorPagina;
  const vendasPaginadas = vendasOrdenadas.slice(inicio, inicio + itensPorPagina);

  return (
    <Box sx={{ minHeight: "100vh", backgroundColor: "#0f172a", color: "#fff", p: 3 }}>
      <Container maxWidth="md">
        <Typography variant="h4" gutterBottom sx={{ textAlign: "center", fontWeight: "bold" }}>
          Faturamento
        </Typography>

        <TextField
          label="Buscar pedido"
          variant="outlined"
          size="small"
          fullWidth
          value={busca}
          onChange={(e) => {
            setBusca(e.target.value);
            setPaginaAtual(1);
          }}
          sx={{
            mb: 3,
            input: { color: "#fff" },
            label: { color: "#aaa" },
            "& .MuiOutlinedInput-root": {
              "& fieldset": { borderColor: "#555" },
              "&:hover fieldset": { borderColor: "#888" },
              "&.Mui-focused fieldset": { borderColor: "#1976d2" }
            }
          }}
        />

        <TableContainer component={Paper} sx={{ backgroundColor: "#1e293b", borderRadius: 2 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell
                  sx={{ color: "#fff", fontWeight: "bold", cursor: "pointer" }}
                  onClick={() => handleOrdenar("idPedido")}
                >
                  Pedido
                </TableCell>
                <TableCell
                  sx={{ color: "#fff", fontWeight: "bold", cursor: "pointer" }}
                  onClick={() => handleOrdenar("valorTotalPedido")}
                >
                  Valor
                </TableCell>
                <TableCell
                  sx={{ color: "#fff", fontWeight: "bold", cursor: "pointer" }}
                  onClick={() => handleOrdenar("data")}
                >
                  Data
                </TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {vendasPaginadas.map((v) => (
                <TableRow key={v.idPedido} hover sx={{ "&:hover": { backgroundColor: "#334155" } }}>
                  <TableCell sx={{ color: "#ddd" }}>{v.idPedido}</TableCell>
                  <TableCell sx={{ color: "#ddd" }}>R$ {v.valorTotalPedido}</TableCell>
                  <TableCell sx={{ color: "#ddd" }}>{v.data}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: 2,
            mt: 3
          }}
        >
          <Button
            variant="outlined"
            onClick={() => setPaginaAtual((p) => p - 1)}
            disabled={paginaAtual === 1}
            sx={{ borderRadius: 2 }}
          >
            Anterior
          </Button>

          <Typography sx={{ color: "#fff" }}>
            {paginaAtual} / {totalPaginas}
          </Typography>

          <Button
            variant="outlined"
            onClick={() => setPaginaAtual((p) => p + 1)}
            disabled={paginaAtual === totalPaginas}
            sx={{ borderRadius: 2 }}
          >
            Próxima
          </Button>
        </Box>
      </Container>
    </Box>
  );
}

export default Faturamento;