import React, { Component } from 'react';
import { Column } from 'react-table';
import  './styles.css';

interface IData {
  id: number;
  descricao: string;
  tempo_consulta: string;
}

interface ICustomTableProps {
  columns: any;
  data: any;
  expandedRows: { [key: string]: boolean };
  toggleRowExpanded: (rowId: string) => void;
  renderRowSubComponent: (props: { row: any }) => JSX.Element;
}
class MobileCard extends Component<ICustomTableProps> {
    render() {
      const { columns, data, expandedRows, toggleRowExpanded, renderRowSubComponent } = this.props;
        
      console.log(data)
      return (
        <div className="card-container">
          {data?.map((row: any, rowIndex: any) => {
            const isExpanded = expandedRows[row.id.toString()];
            return (
              <div key={`card-${row.id}`} className="card" onClick={() => toggleRowExpanded(row.id.toString())}>
                <div className="card-content">
                  {columns.map((column: any, colIndex: any) => (
                    <div key={`card-content-${row.id}-${colIndex}`} className="card-field">
                      <text style={{fontWeight:400}}>{column.Header}:</text> {row[column.accessor as keyof IData]}
                    </div>
                  ))}
                </div>
                {isExpanded && (
                  <div className="card-expanded">
                        {renderRowSubComponent({ row })}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      );
    }
  }
  
  export default MobileCard;