import BuscarInformacoesDashboardUserCase from "@/core/application/usercase/BuscarInformacoesDashboardUserCase";
import DashboardData from "../DTO/dashboard/DashboardData";

export default class DashboardService implements BuscarInformacoesDashboardUserCase {
    
    public buscarInformacoes(): DashboardData {
        throw new Error("Method not implemented.");
    }
}