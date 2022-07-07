const content = document.querySelector('#content')

function main() {
    let db = getDatabase()

    getUserOrders(db, (tx, res) => {
        if (res.rows.length === 0)
            return
        
        content.textContent = ''
        for (let i of res.rows) {
            let wrapper = document.createElement('div')
            let text = document.createElement('span')
            text.innerHTML = `Pedido #${i["id_pedido"]}`
            wrapper.className = 'order'
            wrapper.appendChild(text)
            content.appendChild(wrapper)
        }
    })
}

main()