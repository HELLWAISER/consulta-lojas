import {
  db,
  collection,
  getDocs,
  setDoc,
  doc,
  deleteDoc
} from "./firebase.js";

window.sincronizarComFirebase = async function () {
  if (!navigator.onLine) {
    console.log("⚠️ Sem internet. Usando apenas dados locais.");
    return;
  }

  try {
    const lojasLocais = getLojas();

    const ref = collection(db, "lojas");
    const snapshot = await getDocs(ref);

    const lojasRemotas = [];
    snapshot.forEach(d => lojasRemotas.push(d.data()));

    const mapaFirebase = {};
    lojasRemotas.forEach(loja => mapaFirebase[loja.numero] = loja);

    // ✅ 1. INSERE OU ATUALIZA TODAS AS LOJAS LOCAIS NO FIREBASE
    for (const lojaLocal of lojasLocais) {
      const lojaFirebase = mapaFirebase[lojaLocal.numero];

      // 👉 Se não existe no Firebase OU se existe mas mudou → ATUALIZA
      if (
        !lojaFirebase ||
        JSON.stringify(lojaFirebase) !== JSON.stringify(lojaLocal)
      ) {
        await setDoc(doc(ref, lojaLocal.numero), lojaLocal); // setDoc faz INSERT e UPDATE
        console.log("✅ Enviado/Atualizado no Firebase:", lojaLocal.numero);
      }
    }

    // ✅ 2. ATUALIZA LOCAL COM O QUE SÓ EXISTE NA NUVEM
    const mapaLocal = {};
    lojasLocais.forEach(loja => mapaLocal[loja.numero] = loja);

    for (const lojaRemota of lojasRemotas) {
      if (!mapaLocal[lojaRemota.numero]) {
        lojasLocais.push(lojaRemota);
      }
    }

    salvarLojas(lojasLocais);

    console.log("✅ Sincronização bidirecional completa.");

  } catch (erro) {
    console.error("❌ Erro na sincronização:", erro);
  }
};

// ✅ EXCLUSÃO NA NUVEM
window.excluirLojaNoFirebase = async function (numero) {
  if (!navigator.onLine) return;

  try {
    const ref = doc(db, "lojas", numero);
    await deleteDoc(ref);
    console.log("🗑️ Loja apagada no Firebase:", numero);
  } catch (e) {
    console.error("❌ Erro ao excluir no Firebase:", e);
  }
};
