import Head from "next/head";
import { Box, Container, Unstable_Grid2 as Grid, Typography } from "@mui/material";
import { buscarInformacoesDashboardUserCase, DashboardDTO } from "@/core";
import { GraficoLinha } from "@/core/ui/componentes/grafico-linha/grafico-linha";
import { CartaoGenerico } from "@/core/ui/componentes/cartao-generico/cartao-generico"
import { Dataset } from "@/core/ui/componentes/grafico-linha/Dataset";
import { LineChartProps } from "@/core/ui/componentes/grafico-linha/LineChartProps";
import Options from "@/core/ui/componentes/grafico-linha/options";
import SmartphoneIcon from "@mui/icons-material/Smartphone";
import CartaoGenericoProps from "@/core/ui/componentes/cartao-generico/CartaoGenericoProps";
import { CartaoGenericoComIndicador } from "@/core/ui/componentes/cartao-generico-indicador/cartao-generico-indicador";
import { TabelaProps } from "@/core/ui/componentes/tabela/TabelaProps";
import { Tabela } from "@/core/ui/componentes/tabela/Tabela";

export default function Dashboard() {
  const dashboardInfo: DashboardDTO = buscarInformacoesDashboardUserCase.buscarInformacoes();
  
  const cartaoGenericoComponents = dashboardInfo.horizontalWidgets.map((element, index) => {
    const cartaoGenericoProps: CartaoGenericoProps = {
      valor: element.valor,
      descritivo: element.descritivo,
      icone: SmartphoneIcon,
    };

    return (
      <Grid key={index} xs={12} sm={6} lg={3}>
        <CartaoGenerico {...cartaoGenericoProps} />
      </Grid>
    );
  });
  return (
    <main>
      <Head>
        <title>SWIFTPay | Dashboard</title>
      </Head>
      <Container maxWidth="xl" sx={{ mt: "48px" }}>
        <Typography
          sx={{
            fontFamily: "DM Sans",
            color: "#707EAE",
            fontWeight: "500",
            lineHeight: "24px",
            fontSize: "15px",
          }}
        >
          Menu / Dashboard
        </Typography>
        <Typography
          sx={{
            fontFamily: "DM Sans",
            color: "#2B3674",
            fontWeight: "700",
            fontSize: "34px",
            lineHeight: "42x",
            letterSpacing: "-2%",
          }}
        >
          Painel Principal
        </Typography>
      </Container>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 3,
        }}
      >
        <Container maxWidth="xl">
          <Grid container spacing={2}>
            {cartaoGenericoComponents}
          </Grid>
        </Container>
      </Box>
    </main>
  )
}