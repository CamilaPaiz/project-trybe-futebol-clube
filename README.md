
# Trybe Futebol Clube

Neste projeto desenvolvi um back-end dockerizado utilizando modelagem de dados através do Sequelize. A API foi desenvolvida para ser capaz de ser consumida por um front-end já provido nesse projeto( pela Trybe).

O TFC é um site informativo sobre partidas e classificações de futebol!

Para avaliar o projeto rodando é necessário ter o nome e email cadastrados no banco de dados, sendo assim utilizamos o email :user@user.com e senha: **secret_user**



## Licença

[MIT](https://choosealicense.com/licenses/mit/)


## 🔗 Links

[![linkedin](https://img.shields.io/badge/linkedin-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/camila-paiz/)

## Funcionalidades

- endpoint /teams

-retorna os nomes dos times associados à partida na renderização do front-endpoint

- endpoint /teams/:id

-retorna os dados de um time específico

- endpoint /login

-essa rota recebe os campos email e password e esses campos devem ser avaliados  no banco de dados

-aqui ocorre a validação do formato do email e password e verifica se estão cadastrados no banco de dados para que então seja possível realizar o login

- endpoint /matches

-retorna uma lista de partidas

-é possível cadastrar nova partida em andamento no banco dados

-é possível filtrar todas as partidas em andamento ou finalizadas 

- endpoint /matches/:id/finish

-usuário com token válido pode alterar a partida para finalizada

- endpoint /matches/:id

-usuário com token válido consegue atualizar as partidas em andamento

- endpoint /leaderboard/home

-retorna informações do desempenho dos times da casa

- endpoint /leaderboard/away

-retorna informações do desempenho dos times visitantes


## Para rodar o projeto
Configurações mínimas para execução do projeto

Na sua máquina você deve ter:

Sistema Operacional Distribuição Unix

Node versão 16
Docker
Docker-compose versão maior ou igual a 1.29.2 

O node deve ter versão igual ou superior à 16.14.0 LTS:


-> Rode os comandos abaixo para instalar a versão correta de node e usá-la:

nvm install 16.14 --lts
nvm use 16.14
nvm alias default 16.14

-> O docker-compose deve ter versão igual ou superior àˆ1.29.2:

-> em app/frontend rode os comandos abaixo:

**npm install**

**npm start**

->em app/backend rode os comandos abaixo:

**npm install**

**npm start**

## Stack utilizada

**Front-end:** Já fornecido pela Trybe,React;

**Back-end:** Node, Express,TypeScrip,Sequelize,docker,docker-compose,MySQL,JWT,POO;


## Diagrama de Entidade-Relacionamento (DER)

![diagrama-ertfc](https://user-images.githubusercontent.com/106762952/233203267-bfaacd0c-ddd7-454f-a4cb-df6e0521f253.png)

## Aprendizados


- Construção de uma API REST;

- Implementação de um CRUD com TypeScript, utilizando ORM;

- Modelagem de dados com MYSQL através do Sequelize;

- Testes de integração utilizando chai;

## Screenshots

![logintfc](https://user-images.githubusercontent.com/106762952/233212284-7808cb6d-af27-49c6-8e1d-eaaea05a0637.png)
![matchestfc](https://user-images.githubusercontent.com/106762952/233212332-d1bda488-98ee-48dc-b708-00675100a1f2.png)
![leaderboardtfc](https://user-images.githubusercontent.com/106762952/233212401-3c0e2023-a0c5-4308-b02b-b17a7d8ee0b2.png)

