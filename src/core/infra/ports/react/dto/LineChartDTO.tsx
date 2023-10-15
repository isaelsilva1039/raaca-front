import { DatasetDTO } from "./DatasetDTO"
import OptionsDTO from "./OptionsDTO"

export interface LineChartDTO {
    options: OptionsDTO
    valor: string
    variacao: number
    data: {
        labels: string[]
        datasets: DatasetDTO[]
    }
}