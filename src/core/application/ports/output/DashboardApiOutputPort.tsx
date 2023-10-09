import DashboardDTO from "@/core/domain/DTO/dashboard/DashboardDTO";

export default interface DashboardApiOutputPort {
    buscarDashboard(authorization: string): Promise<DashboardDTO>
}