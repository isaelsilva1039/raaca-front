import { Dataset } from "./Dataset"
import Options from "./options"

export interface LineChartProps {
    options: Options
    valor: string,
    data: { labels: string[], datasets: Dataset[] }
}