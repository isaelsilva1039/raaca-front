import DashboardOutputPort from "@/core/application/ports/output/DashboardApiOutputPort";
import DashboardDTO from "@/core/domain/DTO/dashboard/DashboardDTO";
import { ApiService } from "@/core/infra/adapters/api/services/ApiService";
import ApiMapper from "@/core/application/mappers/ApiMapper";

export default class ApiAdapter implements DashboardOutputPort {

    constructor(
        private readonly apiService: ApiService,
        private readonly apiMapper: ApiMapper
    ) {
    }

    buscarDashboard(): DashboardDTO {
        const dashboardResponse = this.apiService.buscarDashboard();
        return this.apiMapper.toDashboardDTO(dashboardResponse);
    }
}