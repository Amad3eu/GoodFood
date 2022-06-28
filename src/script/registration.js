function cadastrar() {
  let form = document.cadForm;
  let missingText = "Preencha o(s) campo(s): ";
  let missingProps = [];

  if (form.nome.value == "") {
    missingProps.push("nome");
    form.nome.focus();
  }
  if (form.email.value == "") {
    missingProps.push("e-mail");
    form.email.focus();
  }
  if (form.senha.value == "") {
    missingProps.push("senha");
    form.senha.focus();
  }

  if (missingProps.length > 0) {
    for (i of missingProps) {
      if (missingProps.indexOf(i) == missingProps.length - 1)
        missingText += i + ".";
      else missingText += i + ", ";
    }
    document.querySelector("#missing").innerHTML = missingText;
    return;
  }

  let db = getDatabase();

  createUsuariosTable(db);

  const usedEmailStr = "Este e-mail já está sendo usado!";
  getUsuario(db, form.email.value, (tx, res) => {
    if (res.rows.length > 0) {
      document.querySelector("#missing").innerHTML = usedEmailStr;
      return;
    }

    insertUsuarios(
      db,
      form.nome.value,
      form.email.value,
      encriptar(form.senha.value, 5)
    );

    document.location.href = "login.html";
  });
}

// console.log(encriptar('teste', 4))
// normal:      teste
// encriptado:  vguvg

document.querySelector("#cadForm").addEventListener("submit", (e) => {
  e.preventDefault();
  cadastrar();
});
