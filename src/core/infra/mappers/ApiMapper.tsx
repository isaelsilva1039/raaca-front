import DashboardDTO from "@/core/domain/DTO/dashboard/DashboardDTO";
import { DashboardResponse } from "swiftpag-gestor-api-client";

export default class ApiMapper {

    toDashboardDTO(dashboardResponse: DashboardResponse): Promise<DashboardDTO> {
        const dashboardDTO = new DashboardDTO();
        dashboardDTO.setHorizontalWidgets(dashboardResponse.horizontalWidgets);
        dashboardDTO.setTotalGeral(dashboardResponse.totalGeral);
        dashboardDTO.setTotalTransacoes(dashboardResponse.totalTransacoes);
        dashboardDTO.setTabelas(dashboardResponse.tabelas);
        return Promise.resolve(dashboardDTO);
    }
}