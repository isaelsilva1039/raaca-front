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

  const labels = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun'];

  const dataset: Dataset = {
    type: "line",
    label: "Dataset",
    data: labels.map(() => Math.floor(Math.random() * 100)),
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
  }

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

  const props: LineChartProps = {
    options,
    valor: 'R$ 999,000.00',
    data: {
      labels,
      datasets: [dataset]
    }
  };

  const cartaoGenericoProps: CartaoGenericoProps = {
    valor: 'R$ 999,000.00',
    descritivo: 'Total de vendas',
    icone: SmartphoneIcon
  }

  const tabelaProps: TabelaProps = {
    orders: [
      {
        id: "f69f88012978187a6c12897f",
        ref: "ChavePix1",
        amount: 30.5,
        customer: {
          name: "17.5%",
        },
        createdAt: '12',
        status: "R$3123,00",
      },
      {
        id: "f69f88012978187a6c12897f",
        ref: "ChavePix2",
        amount: 30.5,
        customer: {
          name: "17.5%",
        },
        createdAt: '12',
        status: "R$3123,00",
      },
      {
        id: "f69f88012978187a6c12897f",
        ref: "ChavePix3",
        amount: 30.5,
        customer: {
          name: "17.5%",
        },
        createdAt: '12',
        status: "R$3123,00",
      },
      {
        id: "f69f88012978187a6c12897f",
        ref: "ChavePix4",
        amount: 30.5,
        customer: {
          name: "17.5%",
        },
        createdAt: '12',
        status: "R$3123,00",
      },
      {
        id: "f69f88012978187a6c12897f",
        ref: "ChavePix5",
        amount: 30.5,
        customer: {
          name: "17.5%",
        },
        createdAt: '12',
        status: "R$3123,00",
      },
      {
        id: "f69f88012978187a6c12897f",
        ref: "ChavePix6",
        amount: 30.5,
        customer: {
          name: "17.5%",
        },
        createdAt: '12',
        status: "R$3123,00",
      }
    ],
    sx: { height: "100%", borderRadius: '8px' },
    nameTable: "Transações PIX"
  }

  return (
    <main>
      <h1>Dashboard</h1>
      <GraficoLinha {...props} />
      <CartaoGenerico {...cartaoGenericoProps} />
      <CartaoGenericoComIndicador {...cartaoGenericoProps} />
      <Tabela {...tabelaProps} />
    </main>
  )
}