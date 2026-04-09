import { 
  Box, Container, Typography, TableContainer, Table, TableHead, TableRow, 
  TableCell, TableBody, Paper, IconButton, Stack, Button, TextField, MenuItem 
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router-dom";
import { useProdutos } from "../hooks/useProdutos";

export default function Produtos() {
  const navigate = useNavigate();
  const {
    produtosPaginados,
    getNomeGrupo,
    handleDelete,
    handleOrdenar,
    busca,
    setBusca,
    paginaAtual,
    setPaginaAtual,
    totalPaginas
  } = useProdutos();

  return (
    <Box sx={{ minHeight: "100vh", backgroundColor: "#0f172a", p: 3 }}>
      <Container maxWidth="md">
        <Typography 
          variant="h4" 
          gutterBottom 
          sx={{ color: "#fff", fontWeight: "bold", textAlign: "center" }}
        >
          Produtos
        </Typography>

        <TextField
          label="Buscar produto"
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
                {["nome", "grupo", "precoVenda", "quantidadeEstoque"].map((campo) => (
                  <TableCell
                    key={campo}
                    sx={{ color: "#fff", fontWeight: "bold", cursor: "pointer" }}
                    onClick={() => handleOrdenar(campo)}
                  >
                    {campo === "nome" ? "Nome" : 
                     campo === "grupo" ? "Grupo" : 
                     campo === "precoVenda" ? "Preço" : 
                     "Estoque"}
                  </TableCell>
                ))}
                <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>Ações</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {produtosPaginados.map((p) => (
                <TableRow key={p.id} hover sx={{ "&:hover": { backgroundColor: "#334155" } }}>
                  <TableCell sx={{ color: "#ddd" }}>{p.nome}</TableCell>
                  <TableCell sx={{ color: "#ddd" }}>{getNomeGrupo(p.idGrupo)}</TableCell>
                  <TableCell sx={{ color: "#ddd" }}>R$ {p.precoVenda}</TableCell>
                  <TableCell sx={{ color: "#ddd" }}>{p.quantidadeEstoque}</TableCell>
                  <TableCell>
                    <Stack direction="row" spacing={1}>
                      <IconButton 
                        color="primary" 
                        onClick={() => navigate("/cadastro", { state: { produto: p } })}
                      >
                        <EditIcon />
                      </IconButton>
                      <IconButton color="error" onClick={() => handleDelete(p.id)}>
                        <DeleteIcon />
                      </IconButton>
                    </Stack>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 2, mt: 3 }}>
          <Button
            variant="outlined"
            onClick={() => setPaginaAtual((p) => Math.max(p - 1, 1))}
            disabled={paginaAtual === 1}
            sx={{ borderRadius: 2 }}
          >
            Anterior
          </Button>

          <Typography sx={{ color: "#fff" }}>{paginaAtual} / {totalPaginas}</Typography>

          <Button
            variant="outlined"
            onClick={() => setPaginaAtual((p) => Math.min(p + 1, totalPaginas))}
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