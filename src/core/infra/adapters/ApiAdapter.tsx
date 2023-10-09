import DashboardOutputPort from "@/core/application/ports/output/DashboardApiOutputPort";
import { ApiService } from "swiftpag-gestor-api-client";
import ApiMapper from "../mappers/ApiMapper";

export default class ApiAdapter implements DashboardOutputPort {

    constructor(
        private readonly apiService: ApiService,
        private readonly apiMapper: ApiMapper
    ) { }

    async buscarDashboard(authorization: string) {
        const dashboardResponse = await this.apiService.buscarDashboard(authorization);
        return this.apiMapper.toDashboardDTO(dashboardResponse);
    }
}