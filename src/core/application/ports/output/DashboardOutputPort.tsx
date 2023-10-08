import DashboardData from "@/core/domain/DTO/dashboard/DashboardData";

export default interface DashboardOutputPort {
    buscarDashboardData(): DashboardData
}