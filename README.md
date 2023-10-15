## Como executar o projeto
- Primeiro, clone o projeto para seu computador
- Depois, abra o terminal e digite o comando `npm install` para instalar as dependências do projeto
- Por fim, digite o comando `npm run dev` para executar o projeto

## Desenvolvimento
### O que não deve ser feito no código
- [x] Dependencias externas ( Importantíssimo )
- [x] Imports desnecessários
- [x] Comentários e console.log no código
- [x] Comentar código
- [x] Código duplicado
- [x] Código não utilizado

## Branches
### Branches do projeto
- main é a branch principal, onde o código está pronto para ser colocado em produção
- develop é a branch de desenvolvimento, onde o código está em desenvolvimento
- feature é a branch de funcionalidades, onde o código está sendo desenvolvido
- stable é a branch de estabilidade, nela temos a ultima versão estável do código
- candidate é a branch de candidatos, onde ocorre os testes e correções de bugs

### Fluxo de trabalho
- O desenvolvimento ocorre na branch feature
- O código é revisado por um membro da equipe
- O código é enviado para a branch develop
- A branch candidate é mergiada com a branch develop a cada 7 dias
- A branch stable é mergiada com a branch candidate a cada 14 dias
- Os testes e correções de bugs são feitos na branch candidate 7 dias antes até da data de lançamento
- A branch main é mergiada com a branch stable a cada 20 dias
- A branch develop é mergiada com a branch main a cada 20 dias