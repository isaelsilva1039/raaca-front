import TotalGeralItemDTO from "./TotalGeralItemDTO";

export default interface TotalGeralDTO {
  valor: string;
  variacao: number;
  data: TotalGeralItemDTO[];
}