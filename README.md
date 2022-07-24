![Novo Projeto](https://user-images.githubusercontent.com/66154501/180667610-e7f5a36c-10c5-40cc-aee9-c81993a53d3c.png)

# Astrum_backend


Esse backend é a base de toda a aplicação, o Astrum é uma aplicação de carteira digital com investimentos em ações, um desafio técnico maravilhoso que me foi proposto pela XP Inc.

Ainda com pequenas funções a serem implementadas:
- cadastro CORRETO de usuários
- depósito via Boleto e Pix.

Para construir essa aplicação foram utilizadas as seguinte tecnologias:
- NodeJS
- Express
- TypeScript
- Sequelize
- PostgresDB
- Docker

Para padronização de código foi utilizado ESLint somado ao Prettier, entre outras bibliotecas que também somaram ao longo da aplcação.

## Como fazer para rodar a aplicação:

- Após clonar o repositório é necessário rodar o `npm install`
- Utilizar o comando `docker compose up -d` para executar o container que contem o banco de dados
- Após subir o container é necessário iniciar o banco de dados com o comando `npx sequelize db:create`
- Continuar com as migrations com o comando `npx sequelize db:migrate`
- E popular o banco de dados com o comando `npx sequelize db:seed:all`
- Como plus para o gerenciamento do banco de dados o docker compose possui o _pgAdmin_ que pode ser acessado através da porta 8080
- Para iniciar o servidor basta executar `npm start` ou `npm run debug`

As requisições podem ser feitas nas seguinte rotas:
- Requisições GET
> - `/cliente/:id` _Traz o perfil do cliente_
> - `/ativos/cliente/:clientId` _Traz os ativos que o cliente possui_
> - `/ativos` _Traz os ativos disponíveis_
> - `/ativos/:id` _Traz ativos baseando no id_ 
> - `/conta/:clientId`_Traz o saldo do cliente_
> - `/api/empresa` _Traz todas as empresas listadas na API externa_
> - `/api/cotacao/cd_acao/:cod`_Traz as contações de um determinado ativo a partir de seu código_

- Requisições POST
> - `/login` _Responsável pelo login no sistema_
> - `/cadastro` _Responsável pelo cadastro na plataforma_ (Em Construção).
> - `/investimentos/comprar`_Faz compra de ativos_
> - `/investimentos/vender`_Faz venda de ativos_
> - `/conta/deposito` _Responsável por gerar meios de depósito na conta_ (Em Construção)
> - `/conta/saque` _Disponibiliza Saques para o usuário_
> - `/conta/transferencia`_Disponibiliza a possibilidade de transferencia entre contas_

## Banco de dados

Segue abaixo uma ilustração de como foi montado o banco de dados e todos os relacionamentos.
As tabelas abaixo são:
- Users: Dados de Clientes.
- Wallets: Dados das Carteiras(contas).
- UserShares: Dados dos ativos dos clientes.
- Sharetrades: Movimentações de ativos.
- Transactions: Transações financeiras que não envolvem ativos

![Database Diagram](https://user-images.githubusercontent.com/66154501/180666182-9eced5d1-323b-4528-a9e6-63ddce3c41f5.png)
