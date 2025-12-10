function buscarLoja() {
  const numero = document.getElementById("buscaNumero").value.trim();
  const nome = document.getElementById("buscaNome").value.trim();

  const valorBusca = numero || nome;

  const resultado = buscarLojaDB(valorBusca);

  const divResultado = document.getElementById("resultado");

  if (resultado) {
    divResultado.innerHTML = `
      <div class="card p-3 shadow">
        <h5>${resultado.fantasia}</h5>
        <p><strong>Número:</strong> ${resultado.numero}</p>
        <p><strong>Razão Social:</strong> ${resultado.razao}</p>
        <p><strong>Telefone:</strong> ${resultado.telefone || "-"}</p>
        <p><strong>E-mail:</strong> ${resultado.email || "-"}</p>
      </div>
    `;
  } else {
    divResultado.innerHTML = `
      <div class="alert alert-danger text-center">
        Loja não encontrada.
      </div>
    `;
  }
}
