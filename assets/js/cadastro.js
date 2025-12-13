let editando = false;

// ==========================
// SALVAR (CADASTRO OU EDIÇÃO)
// ==========================
function salvarLoja() {
  const campoNumero = document.getElementById("numero");
  const numero = campoNumero.value.trim();
  const fantasia = document.getElementById("fantasia").value.trim();
  const razao = document.getElementById("razao").value.trim();
  const telefone = document.getElementById("telefone").value.trim();
  const email = document.getElementById("email").value.trim();

  if (!numero || !fantasia || !razao) {
    document.getElementById("msg").innerHTML =
      `<div class="alert alert-danger">Preencha os campos obrigatórios.</div>`;
    return;
  }

  const loja = { numero, fantasia, razao, telefone, email };

  if (editando) {
    // 🔄 ATUALIZA DADOS DA MESMA LOJA (NÚMERO NÃO MUDA)
    atualizarLoja(loja);
    sincronizarComFirebase();

    document.getElementById("msg").innerHTML =
      `<div class="alert alert-success">Loja atualizada com sucesso!</div>`;

    editando = false;

  } else {
    // ✅ NOVO CADASTRO
    adicionarLoja(loja);
    sincronizarComFirebase();

    document.getElementById("msg").innerHTML =
      `<div class="alert alert-success">Loja cadastrada com sucesso!</div>`;
  }

  limparFormulario();
  listarLojas();
}

// ==========================
// LIMPAR FORMULÁRIO
// ==========================
function limparFormulario() {
  const campoNumero = document.getElementById("numero");
  campoNumero.value = "";
  campoNumero.readOnly = false; // 🔓 libera para novo cadastro

  document.getElementById("fantasia").value = "";
  document.getElementById("razao").value = "";
  document.getElementById("telefone").value = "";
  document.getElementById("email").value = "";

  editando = false;
}

// ==========================
// LISTAR LOJAS
// ==========================
function listarLojas() {
  const lista = document.getElementById("listaLojas");
  const lojas = getLojas();

  lista.innerHTML = "";

  if (lojas.length === 0) {
    lista.innerHTML =
      "<p class='text-muted text-center'>Nenhuma loja cadastrada.</p>";
    return;
  }

  lojas.forEach(loja => {
    lista.innerHTML += `
      <div class="card p-3 mb-3 loja-card">
        <strong class="loja-nome">${loja.fantasia}</strong>
        <div class="loja-info">Número: ${loja.numero}</div>
        <div class="loja-info">${loja.razao}</div>

        <div class="loja-actions mt-3">
          <button class="btn btn-edit" onclick="editar('${loja.numero}')">
            ✏️ Editar
          </button>
          <button class="btn btn-delete" onclick="excluir('${loja.numero}')">
            🗑 Excluir
          </button>
        </div>
      </div>
    `;
  });
}

// ==========================
// EDITAR (TRAVA O NÚMERO)
// ==========================
function editar(numero) {
  const loja = buscarPorNumero(numero);

  const campoNumero = document.getElementById("numero");
  campoNumero.value = loja.numero;
  campoNumero.readOnly = true; // 🔒 TRAVA O NÚMERO NA EDIÇÃO

  document.getElementById("fantasia").value = loja.fantasia;
  document.getElementById("razao").value = loja.razao;
  document.getElementById("telefone").value = loja.telefone;
  document.getElementById("email").value = loja.email;

  editando = true;
}

// ==========================
// EXCLUIR
// ==========================
function excluir(numero) {
  if (confirm("Deseja realmente excluir esta loja?")) {
    excluirLoja(numero);           // local
    excluirLojaNoFirebase(numero); // firebase
    listarLojas();
  }
}

// ==========================
// LISTAR AO ABRIR A PÁGINA
// ==========================
document.addEventListener("DOMContentLoaded", listarLojas);
