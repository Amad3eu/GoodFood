let cart = []
let modalQt = 0
let key = 0
let usuario = []
//constante para carregar estrutura, limpando o código//constante para carregar estrutura, limpando o codigo
const c = (el) => document.querySelector(el) //para localizar o primeiro item
const cs = (el) => document.querySelectorAll(el) //para localizar todos os itens

//Vamos mapear nossos dados recebidos via Json
//Criando a lista de produtos, modelos
modelsJson.map((item, index)=> {
    //Vamos pegar a estrutura HTML que tem a class 'models-item', 
    //dentro da class 'models' e clonar - true indica para pegar subitens
    //let modelsItem = document.querySelector('.models .models-item').cloneNode(true);
    //Depois de ajustado com a constante
    let modelsItem = c('.models .models-item').cloneNode(true)
    // preenchendo as informações dos modelos
    //acrescentar um identificador para a pizza - FrontEnd
    modelsItem.setAttribute('data-key', index)
    modelsItem.querySelector('.models-item-img img').src = item.img
    modelsItem.querySelector('.models-item-price').innerHTML = `R$ ${item.price[2].toFixed(2)}`
    //iniciar pelo nome -- o mais simples
    modelsItem.querySelector('.models-item-name').innerHTML = item.name
    modelsItem.querySelector('.models-item-desc').innerHTML = item.description
    //Adicionar o evento de click ao tag <a> que temos envolvendo a imagem e o "+"
    //Vai abrir o Modal - Janela

    modelsItem.querySelector('a').addEventListener('click', (e) => {
        e.preventDefault()                                                        //Previne a ação padrão que iria atualizar a tela
        key = e.target.closest('.models-item').getAttribute('data-key')  //pegando informação do identificador
        modalQt = 1
        //Alimentando os dados do Modal
        c('.modelsBig img').src = modelsJson[key].img
        c('.modelsInfo h1').innerHTML = modelsJson[key].name
        c('.modelsInfo-desc').innerHTML = modelsJson[key].description
        //c('.modelsInfo-actualPrice').innerHTML = `R$ ${modelsJson[key].price[2].toFixed(2)}`
        c('.modelsInfo-size.selected').classList.remove('selected')
        cs('.modelsInfo-size').forEach((size, sizeIndex)=> {
            if(sizeIndex == 2) {
                size.classList.add('selected')
                c('.modelsInfo-actualPrice').innerHTML = `R$ ${modelsJson[key].price[sizeIndex].toFixed(2)}`
            }
            size.innerHTML = modelsJson[key].sizes[sizeIndex]
        })
        c('.modelsInfo-qt').innerHTML = modalQt
        //Mostrar a janela Modal
        c('.modelsWindowArea').style.opacity = 0    //criando uma animacao
        c('.modelsWindowArea').style.display = 'flex'  
        setTimeout(()=> {
        c('.modelsWindowArea').style.opacity = 1         //mostrando a janela. Sem Timeout, não vemos o efeito
        }, 200)
    })

    //preenchendo as informações no site
    //Depois de ajustado com a constante
    //document.querySelector('.models-area').append(modelsItem);

    c('.models-area').append(modelsItem)
})

//Acoes do modal - janela
function closeModal(){
    c('.modelsWindowArea').style.opacity = 0    //criando uma animação
    setTimeout(()=> {
        c('.modelsWindowArea').style.display = 'none'       //fechando a janela, sem Timeout, não vemos o efeito
    }, 500)
}

cs('.modelsInfo-cancelButton, .modelsInfo-cancelMobileButton').forEach((item) => {
    item.addEventListener('click', closeModal)
})

c('.modelsInfo-qtmenos').addEventListener('click', ()=> {
    if(modalQt > 1){
        modalQt--
        c('.modelsInfo-qt').innerHTML = modalQt
    }
})

c('.modelsInfo-qtmais').addEventListener('click', ()=> {
    modalQt++
    c('.modelsInfo-qt').innerHTML = modalQt
})

cs('.modelsInfo-size').forEach((size, sizeIndex)=> {
    size.addEventListener('click', (e)=> {
        c('.modelsInfo-size.selected').classList.remove('selected')
        size.classList.add('selected')
        c('.modelsInfo-actualPrice').innerHTML = `R$ ${modelsJson[key].price[sizeIndex].toFixed(2)}`
    })
})

