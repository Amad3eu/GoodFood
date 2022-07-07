function getDatabase() {
  return openDatabase(
    "GoodFood",
    "1.0",
    "GoodFood local database",
    2 * 1024 * 1024
  );
}

// note: create table no webSQL ja funciona como
//       "create table if not exists"

// -======= usuarios ========-

// creates usuarios table
function createUsuariosTable(db) {
  db.transaction((tx) =>
    tx.executeSql(
      "CREATE TABLE usuarios (id INTEGER PRIMARY KEY, nome TEXT, email TEXT, senha TEXT)",
      []
    )
  );
}

// insert row in usuarios table
function insertUsuarios(db, nome, email, senha) {
  let data = [nome, email, senha];

  db.transaction((tx) =>
    tx.executeSql(
      "INSERT INTO usuarios (nome, email, senha) VALUES (?, ?, ?)",
      data
    )
  );
}

// get usuario from table usuarios via email
// (made to check if e-mail is available)
function getUsuario(db, email, callback) {
  db.transaction((tx) =>
    tx.executeSql("SELECT * FROM usuarios WHERE email=?", [email], callback)
  );
}


// -=========== Pedidos ===========- //

// create orders table and ordered products table
function createOrdersTable(db) {
  db.transaction((tx) => {
    tx.executeSql(
      "CREATE TABLE pedidos (id_pedido INTEGER PRIMARY KEY, id_usuario INTEGER NOT NULL)",
      []
    ) 

    tx.executeSql(
      "CREATE TABLE produtos_pedidos (id_prod_pedido INTEGER PRIMARY KEY, id_pedido INTEGER, nome_produto TEXT, quantidade INTEGER, tamanho INTEGER)",
      []
    ) 
  }
  );
}

// add order
function insertOrder(db, callback) {
  db.transaction((tx) => {
    tx.executeSql(
      "INSERT INTO pedidos (id_usuario) VALUES (?) RETURNING id_pedido",
      [JSON.parse(localStorage.getItem("loggedUser"))["id"]],
      callback
    )
  })
}

// add products to order
function insertProdsOrder(db, idPedido, cart, callback) {
  db.transaction((tx) => {
    for (let i = 0; i < cart.length; i++) {
      const e = cart[i];
      tx.executeSql(
        "INSERT INTO produtos_pedidos (id_pedido, nome_produto, quantidade, tamanho) VALUES (?,?,?,?)",
        [idPedido, e['nome'], e['qt'], e['size']], callback
      )
    }
  })
}

// search for orders
function getUserOrders(db, callback) {
  db.transaction((tx) => {
    tx.executeSql(
      "SELECT * FROM pedidos WHERE id_usuario = ?",
      [JSON.parse(localStorage.getItem('loggedUser'))['id']],
      callback
    )
  })
}