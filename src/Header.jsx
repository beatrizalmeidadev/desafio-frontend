import { Link, useLocation } from "react-router-dom";

function Header() {
  const location = useLocation();

  return (
    <header style={styles.header}>
      <h2 style={styles.logo}>
        📦 Estoque <span style={styles.logoDestaque}>App</span>
      </h2>

      <nav style={styles.nav}>
        <Link
          to="/produtos"
          style={{
            ...styles.link,
            ...(location.pathname === "/produtos" && styles.active)
          }}
        >
          Produtos
        </Link>

        <Link
          to="/faturamento"
          style={{
            ...styles.link,
            ...(location.pathname === "/faturamento" && styles.active)
          }}
        >
          Faturamento
        </Link>

        <Link
          to="/cadastro"
          style={{
            ...styles.link,
            ...(location.pathname === "/cadastro" && styles.active)
          }}
        >
          Cadastro
        </Link>
      </nav>
    </header>
  );
}

const styles = {
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "15px 30px",
    backgroundColor: "#020617",
    color: "#fff",
    borderBottom: "1px solid #334155"
  },
  logo: {
    margin: 0,
    fontSize: "22px",
    fontWeight: "bold",
    letterSpacing: "1px"
  },
  logoDestaque: {
    color: "#3b82f6"
  },
  nav: {
    display: "flex",
    gap: "15px",
  },
  link: {
    color: "#fff",
    textDecoration: "none",
    fontWeight: "500",
    padding: "8px 16px",
    borderRadius: "8px",
    transition: "0.3s",
  },
  active: {
    backgroundColor: "#2563eb",
  },
};

export default Header;