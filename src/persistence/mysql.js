
// Importando o módulo crypto do Node.js para gerar UUIDs aleatórios
import { randomUUID } from "crypto"

// Importando o módulo mysql2 para interagir com o banco de dados MySQL
import mysql from 'mysql2'

// Criando uma pool de conexões com o banco de dados MySQL
// As configurações da pool são obtidas das variáveis de ambiente
const pool = mysql.createPool({
    host: process.env.DB_HOST, // O host do banco de dados
    user: process.env.DB_USER, // O usuário para se conectar ao banco de dados
    password: process.env.DB_PASSWORD, // A senha para se conectar ao banco de dados
    database: process.env.DB_NAME, // O nome do banco de dados
    waitForConnections: true, // Se deve esperar por uma conexão se todas estiverem em uso
    connectionLimit: 10, // O número máximo de conexões na pool
    maxIdle: 10, // O número máximo de conexões ociosas na pool
    idleTimeout: 60000, // O tempo máximo que uma conexão pode ficar ociosa antes de ser fechada
    queueLimit: 0, // O número máximo de pedidos de conexão na fila
    enableKeepAlive: true, // Se deve manter as conexões vivas
    keepAliveInitialDelay: 0, // O tempo inicial de atraso para manter a conexão viva
    charset: 'utf8mb4', // O conjunto de caracteres a ser usado
})

/**
 * Função assíncrona para criar um novo produto no banco de dados.
 * @param {Object} data - O objeto contendo os dados do produto.
 * @param {string} data.name - O nome do produto.
 * @param {string} data.category - A categoria do produto.
 * @param {number} data.amount - A quantidade do produto.
 * @param {number} data.value - O valor do produto.
 * @returns {Promise<Object>} A promessa que resolve para um objeto contendo a mensagem de sucesso ou o erro.
 */
async function dbCreate(data) {
    // Criando um ID único usando o módulo crypto do Node.js
    const productId = randomUUID()

    // Executando a query SQL para criar a tabela Produto se ela não existir
    return pool.promise().execute(`CREATE TABLE IF NOT EXISTS Produto (id VARCHAR(36) PRIMARY KEY, name VARCHAR(25) NOT NULL, category VARCHAR(25) NOT NULL, amount INT CHECK (amount >= 0) NOT NULL, value FLOAT CHECK (value >= 0) NOT NULL)`)
        .then(() => {
            // Inserindo o novo produto na tabela Produto
            return pool.promise().execute(`INSERT INTO Produto (id, name, category, amount, value) VALUES (?, ?, ?, ?, ?)`, [productId, data.name, data.category, data.amount, data.value])
                .then(() => {
                    // Retornando a mensagem de sucesso
                    return { success: "PRODUTO CADASTRADO!" }
                })
                .catch(err => {
                    // Logando o erro e retornando-o
                    console.error(err)
                    return err
                })
        })
        .catch(err => {
            // Logando o erro e retornando-o
            console.error(err)
            return err
        })
}

/**
 * Função assíncrona para ler todos os produtos do banco de dados.
 * @returns {Promise<Array>} A promessa que resolve para um array contendo todos os produtos ou um erro.
 */
async function dbRead() {
    // Executando a query SQL para selecionar todos os produtos da tabela
    return pool.promise().execute(`SELECT * FROM Produto;`,)
        .then(([rows, fields]) => {
            if (rows.length === 0) {
                // Se não há produtos, retorna uma mensagem de erro
                return { erro: "NÃO HÁ PRODUTOS CADASTRADO!" }
            } else {
                // Caso contrário, retorna todos os produtos
                return rows.map(product => {
                    // Formatando o valor do produto para ter duas casas decimais
                    product.value = product.value.toFixed(2)
                    return product
                })
            }
        })
        .catch(error => {
            // Logando o erro e lançando-o para ser tratado pelo chamador
            console.log(error)
            throw error
        })
}

/**
 * Função assíncrona para ler um único registro do banco de dados.
 * @param {number} id - O ID do produto a ser lido.
 * @returns {Promise} Uma promessa que resolve para um objeto contendo o produto ou um erro.
 */
