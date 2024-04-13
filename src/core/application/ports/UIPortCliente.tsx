import DashboardDTO from "@/core/domain/dto/DashboardDTO"

export default interface UIPortCliente {
    renderCliente(dashboardInfo: DashboardDTO): JSX.Element
}

