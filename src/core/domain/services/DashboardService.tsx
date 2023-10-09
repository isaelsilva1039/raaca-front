import BuscarInformacoesDashboardUserCase from "@/core/application/usercase/BuscarInformacoesDashboardUserCase";
import DashboardDTO from "@/core/domain/DTO/dashboard/DashboardDTO";
import DashboardApiOutputPort from "@/core/application/ports/output/DashboardApiOutputPort";

export default class DashboardService implements BuscarInformacoesDashboardUserCase {

    constructor(private readonly dashboardAPIOutputPort: DashboardApiOutputPort) { }
    
    public buscarInformacoes(): DashboardDTO {
        return this.dashboardAPIOutputPort.buscarDashboard();
    }
}