/**
 * Arquivo principal da aplicação CRUD API Fastify.
 * Este arquivo contém a configuração do servidor Fastify e o registro das rotas da aplicação.
 */

import Fastify from 'fastify'; // Importa o módulo Fastify, um framework web para Node.js
const fastify = Fastify({ logger: true }); // Cria uma instância do Fastify com a opção de log ativada

import 'dotenv/config'; // Importa o módulo dotenv para carregar variáveis de ambiente do arquivo .env

// Importa os módulos de rota da aplicação
import getProducts from './routes/getProducts.js'; // Importa a rota para obter todos os produtos
import getProduct from './routes/getProduct.js'; // Importa a rota para obter um produto específico
import addProduct from './routes/addProduct.js'; // Importa a rota para adicionar um novo produto
import updateProduct from './routes/updateProduct.js'; // Importa a rota para atualizar um produto existente
import deleteProduct from './routes/deleteProduct.js'; // Importa a rota para deletar um produto

// Registra as rotas na instância do Fastify
fastify.register(getProducts); // Registra a rota para obter todos os produtos
fastify.register(getProduct); // Registra a rota para obter um produto específico
fastify.register(addProduct); // Registra a rota para adicionar um novo produto
fastify.register(updateProduct); // Registra a rota para atualizar um produto existente
fastify.register(deleteProduct); // Registra a rota para deletar um produto

/**
 * Função assíncrona para iniciar o servidor Fastify.
 * Tenta iniciar o servidor na porta 3000 e no host 0.0.0.0.
 * Se o servidor iniciar com sucesso, loga a mensagem "Servidor escutando no endereço 3000".
 * Se houver um erro ao iniciar o servidor, loga o erro e encerra o processo com um código de status 1.
 */
const start = async () => {
    try {
        await fastify.listen({ port: 3000, host: '0.0.0.0' });
        console.log(`Servidor escutando no endereço 3000`);
    } catch (err) {
        fastify.log.error(err);
        process.exit(1);
    }
};

// Inicia o servidor chamando a função start()
start();