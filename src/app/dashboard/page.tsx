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
import CartaoGenericoComIndicadorProps from "@/core/ui/componentes/cartao-generico-indicador/CartaoGenericoComIndicadorProps";

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

  const cartaoGenericoComIndicadorComponents = dashboardInfo.totalTransacoes.map((element, index) => {
    const cartaoGenericoComIndicadorProps: CartaoGenericoComIndicadorProps = {
      valor: element.valor,
      descritivo: element.descritivo,
      icone: SmartphoneIcon,
    };
    return (
      <Grid>
        <CartaoGenericoComIndicador {...cartaoGenericoComIndicadorProps} />
      </Grid>
    );
  });

  const options: Options = {
    responsive: true,
    plugins: {
      legend: {
        display: false
      },
    },
    scales: {
      x: {
        grid: {
          display: false
        },
        ticks: {
          beginAtZero: true,
          color: '#A3AED0 ',
          font: {
            size: 12,
            family: 'Arial, sans-serif',
          },
        }
      },
      y: {
        display: false,
        grid: {
          display: false,
        },
      }
    }
  };

  const values: number[] = dashboardInfo.totalGeral.data.map((element) => {
    return element.valor
  })

  const props: LineChartProps = {
    options,
    valor: dashboardInfo.totalGeral.valor,
    data: {
      labels: dashboardInfo.totalGeral.data.map((element) => { return element.descritivo }),
      datasets: [{
        type: "line",
        label: "Dataset",
        data: values,
        borderColor: "#4318FF",
        fill: false,
        lineTension: 0.4,
        pointBorderColor: "#4318FF",
        borderWidth: 4,
        pointRadius: 0,
        pointHoverRadius: 8,
        pointHoverBackgroundColor: "#ffffff",
        pointHoverBorderColor: "#4318FF",
        pointHoverBorderWidth: 4,
        pointHitRadius: 50,
      }]
    },
  }

  return (
    <>
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
            <Grid xs={12} lg={4} md={3} container direction="column" spacing={2} component="div">
              {cartaoGenericoComIndicadorComponents}
            </Grid>
            <Grid xs={12} lg={8} md={9}>
              <GraficoLinha {...props} />
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
}