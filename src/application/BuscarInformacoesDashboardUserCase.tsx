import DashboardData from "@/Domain/DTO/dashboard/DashboardData";
import ApplicationError from "@/Domain/exceptions/ApplicationError";

export default interface BuscarInformacoesDashboardUserCase {
    buscarInformacoes: DashboardData
}