import Head from "next/head";
import { Box, Container, Unstable_Grid2 as Grid, Typography } from "@mui/material";
import { buscarInformacoesDashboardUserCase, DashboardDTO } from "@/core";
import { GraficoLinha } from "@/core/ui/componentes/grafico-linha/grafico-linha";
import Options from "@/core/ui/componentes/grafico-linha/options";
import SmartphoneIcon from "@mui/icons-material/Smartphone";
import { CartaoGenericoComIndicador } from "@/core/ui/componentes/cartao-generico-indicador/cartao-generico-indicador";
import { TabelaProps } from "@/core/ui/componentes/tabela/TabelaProps";
import { Tabela } from "@/core/ui/componentes/tabela/Tabela";
import CartaoGenericoComIndicadorProps from "@/core/ui/componentes/cartao-generico-indicador/CartaoGenericoComIndicadorProps";
import HorizontalWidgetDTO from "@/core/domain/DTO/dashboard/HorizontalWidgetDTO";
import CartaoGenericoProps from "@/core/ui/componentes/cartao-generico/CartaoGenericoProps";
import { CartaoGenerico } from "@/core/ui/componentes/cartao-generico/cartao-generico";
import TotalTransacoesItemDTO from "@/core/domain/DTO/dashboard/TotalTransacoesItemDTO";
import TabelaDTO from "@/core/domain/DTO/dashboard/TabelaDTO";
import TotalGeralDTO from "@/core/domain/DTO/dashboard/TotalGeralDTO";

function getCartaoGenericoComponents(horizontalWidgets: HorizontalWidgetDTO[]) {
  return horizontalWidgets.map((element, index) => {
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
}

function toCartaoGenericoComIndicadorPropsArray(totalTransacoes: TotalTransacoesItemDTO[]) {
  return totalTransacoes.map((element) => {
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
}

function criarTabelas(tabelas: TabelaDTO[]) {
  return tabelas.map((element) => {
    const tabelaProps: TabelaProps = {
      titulo: element.titulo,
      headers: element.header,
      body: element.body,
    };
    return (
      <Grid xs={12} lg={6}>
        <Tabela {...tabelaProps} />
      </Grid>
    );
  });
}

function toLineChartProps(totalGeral: TotalGeralDTO) {
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

  const values: number[] = totalGeral.data.map((element) => {
    return element.valor
  })

  return {
    options,
    valor: totalGeral.valor,
    data: {
      labels: totalGeral.data.map((element) => { return element.descritivo }),
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
}

export default function Dashboard() {
  const dashboardInfo: DashboardDTO = buscarInformacoesDashboardUserCase.buscarInformacoes();

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
            {getCartaoGenericoComponents(dashboardInfo.horizontalWidgets)}
            <Grid xs={12} lg={4} md={3} container direction="column" spacing={2} component="div">
              {toCartaoGenericoComIndicadorPropsArray(dashboardInfo.totalTransacoes)}
            </Grid>
            <Grid xs={12} lg={8} md={9}>
              <GraficoLinha {...toLineChartProps(dashboardInfo.totalGeral)} />
            </Grid>
            {criarTabelas(dashboardInfo.tabelas)}
          </Grid>
        </Container>
      </Box>
    </>
  );
}