import BuscarInformacoesDashboardUserCase from "@/core/application/usercase/BuscarInformacoesDashboardUserCase";
import DashboardDTO from "@/core/domain/DTO/dashboard/DashboardDTO";
import DashboardOutputPort from "@/core/application/ports/output/DashboardOutputPort";

export default class DashboardService implements BuscarInformacoesDashboardUserCase {

    constructor(private readonly outputPort: DashboardOutputPort) { }
    
    public buscarInformacoes(): DashboardDTO {
        return this.outputPort.buscarDashboardData();
    }
}