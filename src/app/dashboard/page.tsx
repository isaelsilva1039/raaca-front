import {
  buscarInformacoesDashboardUserCase,
  uiPort
} from "@/core"
import { AuthGuard } from "@/core/helpes/withAuth";

export default function Dashboard() {
  const dashboardInfo = buscarInformacoesDashboardUserCase.buscarInformacoes()
  const dashboard = uiPort.renderDashboard(dashboardInfo)
  return (
    <AuthGuard load={true}>
      {dashboard}
    </AuthGuard>
  );
}