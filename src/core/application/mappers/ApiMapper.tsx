import DashboardResponse from "@/core/infra/adapters/api/dto/DashboardResponse";
import DashboardDTO from "@/core/domain/DTO/dashboard/DashboardDTO"

export default interface ApiMapper {
    toDashboardDTO(dashboardResponse: DashboardResponse): DashboardDTO;
}