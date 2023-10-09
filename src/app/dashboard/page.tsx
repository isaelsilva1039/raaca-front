import { buscarInformacoesDashboardUserCase, DashboardDTO } from "@/core";

export default function Dashboard() {
  const dashboardInfo: DashboardDTO = buscarInformacoesDashboardUserCase.buscarInformacoes();
  const dashboardInfoString = JSON.stringify(dashboardInfo);
  return (
    <main>
      <h1>Dashboard</h1>
      <p>{dashboardInfoString}</p>
    </main>
  )
}