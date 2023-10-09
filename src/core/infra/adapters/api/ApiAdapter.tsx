import DashboardOutputPort from "@/core/application/ports/output/DashboardApiOutputPort";
import DashboardDTO from "@/core/domain/DTO/dashboard/DashboardDTO";

export default class ApiAdapter implements DashboardOutputPort {

    buscarDashboard(): DashboardDTO {
        throw new Error("Method not implemented.");
    }
}