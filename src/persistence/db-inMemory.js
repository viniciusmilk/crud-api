const { randomUUID } = require('crypto')

class DBMemory {

    // The datas will be sabe in a MAP data structure
    #product = new Map()

    create(product) {
        // creating a unique id using the node's crypto module
        const productId = randomUUID()
        this.#product.set(productId, product)
    }

    read() {
        return Array.from(this.#product.entries()).map(productArray => {
            const id = productArray[0]
            const data = productArray[1]
            return {
                id,
                ...data
            }
        })
    }

    readOne(id) {
        return this.#product.has(id) ? { id, ...this.#product.get(id) } : "PRODUTO NÃO ENCONTRADO!"
    }

    update(id, product) {
        if (this.#product.has(id)) {
            this.#product.set(id, product)
        } else {
            return "PRODUTO NÃO ENCONTRADO!"
        }
    }

    delete(id) {
        if (this.#product.has(id))
            this.#product.delete(id)
        else
            return "PRODUTO NÃO ENCONTRADO!"
    }
}

const dbInstantieted = new DBMemory()

module.exports = dbInstantieted