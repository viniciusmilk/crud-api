// Importando a função randomUUID do módulo "crypto" do Node.js
import { randomUUID } from "crypto"

// Classe DBMemory para simular um banco de dados em memória
class DBMemory {

    // Os dados serão carregados em uma estrutura de dados MAP
    // A estrutura Map é uma coleção de elementos na qual cada elemento é armazenado como um par chave, valor.
    // Aqui, estamos usando um Map para armazenar os produtos, onde a chave é o ID do produto e o valor é o objeto do produto.
    #product = new Map()

    // Método para criar um novo produto
    create(product) {
        // Criando um ID exclusivo usando a função randomUUID do módulo "crypto" do Node.js
        const productId = randomUUID()
        // Adicionando o novo produto ao Map
        this.#product.set(productId, product)
    }

    // Método para ler todos os produtos
    read() {
        // Convertendo o Map para um Array e mapeando cada elemento para retornar um objeto com o ID e os dados do produto
        return Array.from(this.#product.entries()).map(productArray => {
            // O primeiro elemento do array é o ID do produto
            const id = productArray[0]
            // O segundo elemento do array são os dados do produto
            const data = productArray[1]
            // Retornando um objeto com o ID e os dados do produto
            return {
                id,
                ...data
            }
        })
    }
}