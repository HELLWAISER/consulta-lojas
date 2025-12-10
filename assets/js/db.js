const DB_KEY = "lojas_db";

// BUSCAR TODAS
function getLojas() {
  return JSON.parse(localStorage.getItem(DB_KEY)) || [];
}

// SALVAR TODAS
function salvarLojas(lojas) {
  localStorage.setItem(DB_KEY, JSON.stringify(lojas));
}

// ADICIONAR
function adicionarLoja(loja) {
  const lojas = getLojas();
  lojas.push(loja);
  salvarLojas(lojas);
}

// EXCLUIR
function excluirLoja(numero) {
  let lojas = getLojas();
  lojas = lojas.filter(loja => loja.numero !== numero);
  salvarLojas(lojas);
}

// BUSCAR
function buscarLojaDB(valor) {
  const lojas = getLojas();
  valor = valor.toLowerCase();

  return lojas.find(loja =>
    loja.numero.toLowerCase() === valor ||
    loja.fantasia.toLowerCase().includes(valor)
  );
}

// BUSCAR POR NÚMERO (EDIÇÃO)
function buscarPorNumero(numero) {
  const lojas = getLojas();
  return lojas.find(loja => loja.numero === numero);
}

// ATUALIZAR
function atualizarLoja(lojaAtualizada) {
  let lojas = getLojas();

  lojas = lojas.map(loja =>
    loja.numero === lojaAtualizada.numero ? lojaAtualizada : loja
  );

  salvarLojas(lojas);
}
