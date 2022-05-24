// gets database
function getDatabase() {
    return openDatabase(
        'madeirum',
        '1.0',
        'madeirum local database',
        2 * 1024 * 1024
    )
}

// creates usuarios table
function createUsuariosTable(db) {
    db.transaction((tx) => tx.executeSql('CREATE TABLE usuarios (id INTEGER PRIMARY KEY, nome TEXT, email TEXT, senha TEXT)', []))
}

// insert row in usuarios table
function insertUsuarios(db, nome, email, senha) {
    let data = [
        nome,
        email,
        senha
    ]

    db.transaction((tx) => tx.executeSql('INSERT INTO usuarios (nome, email, senha) VALUES (?, ?, ?)', data))
}

// get usuario from table usuarios via email
// (made to check if e-mail is available)
function getUsuario(db, email, callback) {
    db.transaction((tx) => tx.executeSql(
        'SELECT * FROM usuarios WHERE email=?',
        [email],
        callback
    ))
}