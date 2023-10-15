import { DashboardDTO } from "@/core"

export default interface BuscarInformacoesDashboardUserCase {
    buscarInformacoes(): DashboardDTO
}