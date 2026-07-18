// Configuração do Firebase (projeto "imcsaude") e inicialização do serviço de Authentication.
// Este arquivo é importado pelas páginas que precisam de login/cadastro (ex: conta.js).
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.16.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/12.16.0/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyCFcF6yHhjvW1fUhxuxY7CBYkiEGHgD_Tw",
  authDomain: "imcsaude-3e701.firebaseapp.com",
  projectId: "imcsaude-3e701",
  storageBucket: "imcsaude-3e701.firebasestorage.app",
  messagingSenderId: "152205996524",
  appId: "1:152205996524:web:2c099e5b033d52b7fe90c9"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
