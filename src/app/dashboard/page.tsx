import Head from "next/head";
import { Box, Container, Unstable_Grid2 as Grid, Typography } from "@mui/material";
import { buscarInformacoesDashboardUserCase, DashboardDTO } from "@/core";
import { GraficoLinha } from "@/core/ui/componentes/grafico-linha/grafico-linha";
import UIMapper from "@/core/application/mappers/UIMapper";

export default function Dashboard() {
  const dashboardInfo: DashboardDTO = buscarInformacoesDashboardUserCase.buscarInformacoes();
  const cartaoGenericoComponents = UIMapper.toCartaoGenericoPropsArray(dashboardInfo.horizontalWidgets);
  const cartaoGenericoComIndicadorComponents = UIMapper.toCartaoGenericoComIndicadorPropsArray(dashboardInfo.totalTransacoes);
  const props = UIMapper.toLineChartProps(dashboardInfo.totalGeral);
  const tabelas = UIMapper.criarTabelas(dashboardInfo.tabelas);
  
  return (
    <>
      <Head>
        <title>SWIFTPay | Início</title>
      </Head>
      <Container maxWidth="xl" sx={{ mt: "12px" }}>
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
            color: '#2B3674',
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
        <Container maxWidth={false}>
          <Grid container spacing={2}>
            {cartaoGenericoComponents}
            <Grid xs={12} lg={4} md={3} container direction="column" spacing={2} component="div">
              {cartaoGenericoComIndicadorComponents}
            </Grid>
            <Grid xs={12} lg={8} md={9}>
              <GraficoLinha {...props} />
            </Grid>
            {tabelas}
          </Grid>
        </Container>
      </Box>
    </>
  );
}