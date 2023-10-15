import { DashboardDTO } from "@/core";

export default interface APIPort {
    buscarDashboard(authorization: string): DashboardDTO
}