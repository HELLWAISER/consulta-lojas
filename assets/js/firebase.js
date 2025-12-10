import { initializeApp } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-app.js";
import {
  getFirestore,
  collection,
  getDocs,
  setDoc,
  doc,
  deleteDoc          // 👈 ADICIONADO AQUI
} from "https://www.gstatic.com/firebasejs/12.6.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyAvtlaNYr6iHeMRlnI1vJ-tH9YXh2gcst4",
  authDomain: "consulta-lojas.firebaseapp.com",
  projectId: "consulta-lojas",
  storageBucket: "consulta-lojas.firebasestorage.app",
  messagingSenderId: "24874272058",
  appId: "1:24874272058:web:b3407c8ccb76839bf07c03"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// 👇 EXPORTA TUDO QUE O sync.js PRECISA
export {
  db,
  collection,
  getDocs,
  setDoc,
  doc,
  deleteDoc        
};

console.log("✅ Firebase inicializado com sucesso.");
