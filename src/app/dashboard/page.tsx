import {
  buscarInformacoesDashboardUserCase,
  uiPort
} from "@/core"

export default function Dashboard() {
  const dashboardInfo = buscarInformacoesDashboardUserCase.buscarInformacoes()
  const dashboard = uiPort.renderDashboard(dashboardInfo)
  return (dashboard)
}