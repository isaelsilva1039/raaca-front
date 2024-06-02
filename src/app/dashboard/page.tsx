import {
  buscarInformacoesDashboardUserCase,
  uiPort
} from "@/core"
import { AuthGuard } from "@/core/helpes/withAuth";
import CondicionalDasboard from "@/core/infra/ports/react/componentes/CondicionalDisplay/CondicionalDash";

export default function Dashboard() {
  // const dashboardInfo = buscarInformacoesDashboardUserCase.buscarInformacoes()
  // const dashboard = uiPort.renderDashboard(dashboardInfo)
  return (
    <AuthGuard load={true}>
      <div style={{width:'100%', height:'100%'}}>
        <CondicionalDasboard text={'Em construção...'}/>
      </div>

    </AuthGuard>
  );
}