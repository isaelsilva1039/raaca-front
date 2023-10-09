export default interface DashboardResponse {
  horizontalWidgets: {
    icone: string;
    descritivo: string;
    valor: string;
  }[];
  totalGeral: {
    valor: string;
    variacao: number;
    data: {
      descritivo: string;
      valor: number;
    }[];
  };
  totalTransacoes: {
    titulo: string;
    descritivo: string;
    valor: number;
    variacao: number;
  }[];
  tabelas: {
    titulo: string;
    header: string[];
    body: string[][];
  }[];
}