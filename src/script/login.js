function logar() {
  let form = document.logForm;
  let db = getDatabase();
  let noEmailText = "Nenhuma conta com esse e-mail foi encontrada.";

  createUsuariosTable(db);

  let email = form.email.value;
  let senha = encriptar(form.senha.value, 5);

  getUsuario(db, email, (tx, res) => {
    if (res.rows.length <= 0) {
      document.querySelector("#missing").innerHTML = noEmailText;
      return;
    }

    let registro = res.rows[0];
    if (registro["senha"] === senha) {
      document.querySelector("#missing").innerHTML = "Logado! se divirta ✔";
      localStorage.setItem("loggedUser", JSON.stringify({
        id: registro["id"],
        nome: registro["nome"],
        email: registro["email"]
      }))
      setTimeout(function() {
        window.location.href = "/src/pages/tela_inicio.html" ;
      }, 500)
    } else {
      document.querySelector("#missing").innerHTML = "Senha incorreta.";
    }
  });

}
document.querySelector("#logForm").addEventListener("submit", (e) => {
  e.preventDefault();
  logar();
});
