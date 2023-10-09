import DashboardOutputPort from "@/core/application/ports/output/DashboardOutputPort";
import DashboardDTO from "@/core/domain/DTO/dashboard/DashboardDTO";

export default class ApiAdapter implements DashboardOutputPort {

    buscarDashboardData(): DashboardDTO {
        throw new Error("Method not implemented.");
    }
}