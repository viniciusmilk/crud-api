# syntax=docker/dockerfile:1

# Utiliza a imagem node versão 20 com alpine (uma versão mais leve do linux)
FROM node:20-alpine

# Define /app como o diretório de trabalho dentro do container
WORKDIR /app

# Copia os arquivos package.json e yarn.lock para o diretório de trabalho atual (./)
COPY package.json yarn.lock ./

# Executa o comando yarn para instalar as dependências do projeto
RUN yarn

# Copia todos os arquivos do diretório atual do host para o diretório de trabalho no container
COPY . .

# Expõe a porta 3000 do container
EXPOSE 3000

# Define o comando a ser executado quando o container for iniciado
CMD ["yarn", "run", "dev"]