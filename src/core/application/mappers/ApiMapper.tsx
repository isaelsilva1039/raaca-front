import DashboardResponse from "@/core/infra/adapters/api/dto/DashboardResponse";
import DashboardDTO from "@/core/domain/DTO/dashboard/DashboardDTO"

export interface ApiMappter {
    toDashboardDTO(dashboardResponse: DashboardResponse): DashboardDTO;

    toDashboardResponse(dashboardDTO: DashboardDTO): DashboardResponse;
}