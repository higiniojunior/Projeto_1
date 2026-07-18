import { auth } from "./firebase-config.js";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/12.16.0/firebase-auth.js";

const formCadastro = document.getElementById("form-cadastro");
const formLogin = document.getElementById("form-login");
const btnLogout = document.getElementById("btn-logout");
const areaLogado = document.getElementById("area-logado");
const areaFormularios = document.getElementById("area-formularios");
const emailLogado = document.getElementById("email-logado");
const erroCadastro = document.getElementById("erro-cadastro");
const erroLogin = document.getElementById("erro-login");

function traduzErro(codigo) {
  const mapa = {
    "auth/email-already-in-use": "Este email já está cadastrado.",
    "auth/invalid-email": "Email inválido.",
    "auth/weak-password": "A senha precisa ter no mínimo 6 caracteres.",
    "auth/user-not-found": "Email ou senha incorretos.",
    "auth/wrong-password": "Email ou senha incorretos.",
    "auth/invalid-credential": "Email ou senha incorretos.",
    "auth/too-many-requests": "Muitas tentativas. Tente novamente mais tarde."
  };
  return mapa[codigo] || "Ocorreu um erro. Tente novamente.";
}

formCadastro.addEventListener("submit", async (e) => {
  e.preventDefault();
  erroCadastro.textContent = "";
  const email = document.getElementById("cadastro-email").value.trim();
  const senha = document.getElementById("cadastro-senha").value;
  try {
    await createUserWithEmailAndPassword(auth, email, senha);
    formCadastro.reset();
  } catch (err) {
    erroCadastro.textContent = traduzErro(err.code);
  }
});

formLogin.addEventListener("submit", async (e) => {
  e.preventDefault();
  erroLogin.textContent = "";
  const email = document.getElementById("login-email").value.trim();
  const senha = document.getElementById("login-senha").value;
  try {
    await signInWithEmailAndPassword(auth, email, senha);
    formLogin.reset();
  } catch (err) {
    erroLogin.textContent = traduzErro(err.code);
  }
});

btnLogout.addEventListener("click", () => signOut(auth));

onAuthStateChanged(auth, (user) => {
  if (user) {
    areaLogado.classList.remove("hidden");
    areaFormularios.classList.add("hidden");
    emailLogado.textContent = user.email;
  } else {
    areaLogado.classList.add("hidden");
    areaFormularios.classList.remove("hidden");
  }
});
