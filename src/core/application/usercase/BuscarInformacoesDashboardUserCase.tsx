import DashboardDTO from "../../domain/DTO/dashboard/DashboardDTO";

export default interface BuscarInformacoesDashboardUserCase {
    buscarInformacoes(): DashboardDTO
}