async function dbReadOne(id) {

    // Executa a consulta SQL para buscar o produto pelo ID.
    return pool.promise().execute(`SELECT * FROM Produto WHERE id=?;`, [id])
        .then(([rows, fields]) => {
            // Se não houver produtos com o ID fornecido, retorna um erro.
            if (rows.length === 0) {
                return { erro: "PRODUTO NÃO ENCONTRADO!" }
            } else {
                // Caso contrário, formata o valor do produto e retorna o produto.
                return rows.map(product => {
                    product.value = product.value.toFixed(2)
                    return product
                })
            }
        })
        .catch(error => {
            // Em caso de erro na consulta, registra o erro e o lança novamente.
            console.log(error)
            throw error
        })
}

/**
 * Função assíncrona para atualizar um registro no banco de dados.
 * @param {number} id - O ID do produto a ser atualizado.
 * @param {object} product - O objeto contendo as novas informações do produto.
 * @returns {Promise} Uma promessa que resolve para um objeto contendo uma mensagem de sucesso ou um erro.
 */
async function dbUpdate(id, product) {

    // Primeiro, verifica se o produto com o ID fornecido existe.
    return pool.promise().execute(`SELECT id FROM Produto WHERE id=?;`, [id])
        .then(([rows, fields]) => {
            // Se não houver produtos com o ID fornecido, retorna um erro.
            if (rows.length === 0) {
                return { erro: "PRODUTO NÃO ENCONTRADO!" }
            } else {
                // Caso contrário, executa a consulta SQL para atualizar o produto.
                return pool.promise().execute(`UPDATE Produto SET name=?, category=?, amount=?, value=? WHERE id=?;`, [product.name, product.category, product.amount, product.value, id])
                    .then(() => {
                        // Se a atualização for bem-sucedida, retorna uma mensagem de sucesso.
                        return { success: "PRODUTO ATUALIZADO!" }
                    })
                    .catch(error => {
                        // Em caso de erro na atualização, registra o erro e o lança novamente.
                        console.log(error)
                        throw error
                    })
            }
        })
        .catch(error => {
            // Em caso de erro na consulta, registra o erro e o lança novamente.
            console.log(error)
            throw error
        })
}

/**
 * Função assíncrona para deletar um registro do banco de dados.
 *
 * @param {number} id - O ID do registro a ser deletado.
 * @returns {Promise<Object>} Uma promessa que resolve para um objeto. Se o registro com o ID fornecido não for encontrado, o objeto terá uma propriedade 'erro' com a mensagem "PRODUTO NÃO ENCONTRADO!". Se o registro for deletado com sucesso, o objeto terá uma propriedade 'success' com a mensagem "PRODUTO DELETADO!".
 *
 * @example
 * dbDelete(1)
 *   .then(result => console.log(result))
 *   .catch(error => console.error(error));
 */
async function dbDelete(id) {

    // Primeiro, tentamos encontrar o registro com o ID fornecido.
    return pool.promise().execute(`SELECT id FROM Produto WHERE id=?;`, [id])
        .then(([rows, fields]) => {
            // Se o registro não for encontrado, retornamos um erro.
            if (rows.length === 0) {
                return { erro: "PRODUTO NÃO ENCONTRADO!" }
            } else {
                // Se o registro for encontrado, tentamos deletá-lo.
                return pool.promise().execute(`DELETE FROM Produto WHERE id=?;`, [id])
                    .then(() => {
                        // Se a deleção for bem-sucedida, retornamos uma mensagem de sucesso.
                        return { success: "PRODUTO DELETADO!" }
                    })
                    .catch(error => {
                        // Se ocorrer um erro durante a deleção, registramos o erro e o lançamos novamente.
                        console.log(error)
                        throw error
                    })
            }
        })
        .catch(error => {
            // Se ocorrer um erro durante a busca pelo registro, registramos o erro e o lançamos novamente.
            console.log(error)
            throw error
        })
}

// Exportamos a função dbDelete, juntamente com outras funções relacionadas ao banco de dados.
export { dbCreate, dbRead, dbReadOne, dbUpdate, dbDelete }