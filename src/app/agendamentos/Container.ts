import styled from 'styled-components';

interface ContainerProps {
  layoutVertical: boolean;
}

export const Container = styled.div<ContainerProps>`
  .container-page {
    display: flex;
    width: 100%;
    overflow-y: auto;

    flex-direction: ${({ layoutVertical }) => layoutVertical ? 'column' : 'row'};
    .menu-profissionais {
      width: ${({ layoutVertical }) => layoutVertical ? '100%' : '320px'} ;
      overflow-y: auto;
      display: flex;
      flex-direction: ${({ layoutVertical }) => layoutVertical ? 'row' : 'column'};
      align-items: ${({ layoutVertical }) => layoutVertical ? 'center' : 'flex-start'};
      white-space: nowrap;
    }
    .calendario {
      flex: 1;
    }
  }
`;
