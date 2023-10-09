import ApiMapper from "@/core/application/mappers/ApiMapper";
import DashboardDTO from "@/core/domain/DTO/dashboard/DashboardDTO";
import DashboardResponse from "@/core/infra/ports.output/api/dto/DashboardResponse";

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