import BuscarInformacoesDashboardUserCase from "@/core/application/usercase/BuscarInformacoesDashboardUserCase"
import DashboardDTO from "@/core/domain/dto/DashboardDTO"
import DashboardService from "@/core/domain/services/DashboardService"
import APIAdapter from "@/core/infra/adapter/APIAdapter"
import UIPort from "./application/ports/UIPort"
import ReactAdapter from "./infra/adapter/ReactAdapter"
import ReactMapperImpl from "./infra/mappers/impl/ReactMapperImpl"
import LayoutFactory from "./infra/ports/react/factory/LayoutFactory"
import APIPort from "./application/ports/APIPort"
import ComponentFactory from "./infra/ports/react/factory/ComponentFactory"

class Application {
    private static instance: Application | null = null
    private readonly dashboardService: DashboardService
    private readonly uiPort: UIPort
    private readonly apiAdapter: APIAdapter

    private constructor() {
        this.apiAdapter = new APIAdapter()
        this.dashboardService = new DashboardService(this.apiAdapter)

        const componentFactory = new ComponentFactory()
        const pageFactory = new LayoutFactory(componentFactory)
        const reactMapper = new ReactMapperImpl()
        this.uiPort = new ReactAdapter(pageFactory, reactMapper)
    }

    public static getInstance(): Application {
        if (!Application.instance)
            Application.instance = new Application()
        return Application.instance
    }

    public getDashboardService(): DashboardService {
        return this.dashboardService
    }

    getUIPort(): UIPort {
        return this.uiPort
    }
}

export const buscarInformacoesDashboardUserCase: BuscarInformacoesDashboardUserCase = Application.getInstance().getDashboardService()
export const uiPort: UIPort = Application.getInstance().getUIPort()
export type { BuscarInformacoesDashboardUserCase, DashboardDTO, UIPort, APIPort }