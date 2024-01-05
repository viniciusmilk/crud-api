import { randomUUID } from "crypto"
import mysql from 'mysql2'

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 10,
    maxIdle: 10,
    idleTimeout: 60000,
    queueLimit: 0,
    enableKeepAlive: true,
    keepAliveInitialDelay: 0,
    charset: 'utf8mb4',
})

async function dbCreate(data) {
    // creating a unique id using the node's crypto module
    const productId = randomUUID()

    return pool.promise().execute(`CREATE TABLE IF NOT EXISTS Produto (id VARCHAR(36) PRIMARY KEY, name VARCHAR(25) NOT NULL, category VARCHAR(25) NOT NULL, amount INT CHECK (amount >= 0) NOT NULL, value FLOAT CHECK (value >= 0) NOT NULL)`)
        .then(() => {
            return pool.promise().execute(`INSERT INTO Produto (id, name, category, amount, value) VALUES (?, ?, ?, ?, ?)`, [productId, data.name, data.category, data.amount, data.value])
                .then(() => {
                    return { success: "PRODUTO CADASTRADO!" }
                })
                .catch(err => {
                    console.error(err)
                    return err
                })
        })
        .catch(err => {
            console.error(err)
            return err
        })
}

async function dbRead() {

    return pool.promise().execute(`SELECT * FROM ${process.env.DB_TABLE_NAME};`,)
        .then(([rows, fields]) => {
            if (rows.length === 0) {
                return { erro: "NÃO HÁ PRODUTOS CADASTRADO!" }
            } else {
                return rows.map(product => {
                    product.value = product.value.toFixed(2)
                    return product
                })
            }
        })
        .catch(error => {
            console.log(error)
            throw error
        })
}

async function dbReadOne(id) {

    return pool.promise().execute(`SELECT * FROM ${process.env.DB_TABLE_NAME} WHERE id=?;`, [id])
        .then(([rows, fields]) => {
            if (rows.length === 0) {
                return { erro: "PRODUTO NÃO ENCONTRADO!" }
            } else {
                return rows.map(product => {
                    product.value = product.value.toFixed(2)
                    return product
                })
            }
        })
        .catch(error => {
            console.log(error)
            throw error
        })
}

async function dbUpdate(id, product) {

    return pool.promise().execute(`SELECT id FROM ${process.env.DB_TABLE_NAME} WHERE id=?;`, [id])
        .then(([rows, fields]) => {
            if (rows.length === 0) {
                return { erro: "PRODUTO NÃO ENCONTRADO!" }
            } else {
                return pool.promise().execute(`UPDATE ${process.env.DB_TABLE_NAME} SET name=?, category=?, amount=?, value=? WHERE id=?;`, [product.name, product.category, product.amount, product.value, id])
                    .then(() => {
                        return { success: "PRODUTO ATUALIZADO!" }
                    })
                    .catch(error => {
                        console.log(error)
                        throw error
                    })
            }
        })
        .catch(error => {
            console.log(error)
            throw error
        })
}

async function dbDelete(id) {

    return pool.promise().execute(`SELECT id FROM ${process.env.DB_TABLE_NAME} WHERE id=?;`, [id])
        .then(([rows, fields]) => {
            if (rows.length === 0) {
                return { erro: "PRODUTO NÃO ENCONTRADO!" }
            } else {
                return pool.promise().execute(`DELETE FROM ${process.env.DB_TABLE_NAME} WHERE id=?;`, [id])
                    .then(() => {
                        return { success: "PRODUTO DELETADO!" }
                    })
                    .catch(error => {
                        console.log(error)
                        throw error
                    })
            }
        })
        .catch(error => {
            console.log(error)
            throw error
        })
}

export { dbCreate, dbRead, dbReadOne, dbUpdate, dbDelete }