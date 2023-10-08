import BuscarInformacoesDashboardUserCase from "@/core/application/usercase/BuscarInformacoesDashboardUserCase";
import DashboardData from "../DTO/dashboard/DashboardData";
import DashboardOutputPort from "@/core/application/ports/output/DashboardOutputPort";

export default class DashboardService implements BuscarInformacoesDashboardUserCase {

    constructor(private readonly outputPort: DashboardOutputPort) { }
    
    public buscarInformacoes(): DashboardData {
        return this.outputPort.buscarDashboardData();
    }
}