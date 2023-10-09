import BuscarInformacoesDashboardUserCase from "@/core/application/usercase/BuscarInformacoesDashboardUserCase";
import DashboardDTO from "@/core/domain/DTO/dashboard/DashboardDTO";
import DashboardService from "../domain/services/DashboardService";
import ApiAdapter from "../infra/adapters/api/ApiAdapter";

class Application {
    private static instance: Application | null = null;
    private dashboardService: DashboardService;
    private apiAdapter: ApiAdapter;

    private constructor() {
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