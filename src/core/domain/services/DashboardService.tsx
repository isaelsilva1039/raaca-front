import { BuscarInformacoesDashboardUserCase } from "@/core"
import { APIPort } from "@/core"

export default class DashboardService implements BuscarInformacoesDashboardUserCase {

    constructor(private readonly dashboardAPIOutputPort: APIPort) { }

    public buscarInformacoes() {
        const authorization = ''
        return this.dashboardAPIOutputPort.buscarDashboard(authorization)
    }
}