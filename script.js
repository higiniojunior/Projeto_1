const form      = document.getElementById('imc-form');
const inputPeso = document.getElementById('peso');
const inputAlt  = document.getElementById('altura');
const secaoRes  = document.getElementById('resultado');

const FAIXAS = [
  { max: 18.5, classe: 'baixo',  label: 'Abaixo do peso',     cor: 'cor-baixo',  icone: '🔵', msg: 'Seu IMC indica <strong>abaixo do peso</strong>. Isso pode estar associado a deficiências nutricionais e queda de imunidade. Converse com um nutricionista ou médico.' },
  { max: 25,   classe: 'normal', label: 'Peso normal',         cor: 'cor-normal', icone: '✅', msg: 'Parabéns! Seu IMC está na faixa de <strong>peso normal</strong> segundo a OMS. Continue mantendo hábitos saudáveis de alimentação e atividade física.' },
  { max: 30,   classe: 'sobre',  label: 'Sobrepeso',           cor: 'cor-sobre',  icone: '⚠️', msg: 'Seu IMC indica <strong>sobrepeso</strong>. Pequenas mudanças no estilo de vida — alimentação balanceada e exercício regular — podem fazer grande diferença.' },
  { max: 35,   classe: 'ob1',    label: 'Obesidade Grau I',    cor: 'cor-ob1',    icone: '🔶', msg: 'Seu IMC indica <strong>Obesidade Grau I</strong>. É recomendável buscar orientação médica para um plano de saúde personalizado.' },
  { max: 40,   classe: 'ob2',    label: 'Obesidade Grau II',   cor: 'cor-ob2',    icone: '🔴', msg: 'Seu IMC indica <strong>Obesidade Grau II</strong>. O acompanhamento médico é importante para reduzir riscos cardiovasculares e metabólicos.' },
  { max: Infinity, classe: 'ob3', label: 'Obesidade Grau III', cor: 'cor-ob3',    icone: '🚨', msg: 'Seu IMC indica <strong>Obesidade Grau III (Mórbida)</strong>. Procure atendimento médico especializado. Há tratamentos eficazes disponíveis.' },
];

function classificar(imc) {
  return FAIXAS.find(f => imc < f.max);
}

function imcParaPosicao(imc) {
  const escala = [0, 18.5, 25, 30, 35, 40, 50];
  const clamped = Math.min(Math.max(imc, 0), 50);
  for (let i = 1; i < escala.length; i++) {
    if (clamped <= escala[i]) {
      const frac = (clamped - escala[i - 1]) / (escala[i] - escala[i - 1]);
      const larguraFaixa = 1 / (escala.length - 1);
      return ((i - 1) + frac) * larguraFaixa * 100;
    }
  }
  return 100;
}

function mostrarErro(campo, erroId, msg) {
  campo.classList.add('input-erro');
  document.getElementById(erroId).textContent = msg;
}

function limparErro(campo, erroId) {
  campo.classList.remove('input-erro');
  document.getElementById(erroId).textContent = '';
}

function validar(peso, altCm) {
  let ok = true;
  limparErro(inputPeso, 'erro-peso');
  limparErro(inputAlt, 'erro-altura');

  if (!peso || isNaN(peso)) {
    mostrarErro(inputPeso, 'erro-peso', 'Informe um peso válido.'); ok = false;
  } else if (peso < 1 || peso > 300) {
    mostrarErro(inputPeso, 'erro-peso', 'Peso deve estar entre 1 e 300 kg.'); ok = false;
  }

  if (!altCm || isNaN(altCm)) {
    mostrarErro(inputAlt, 'erro-altura', 'Informe uma altura válida.'); ok = false;
  } else if (altCm < 50 || altCm > 250) {
    mostrarErro(inputAlt, 'erro-altura', 'Altura deve estar entre 50 e 250 cm.'); ok = false;
  }

  return ok;
}

function calcularPesoIdeal(h) {
  return {
    min: 18.5 * Math.pow(h, 2.5) / 1.3,
    max: 25   * Math.pow(h, 2.5) / 1.3,
  };
}

function escalaCorpo(imc) {
  const escala = 1 + (imc - 21.75) * 0.018;
  return Math.min(Math.max(escala, 0.8), 1.5);
}

function destacarLinha(imcTref) {
  const linhas = document.querySelectorAll('.tabela-oms tbody tr');
  linhas.forEach(tr => {
    tr.classList.remove('linha-ativa');
    const min = parseFloat(tr.dataset.min);
    const max = parseFloat(tr.dataset.max);
    if (imcTref >= min && imcTref < max) tr.classList.add('linha-ativa');
  });
}

form.addEventListener('submit', e => {
  e.preventDefault();

  const peso  = parseFloat(inputPeso.value);
  const altCm = parseFloat(inputAlt.value);

  if (!validar(peso, altCm)) return;

  const h = altCm / 100;

  const imcTrad = peso / Math.pow(h, 2);
  const imcTref = 1.3 * peso / Math.pow(h, 2.5);

  const classTrad = classificar(imcTrad);
  const classTref = classificar(imcTref);

  document.getElementById('val-trad').textContent    = imcTrad.toFixed(2);
  document.getElementById('val-trad').className      = 'imc-valor ' + classTrad.cor;
  document.getElementById('class-trad').textContent  = classTrad.label;
  document.getElementById('class-trad').className    = 'imc-classificacao ' + classTrad.cor;

  document.getElementById('val-tref').textContent    = imcTref.toFixed(2);
  document.getElementById('val-tref').className      = 'imc-valor ' + classTref.cor;
  document.getElementById('class-tref').textContent  = classTref.label;
  document.getElementById('class-tref').className    = 'imc-classificacao ' + classTref.cor;

  const posTrad = imcParaPosicao(imcTrad);
  const posTref = imcParaPosicao(imcTref);
  document.getElementById('ponteiro-trad').style.left = posTrad + '%';
  document.getElementById('ponteiro-tref').style.left = posTref + '%';

  document.getElementById('mensagem-icone').textContent        = classTref.icone;
  document.getElementById('mensagem-texto').innerHTML          = classTref.msg;

  destacarLinha(imcTref);

  const pesoIdeal = calcularPesoIdeal(h);
  document.getElementById('peso-ideal-min').textContent = pesoIdeal.min.toFixed(1);
  document.getElementById('peso-ideal-max').textContent = pesoIdeal.max.toFixed(1);

  const corpoAtual = document.getElementById('corpo-atual');
  corpoAtual.style.transform = `scaleX(${escalaCorpo(imcTref)})`;
  corpoAtual.className = 'corpo-silhueta ' + classTref.cor;

  document.getElementById('corpo-ideal').style.transform = 'scaleX(1)';

  if (secaoRes.classList.contains('hidden')) {
    secaoRes.classList.remove('hidden');
    secaoRes.style.animation = 'none';
    requestAnimationFrame(() => {
      secaoRes.style.animation = '';
    });
  }

  secaoRes.scrollIntoView({ behavior: 'smooth', block: 'start' });
});