c('.modelsInfo-addButton').addEventListener('click', ()=> {
    //Precisamos saber:
    //Qual o modelo?
    //console.log("Modelo: " + key);
    //qual o tamanho?
    //a leitura é como string, devemos transformar em número


    let size = parseInt(c('.modelsInfo-size.selected').getAttribute('data-key'))
    //console.log("Tamanho: " + size);
    //Quantidade?
    //console.log("Quantidade: " + modalQt)
    //Quando adicionamos de forma sucessiva o mesmo item, e mesmo tamanho, não podemos ter várias entradas
    //Isso é o que ocorre atualmente, precisamos de ajustes
    //Antes de adicionar devemos verificar se já existe aquele item com aquele tamanho
    //para isso funcionar vamos criar um identificador
    let identifier = modelsJson[key].id+'@'+size
    //vamos verificar se este identificador já está no carrinho
    let locaId = cart.findIndex((item)=>item.identifier == identifier)
    //se tiver adiciona a quantidade no item já existente, senão acrescento
    if(locaId > -1){
        cart[locaId].qt += modalQt
    }else {
        cart.push({
            identifier,
            id:modelsJson[key].id,
            nome:modelsJson[key].name,
            size,
            qt:modalQt
        })
    }




    updateCart()
    closeModal()

})

//ajustando o mobile

c('.menu-openner').addEventListener('click', () => {
    if(cart.length > 0){
        c('aside').style.left = '0'
    }
})

c('.menu-closer').addEventListener('click', () => {
    c('aside').style.left = '100vw'
})

c('.cart-finalizar').addEventListener('click', () => {
    cart = []
    // quando clicar no botao FINALIZAR o array do usuario vai esvaziar e vai dar um refresh na pagina
    usuario = []
    updateCart()
    location.reload()
})

function updateCart() {
    c('.menu-openner span').innerHTML = cart.length
    if(cart.length > 0) {
        c('aside').classList.add('show')
        c('.cart').innerHTML = ''         //limpo o carinho - visual
        //Fechando valores
        let subtotal = 0
        let desconto = 0
        let total = 0
        cart.map((itemCart, index) => {
            let modelItem =  modelsJson.find((itemBD)=> itemBD.id == itemCart.id)
            subtotal += modelItem.price[itemCart.size] * itemCart.qt
            let cartItem = c('.models .cart-item').cloneNode(true)
            let modelSizeName
            //Alternativa
            switch(itemCart.size){
                case 0:
                    modelSizeName = 'P'
                    break
                case 1:
                    modelSizeName = 'M'
                    break
                case 2:
                    modelSizeName = 'G'
                    break
            }
            cartItem.querySelector('img').src = modelItem.img
            //cartItem.querySelector('.cart-item-nome').innerHTML = `${modelItem.name} (${modelSizeName})`
            cartItem.querySelector('.cart-item-nome').innerHTML = `${modelItem.name} (${modelItem.sizes[itemCart.size]})`
            cartItem.querySelector('.cart-item-qt').innerHTML = itemCart.qt
            cartItem.querySelector('.cart-item-qtmenos').addEventListener('click', () => {
                if (itemCart.qt > 1) {
                    itemCart.qt--
                }else {
                    cart.splice(index, 1)
                }
                updateCart()
            })
            cartItem.querySelector('.cart-item-qtmais').addEventListener('click', () => {
                itemCart.qt++
                updateCart()
            })

            c('.cart').append(cartItem)
        })
        desconto = subtotal * 0.1
        total = subtotal - desconto
        c('.subtotal span:last-child').innerHTML = `R$ ${subtotal.toFixed(2)}`
        c('.desconto span:last-child').innerHTML = `R$ ${desconto.toFixed(2)}`
        c('.total span:last-child').innerHTML = `R$ ${total.toFixed(2)}`
    } else {
        c('aside').classList.remove('show')
        c('aside').style.left = '100vw'
    }
}

c('.login').addEventListener('click', () => {
    c('.backgound-form').style.opacity = 0
    c('.backgound-form').style.display = 'flex'
    c('form').style.display = 'flex'
    setTimeout(() => {
        c('.backgound-form').style.opacity = 1
    }, 200)
})

// ADICIONANDO O NOME DO USUARIO NO LUGAR DO SIGN IN

// criei 2 variaveis, uma para pegar o campo do input:text e a outra para adicionar no lugar do sign in. Criei um array chamado USUARIO e passei como vazio. dps defazer tudo aquilo dps de clicar no .form-button, ele vai add no array o "CAMPO" atribuindo um VALUE, dps eu passo a varias ADD q pega o .login e coloco o nome do USUARIO nela.

let campo = document.querySelector("input")
let add = document.querySelector(".login")

c('.form-button').addEventListener('click', () => {

    c('.backgound-form').style.opacity = 0
    setTimeout(() => {
        c('.backgound-form').style.display = 'none'

        c('form').style.display = 'none'
    }, 500)

    usuario.push(campo.value)
    add.innerHTML = `${usuario}`
})