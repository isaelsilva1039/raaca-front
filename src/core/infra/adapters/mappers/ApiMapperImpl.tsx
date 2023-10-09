import ApiMapper from "@/core/application/mappers/ApiMapper";
import DashboardResponse from "../api/dto/DashboardResponse";
import DashboardDTO from "@/core/domain/DTO/dashboard/DashboardDTO";

export default class ApiMapperImpl implements ApiMapper {

    toDashboardDTO(dashboardResponse: DashboardResponse): DashboardDTO {
        const dashboardDTO = new DashboardDTO();
        dashboardDTO.setHorizontalWidgets(dashboardResponse.horizontalWidgets);
        dashboardDTO.setTotalGeral(dashboardResponse.totalGeral);
        dashboardDTO.setTotalTransacoes(dashboardResponse.totalTransacoes);
        dashboardDTO.setTabelas(dashboardResponse.tabelas);
        return dashboardDTO;
    }
}