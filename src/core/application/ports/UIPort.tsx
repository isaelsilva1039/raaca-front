import DashboardDTO from "@/core/domain/dto/DashboardDTO"

export default interface UIPort {
    renderDashboard(dashboardInfo: DashboardDTO): JSX.Element
}