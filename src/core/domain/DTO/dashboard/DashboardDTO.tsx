import HorizontalWidgetDTO from "./HorizontalWidgetDTO";
import TabelaDTO from "./TabelaDTO";
import TotalGeralDTO from "./TotalGeralDTO";
import TotalTransacoesItemDTO from "./TotalTransacoesItemDTO";

export default class DashboardDTO {
  horizontalWidgets: HorizontalWidgetDTO[] | undefined;
  totalGeral: TotalGeralDTO | undefined;
  totalTransacoes: TotalTransacoesItemDTO[] | undefined;
  tabelas: TabelaDTO[] | undefined;

  public setHorizontalWidgets(horizontalWidgets: HorizontalWidgetDTO[]): void {
    this.horizontalWidgets = horizontalWidgets;
  }

  public setTotalGeral(totalGeral: TotalGeralDTO): void {
    this.totalGeral = totalGeral;
  }

  public setTotalTransacoes(totalTransacoes: TotalTransacoesItemDTO[]): void {
    this.totalTransacoes = totalTransacoes;
  }

  public setTabelas(tabelas: TabelaDTO[]): void {
    this.tabelas = tabelas;
  }

  public getHorizontalWidgets(): HorizontalWidgetDTO[] | undefined {
    return this.horizontalWidgets;
  }

  public getTotalGeral(): TotalGeralDTO | undefined {
    return this.totalGeral;
  }

  public getTotalTransacoes(): TotalTransacoesItemDTO[] | undefined {
    return this.totalTransacoes;
  }

  public getTabelas(): TabelaDTO[] | undefined {
    return this.tabelas;
  }
}