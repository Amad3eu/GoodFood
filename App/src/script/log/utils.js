function encriptar(text, shiftNumber) {
  // encriptação fraca usando cifra de cesar:
  //  consiste em pegar o alfabeto normal e fazer ele andar x casas
  //  https://pt.wikipedia.org/wiki/Cifra_de_C%C3%A9sar

  let normalAlphabet =
    "AaBbCcDdEeFfGgHhIiJjKkLlMmNnOoPpQqRrSsTtUuVvWwXxYyZz0123456789!@#$%&*()_-+=:;.,/\\| ";

  let shiftedAlphabet = normalAlphabet;
  for (let i = 0; i < shiftNumber; i++)
    shiftedAlphabet =
      shiftedAlphabet.slice(1, shiftedAlphabet.length) + shiftedAlphabet[0];

  let newText = "";
  for (let i of text) {
    newText += shiftedAlphabet[normalAlphabet.search(i)];
  }

  return newText;
}
