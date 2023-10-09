import BuscarInformacoesDashboardUserCase from "@/core/application/usercase/BuscarInformacoesDashboardUserCase";
import DashboardApiOutputPort from "@/core/application/ports/output/DashboardApiOutputPort";

export default class DashboardService implements BuscarInformacoesDashboardUserCase {

    constructor(private readonly dashboardAPIOutputPort: DashboardApiOutputPort) { }

    public buscarInformacoes() {
        const authorization = ''
        return this.dashboardAPIOutputPort.buscarDashboard(authorization);
    }
}