# :globe_with_meridians: CRUD API

## :memo: Descrição do Projeto

Projeto para a criação de uma api simples com o fastify para cadastro de produtos em um banco de dados mysql

## :books: Funcionalidades

A api incluirá as seguintes funcionalidades:

- Cadastrar produtos no banco de dados.
- Alterar produtos do banco de dados.
- Excluir produtos do banco de dados.

## :wrench: Tecnologias Utilizadas

- Docker e Docker Compose,
- Node
- Fastfy
- Mysql

## :information_source: Como Rodar

- Tenha o Git, GitHub Cli e NodeJS instalados.

```bash

# Clone este repositório
$ gh repo clone viniciusmilk/crud-api

# Acesse a pasta do projeto no terminal/cmd
$ cd crud-api

# Crie uma nova branch
$ git checkout -b minha-nova-branch

# Instale as dependências
$ yarn

# Execute a aplicação em modo de desenvolvimento
$ npm run dev ou
$ yarn dev ou
$ pnpm dev

```

## :information_source: Como rodar a aplicação em container Docker

- Certifique-se de ter o Docker Desktop instalado em sua maquina.

```bash

# Acesse a pasta onde está o arquivo compose.yml no seu terminal

# Levante os containers
$ docker compose up -d

# Sua aplicação deverá está rodando, você pode conferir mandando requisições http do tipo GET, POST, PUT e DELETE para a url http://localhost:3000/product

# Quando precisar parar a aplicação, você pode parar os contêineres
$ docker stop database api

# Caso queira parar a aplicação e já excluir os containers rode
$ docker compose down

# Caso queira excluir os containers
$ docker rm database api

# Caso queira excluir as imagens baixadas
$ docker rmi viniciusmilk/crud-api:latest mysql:8.0

# Caso queira excluir os volumes criados
$ docker volume rm crud-api_data

# Aviso importante!
# Dois volumes foram criados ao executar o primeiro comando docker, um deles é um volume anônimo, para exclui-lo rode os seguintes comandos
$ docker volume ls

# copie o nome do volume (ele deve ter um nome bem grande de caracteres aleatórios) e rode
$ docker volume rm nome-copiado

#  Ou você pode usar docker desktop para exclui-lo, nesse caso, vá até a aba de volumes identifique-o e o exclua


```

- Faça suas alterações.
- Envie suas alterações para a branch principal.
