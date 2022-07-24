import { Container, Grid } from "@mui/material";
import Footer from "components/Footer";
import Header from "components/Header";
import { ReactNode } from "react";

interface LayoutPros {
  children: ReactNode;
}

export default function Layout({ children }: LayoutPros) {
  return (
    <Container
      sx={{ margin: { xs: 0 }, maxWidth: { xs: "unset" }, padding: { xs: 0 } }}
    >
      <Header />
      <Grid component="main">
        <Grid sx={{ minHeight: "100vh" }}>{children}</Grid>
      </Grid>
      <Footer />
    </Container>
  );
}
