import DashboardOutputPort from "@/core/application/ports/output/DashboardOutputPort";
import DashboardData from "@/core/domain/DTO/dashboard/DashboardData";

export default class ApiAdapter implements DashboardOutputPort {

    buscarDashboardData(): DashboardData {
        throw new Error("Method not implemented.");
    }
}