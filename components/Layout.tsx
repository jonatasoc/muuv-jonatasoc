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
      <Grid
        component="main"
        container
        justifyContent="center"
        sx={{ minHeight: "100vh", marginTop: "72px", width: "100%" }}
      >
        {children}
      </Grid>
      <Footer />
    </Container>
  );
}
