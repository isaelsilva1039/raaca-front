import { buscarInformacoesDashboardUserCase, DashboardDTO } from "@/core";
import { GraficoLinha } from "@/core/ui/componentes/grafico-linha/grafico-linha";
import { Dataset } from "@/core/ui/styles/grafico-linha/Dataset";
import { LineChartProps } from "@/core/ui/styles/grafico-linha/LineChartProps";
import Options from "@/core/ui/styles/grafico-linha/options";


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

  return (
    <main>
      <h1>Dashboard</h1>
      <GraficoLinha {...props} />
    </main>
  )
}