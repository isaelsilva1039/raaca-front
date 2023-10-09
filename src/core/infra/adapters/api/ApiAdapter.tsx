import DashboardOutputPort from "@/core/application/ports/output/DashboardApiOutputPort";
import DashboardDTO from "@/core/domain/DTO/dashboard/DashboardDTO";
import { ApiService } from "@/core/infra/adapters/api/services/ApiService";
import { ApiMappter } from "@/core/application/mappers/ApiMapper";

export default class ApiAdapter implements DashboardOutputPort {

    constructor(
        private readonly apiService: ApiService,
        private readonly apiMapper: ApiMappter
    ) {
    }

    buscarDashboard(): DashboardDTO {
        const dashboardResponse = this.apiService.buscarDashboard();
        return this.apiMapper.toDashboardDTO(dashboardResponse);
    }
}