import BuscarInformacoesDashboardUserCase from "@/core/application/usercase/BuscarInformacoesDashboardUserCase";
import DashboardDTO from "@/core/domain/DTO/dashboard/DashboardDTO";
import DashboardService from "@/core/domain/services/DashboardService";
import ApiAdapter from "@/core/infra/adapters/ApiAdapter";
import ApiMapperImpl from "./infra/mappers/ApiMapper";

class Application {
    private static instance: Application | null = null;
    private readonly dashboardService: DashboardService;
    private readonly apiAdapter: ApiAdapter;

    private constructor() {
        const apiMapper = new ApiMapperImpl();
        this.apiAdapter = new ApiAdapter();
        this.dashboardService = new DashboardService(this.apiAdapter);
    }

    public static getInstance(): Application {
        if (!Application.instance)
            Application.instance = new Application();
        return Application.instance;
    }

    public getDashboardService(): DashboardService {
        return this.dashboardService;
    }
}

export const buscarInformacoesDashboardUserCase: BuscarInformacoesDashboardUserCase = Application.getInstance().getDashboardService();
export type { BuscarInformacoesDashboardUserCase, DashboardDTO };